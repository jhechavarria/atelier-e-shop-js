var Catalog = new (function() {
    this.MIN_QTY = 1;
    this.MAX_QTY = 9;

    var _products = {};
    var catalogs = [];
    var _callback = {
        onLoad: [],
        onProductLoad: []
    }

    /**
     * Listing de tous les catalogues disponibles dans /Data
     * 
     * @param function Callback a appeler pour charger le catalogue
     * @return void
     */
    var loadCatalogsList = function(callback) {
        $.get('./Data')
        .done(function(html) {
            $('a', html).each(function(index) {
                let a = $(this).attr('href');
                if (a.endsWith('.json') && !catalogs.includes(a)) {
                    catalogs.push(a);
                }
            });
            for (let index in catalogs) {
                callback(index, catalogs[index]);
            }
        });
    }

    /**
     * Remplacer par un vrai chargement de catalogue :D
     * 
     * @param int Le numero de catalogue charge
     * @param string Nom du catalogue a charger
     * @return void
     */
    var loadCatalog = function(catalogIndex, catalog) {
        $.getJSON('./Data/'+catalog)
        .done(function(products) {
            for (var idx in products) {
                var product = new Product(products[idx]);
                product.id = idx;
                product.id = JSON.stringify(product).hashCode();

                _products[product.id] = product;
                for (var idx in _callback.onProductLoad) {
                    _callback.onProductLoad[idx](product);
                }
            }
            if (catalogIndex == catalogs.length - 1) {
                for (var idx in _callback.onLoad) {
                    _callback.onLoad[idx](_products);
                }
            }
        })
        .fail(function(error) {
            for (var idx in _callback.onLoad) {
                _callback.onLoad[idx]({
                    'type': 'error',
                    'message': 'Impossible de charger le catalogue '+catalog
                });
            }
        });
    }

    /**
     * Charge la liste complete des catalogues
     * 
     * @param void
     * @return void
     */
    this.load = function() {        
        loadCatalogsList(loadCatalog);
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
                _callback['on' + event].push(callback);
            } catch (error) {
                console.log("Event "+event+" does not exists.");
            }
        }
    }
})();