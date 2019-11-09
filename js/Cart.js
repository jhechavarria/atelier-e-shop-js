var Cart = new (function() {
    var _products = {};
    var _callback = {
        onLoad: [],
        onProductAdd: [],
        onProductRemove: [],
        onQtyChange: [],
        onQtySet: [],
        onQtyIncrease: [],
        onQtyDecrease: [],
        onClear: []
    }

    /**
     * Charge le panier du localStorage
     * 
     * @param void
     * @return bool Retourne vrai si le chargement est effectue
     */
    this.load = function() {
        var cart = localStorage.getItem("cart");

        if (cart !== null) {
            let products = JSON.parse(cart);
            for (let idx in products) {
                let product = new Product(products[idx]);
                _products[product.id] = product;
            }
            for (var idx in _callback.onLoad) {
                _callback.onLoad[idx](_products);
            }
            return true;
        }
        return false;
    }

    /**
     * Sauvegarde le panier dans le localStorage
     * 
     * @param void
     * @return bool Retourne vrai si la sauvegarde est effectuee
     */
    this.save = function() {
        var cart = JSON.stringify(_products);

        localStorage.setItem("cart", cart);
    }

    /**
     * Verifie qu'un produit existe
     * 
     * @param mixed L'identifiant ou le produit a chercher
     * @return bool Retourne vrai si le produit existe
     */
    this.hasProduct = function(id) {
        if (typeof id == 'object') {
            id = id.id;
        }
        return _products[id] !== undefined && _products[id] instanceof Product;
    }

    /**
     * Retourne un produit
     * 
     * @param int L'index du produit a chercher
     * @return Product Retourne le produit trouve ou NULL
     */
    this.getProduct = function(id) {
        if (this.hasProduct(id)) {
            return _products[id];
        }
        return null;
    }

    /**
     * Retourne l'ensemble des produits
     * 
     * @param void
     * @return Product[] Retourne la liste des produits
     */
    this.getProducts = function() {
        return _products;
    }

    /**
     * Ajoute un produit au panier
     * 
     * @param Product Produit a ajouter au panier
     * @param int Quantite a affecter au produit
     * @return bool Retourne vrai si le produit a eteajoute au panier
     */
    this.addProduct = function(item, qty=null) {
        if (item instanceof Product === false) {
            return false;
        }

        item = item.clone();
        if (qty !== null) {
            item.setQty(qty);
        }

        if (this.hasProduct(item)) {
            if (qty === null || qty === NaN) {
                console.error("La quantite doit etre un nombre et non: "+qty);
                return false;
            }
            return this.increaseQty(item.id, qty);
        }

        _products[item.id] = item;
        this.save();
        for (var idx in _callback.onProductAdd) {
            _callback.onProductAdd[idx](item);
        }
        return true;
    }

    /**
     * Supprime un produit du panier
     * 
     * @param int L'index du produit a supprimer du panier
     * @return bool Retourne vrai si le produit a bien ete supprime
     */
    this.removeProduct = function(id) {
        if (!this.hasProduct(id)) {
            return false;
        }

        let product = _products[id].clone();
        delete _products[id];
        this.save();
        for (var idx in _callback.onProductRemove) {
            _callback.onProductRemove[idx](product);
        }
        return true;
    }

    /**
     * Definit la quantite d'un produit
     * 
     * @param int L'index du produit a modifier
     * @param int Quantite a affecter au produit
     * @return bool Retourne vrai si l'ajout est effectue
     */
    this.setQty = function(id, qty) {
        if (!this.hasProduct(id)) {
            return false;
        }
        _products[id].setQty(qty);
        this.save();
        for (var idx in _callback.onQtySet) {
            _callback.onQtySet[idx](idx, _products[id]);
        }
        for (var idx in _callback.onQtyChange) {
            _callback.onQtyChange[idx](_products[id]);
        }
        return true;
    }

    /**
     * Increment la quantite d'un produit
     * 
     * @param int L'index du produit a modifier
     * @return bool Retourne vrai si l'icrementation est effectuee
     */
    this.increaseQty = function(id, incr=1) {
        if (!this.hasProduct(id)) {
            return false;
        }
        _products[id].increaseQty(incr);
        this.save();
        for (var idx in _callback.onQtyIncrease) {
            _callback.onQtyIncrease[idx](_products[id]);
        }
        for (var idx in _callback.onQtyChange) {
            _callback.onQtyChange[idx](_products[id]);
        }
        return true;
    }

    /**
     * Decremente la quantite d'un produit
     * 
     * @param int L'index du produit a modifier
     * @return bool Retourne vrai si la decrementation est effectuee
     */
    this.decreaseQty = function(id, decr=1) {
        if (!this.hasProduct(id)) {
            return false;
        }
        _products[id].decreaseQty(decr);
        this.save();
        for (var idx in _callback.onQtyDecrease) {
            _callback.onQtyDecrease[idx](_products[id]);
        }
        for (var idx in _callback.onQtyChange) {
            _callback.onQtyChange[idx](_products[id]);
        }
        return true;
    }

    /**
     * Retourne le prix total du panier
     * 
     * @param void
     * #return int Prix total des produits du panier
     */
    this.getTotal = function() {
        var total = 0;

        for (idx in _products) {
            let product = _products[idx];
            if (product instanceof Product === false || !Catalog.hasProduct(product)) {
                continue;
            }
            total += product.price * product.qty;
        }
        return Number.parseFloat(total).toFixed(2);
    }

    /**
     * Reinitialise le panier
     * 
     * @param void
     * @return void
     */
    this.clear = function() {
        _products = {};

        localStorage.removeItem("cart");

        for (var idx in _callback.onClear) {
            _callback.onClear[idx]();
        }
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