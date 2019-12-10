var Catalog = new (function() {
    this.MIN_QTY = 0;
    this.MAX_QTY = 9;

    var _products = {};
    var catalog_name_pattern = new RegExp('Catalogue[0-9]+\.js', 'i');
    var _callback = {
        onLoad: []
    }

    /**
     * Chargement initial du catalogue
     * 
     * @param VOID
     * @return void
     */
    this.load = function() {
        for (var idx in catalogue) {
            var product = new Product(catalogue[idx]);
            product.id = idx;
            product.id = JSON.stringify(product).hashCode();
            _products[product.id] = product;
        }
        for (let idx in _callback.onLoad) {
            _callback.onLoad[idx](_products);
        }
    }

    /**
     * Cerifie si un produit se trouve dans le catalogue
     * 
     * @param mixed L'identifiant ou le produit a chercher
     * @return boolean Retourne true si le produit existe
     */
    this.hasProduct = function(id) {
        if (typeof id == 'object') {
            id = id.id
        }
        return _products[id] !== undefined && _products[id] instanceof Product;
    }

    /**
     * Retourne chaque produit independament
     * 
     * @param function Le callback a appeler pour chaque produit
     * @return void
     */
    this.mapProducts = function(callback) {
        for (let id in products) {
            callback(id, products[id]);
        }
    }

    /**
     * Renvoie un produit specifique s'il existe
     * 
     * @param string L'identifiant du produit
     * @return Product Le produit trouve ou NULL
     */
    this.getProduct = function(id) {
        if (!this.hasProduct(id)) {
            return null;
        }

        return _products[id];
    }

    /**
     * Evenements lies au panier
     * 
     * @param string L'evenement a ecouter
     * @param function Le callback a appeler lors du trigger
     * @return void
     */
    this.on = function(events, callback) {
        events = events.trim().split(' ');
        for (let idx in events) {
            let event = events[idx].trim();

            if (event === "") {
                continue;
            }

            try {
                f = event[0].toUpperCase();
                event = f + event.slice(1, event.length);
                console.log(event, _callback['on' + event])
                _callback['on' + event].push(callback);
            } catch (error) {
                console.log("Event "+event+" does not exists.");
            }
        }
    }
})();