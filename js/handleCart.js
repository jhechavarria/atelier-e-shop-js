jQuery(function() {
    let PRODUCT_TEMPLATE = 
    '<div class="item product">'+
        //'<p class="image"><img src="" alt="" /></p>'+
        //'<p class="name"></p>'+
        '<p class="price"></p>'+
        '<div class="qty">'+
            '<button class="decr">-</button>'+
            '<input type="text" placeholder="Quantite">'+
            '<button class="incr">+</button>'+
        '</div>'+
        '<button class="remove">REMOVE</button>'+
    '</div>';

    /**
     * Actions liees a l'ajout de produit
     */
    Cart.on('productAdd', function(product) {
        let $product = $(PRODUCT_TEMPLATE);

        $product.attr('product', product.id);
        $('.name', $product).text(product.name);
        $('.description', $product).text(product.description);
        $('.image img', $product).attr('src', product.image).attr('alt', product.name);
        $('.qty input', $product).val(product.qty);

        $product.appendTo('#basket');
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
            $('.name', $product).text(product.name);
            $('.image img', $product).attr('src', product.image).attr('alt', product.name);
            $('.qty input', $product).val(product.qty);
            $('.price', $product).html(product.price + ' &euro;');
    
            $product.appendTo('#basket');
        }
    });

    /**
     * Gerer le changement de quantite
     */
    $('#basket').on('qtyChange', '.product', function(e, qty) {
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
        $('.product[product="'+product.id+'"] input', '#basket').val(product.qty);
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
    $('#basket').on('click', '.remove', function() {
        let $product = $(this).closest('.product');
        let id = $product.attr('product');

        Cart.removeProduct(id);
    });

    /**
     * Actions liees a la suppresion des produits du panier
     */
    Cart.on('productRemove', function(product) {
        $('.product[product="'+product.id+'"]', '#basket').remove();
    });

    /**
     * Charger le panier sauvegarde en memoire
     */
    Cart.load();
});