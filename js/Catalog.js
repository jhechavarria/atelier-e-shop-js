var Catalog = new (function() {
    this.products = [];
    this.MIN_QTY = 1;
    this.MAX_QTY = 9;

    var self = this;
    var _callback = {
        onLoad: []
    }

    this.load = function(callback) {
        /**
         * Remplacer par un vrai chargement de catalogue :D
         */
        $.getJSON('http://localhost/Data/Catalog1.json')
        .done(function(products) {
            for (var idx in products) {
                var product = new Product(products[idx]);
                product.id = idx;

                self.products.push(product);
            }
            if (typeof callback === "function") {
                callback(self.products);
            }
            for (var idx in _callback.onLoad) {
                _callback.onLoad[idx](self.products);
            }
        })
        .fail(function(error) {
            if (typeof callback === "function") {
                callback(null);
            }
        });
    }

    this.productIsIndexed = function(index) {
        return this.products[index] !== undefined && this.products[index] instanceof Product;
    }

    this.getProduct = function(id) {
        if (!this.productIsIndexed(id)) {
            return null;
        }

        return this.products[id];
    }

    this.onLoad = function(callback) { _callback.onLoad.push(callback); }
})();