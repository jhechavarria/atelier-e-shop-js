var Catalog = new (function() {
    this.MIN_QTY = 0;
    this.MAX_QTY = 9;

    var _products = [];
    var _backup = [];
    var _search = [];
    var _callback = {
        onLoad: []
    }

    var compareStr = function(a, b) {
        return a.localeCompare(b);
    };

    var compareNumber = function(a, b) {
        a = Number(a);
        b = Number(b);

        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Vérifie si un catalogue est défini
     * 
     * @param void
     * @returns void
     */
    this.catalogExists = function() {
        return  typeof catalogue !== "undefined" &&
                catalogue != null &&
                typeof catalogue == "object" &&
                Array.isArray(catalogue);
    }

    /**
     * Chargement initial du catalogue
     * 
     * @param VOID
     * @returns void
     */
    this.load = function() {
        if (this.catalogExists()) {
            for (var idx in catalogue) {
                var product = new Product(catalogue[idx]);
                product.id = idx;
                product.id = JSON.stringify(product).hashCode();
                _products.push(product);
            }
        }
        _backup = Object.assign([], _products);
        for (let idx in _callback.onLoad) {
            _callback.onLoad[idx](_products);
        }
    }

    /**
     * Cerifie si un produit se trouve dans le catalogue
     * 
     * @param mixed L'identifiant ou le produit a chercher
     * @returns boolean Retourne true si le produit existe
     */
    this.hasProduct = function(id) {
        if (typeof id == 'object') {
            id = id.id
        }
        for (let idx in _products) {
            if (_products[idx].id == id) {
                return idx;
            }
        }
        return false;
    }

    /**
     * Retourne chaque produit independament
     * 
     * @param function Le callback a appeler pour chaque produit
     * @returns void
     */
    this.mapProducts = function(callback) {
        for (let idx in _products) {
            callback(idx, _products[idx]);
        }
    }

    /**
     * Renvoie un produit specifique s'il existe
     * 
     * @param string L'identifiant du produit
     * @returns Product Le produit trouve ou NULL
     */
    this.getProduct = function(id) {
        let idx = this.hasProduct(id);
        if (idx === false) {
            return null;
        }
        return _products[idx];
    }

    /**
     * Renvoie tous les produits s'ils existent
     * 
     * @param VOID
     * @returns Product{} Liste des produits du catalogue
     */
    this.getProducts = function(id) {
        return _products;
    }

    /**
     * Renvoie le nombre de produits dans le catalogue
     * 
     * @param VOID
     * @returns int Le nombre de produits du catalogue
     */
    this.countProducts = function(id) {
        return _products.length;
    }

    this.searchProducts = function(search='', callback) {
        _products = Object.assign([], _backup);
        if (search == '') {
            if (typeof callback == "function") {
                callback(false);
            }
            return ;
        }
        let len = _products.length;
        for (let idx = 0; idx < len; idx++) {
            let name = _products[idx].name;
            if (name.toLowerCase().indexOf(search) == -1) {
                _products.splice(idx, 1);
                idx = -1;
                len = _products.length;
            }
        }
        if (typeof callback == "function") {
            callback(_products.length > 0);
        }
    }

    /**
     * Ordonne on
     * 
     * @param VOID
     * @returns int Le nombre de produits du catalogue
     */
    this.orderBy = function(prop, order) {
        let cmp = prop == 'name' ? compareStr : compareNumber;
        order = order == 'desc' ? 1 : -1;
        for (let i = 1; i < _products.length; i++) {
            for (let j = i; j >= 1; j--) {
                if (cmp(_products[j][prop], _products[j - 1][prop]) == order) {
                    let tmp = _products[j];
                    _products[j] = _products[j - 1];
                    _products[j - 1] = tmp;
                } else {
                    break;
                }
            }
        }
    }

    /**
     * Evenements lies au panier
     * 
     * @param string L'evenement a ecouter
     * @param function Le callback a appeler lors du trigger
     * @returns void
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