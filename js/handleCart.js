jQuery(function() {
    let PRODUCT_TEMPLATE = 
    '<div class="card mb-5 product">'+
        '<div class="row">'+
            '<div class="col-md-4 col-lg-4">'+
                '<img class="card-img-top" src="" alt="">'+
            '</div>' +
            '<div class="col-md-8 col-lg-8">'+
                '<p class="card-title"></p>'+
            '</div>' +
        '</div>' +
        '<div class="row justify-content-center">'+
            '<p class="col-md-6 col-lg-4 text-uppercase price"></p>'+    
        '</div>' +
        // '<hr>' +
        '<div class="row">'+
            '<div class="input-group col-md-8 col-lg-8">'+
                '<div class="input-group-prepend">'+
                    '<button class="btn btn-outline-secondary decr" type="button">-</button>'+
                '</div>'+
                '<input type="text" min="0" max="9" class="form-control text-center item-qty" placeholder="Quantite">'+
                '<div class="input-group-append">'+
                    '<button class="btn btn-outline-secondary incr" type="button">+</button>'+
                '</div>'+
            '</div>'+
            '<button class="col-md-2 col-lg-2 btn btn-danger remove"><i class="fa fa-trash"></i></button>'+
        '</div>'+
    '</div>';

    /**
     * Actions liees a l'ajout de produit
     */
    Cart.on('productAdd', function(product) {
        let $product = $(PRODUCT_TEMPLATE);

        $product.attr('product', product.id);
        $('.card-title', $product).text(product.name);
        $('.card-text', $product).text(product.description);
        $('.card-img-top', $product).attr('src', product.image).attr('alt', product.name);
        $('.card-footer input', $product).val(product.qty);

        $product.appendTo('.cart .list');
    });

    /**
     * Actions liees au chargement initial du panier
     */
    Cart.on('load', function(products) {
        for (let idx in products) {
            let product = products[idx];
            let $product = $(PRODUCT_TEMPLATE);

            if (product instanceof Product === false) {
                continue;
            }

            $product.attr('product', product.id);
            $('.card-title', $product).text(product.name);
            $('.card-img-top', $product).attr('src', product.image).attr('alt', product.name);
            $('.card-footer input', $product).val(product.qty);
            $('.price', $product).html(product.price + ' &euro;');
    
            $product.appendTo('.cart .list');
        }
    });

    /**
     * Gerer le changement de quantite
     */
    $('.cart .list').on('qtyChange', '.product', function(e, qty) {
        let $product = $(this);
        let idx = $product.attr('product');

        if (qty < Catalog.MIN_QTY) {
            qty = Catalog.MIN_QTY;
            $('input', $product).val(qty);
        }

        Cart.setQty(idx, qty);
    });

    /**
     * Actions liees a la modificaiton des quantites
     */
    Cart.on('qtyChange', function(product) {
        $('.product[product="'+product.id+'"] input', '.cart .list').val(product.qty);
    });

    /**
     * Gerer le total du panier
     */
    Cart.on('load productAdd productRemove qtyChange', function() {
        $('.total-checkout').html(Cart.getTotal() + ' &euro;');
    });

    /**
     * Gerer la suppression d'un produit
     */
    $('.cart .list').on('click', '.remove', function() {
        let $product = $(this).closest('.product');
        let id = $product.attr('product');

        Cart.removeProduct(id);
    });

    /**
     * Actions liees a la suppresion des produits du panier
     */
    Cart.on('productRemove', function(product) {
        $('.product[product="'+product.id+'"]', '.cart .list').remove();
    });

    /**
     * Charger le panier sauvegarde en memoire
     */
    Cart.load();
});