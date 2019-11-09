jQuery(function() {
    // Contient le template html d'un produit du panier
    var PRODUCT_TEMPLATE;

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

            if (!Catalog.hasProduct(product.id)) {
                $('.unavailable', $product).fadeIn();
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
     * 
     * Le panier charge apres le chargement du catalogue
     * pour verifier la disponibilite des produits
     */
    Catalog.on('load', function() {
        $.get('./assets/partials/cart_product.html')
        .done(function(html) {
            PRODUCT_TEMPLATE = html;
            Cart.load();
        })
    })
});