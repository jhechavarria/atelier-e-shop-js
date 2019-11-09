jQuery(function() {
    // Variables utilitaires pour la recherche dans le catalogue
    let searchTimeout = 500;
    let searchTimer;
    // Contient le template html d'un produit du catalogue
    let PRODUCT_TEMPLATE;

    /**
     * Chargement initial du catalogue
     */
    Catalog.load();

    /**
    * Gerer la quantite via les boutons
    */
   $('.list').on('click', '.product .decr, .product .incr', function(e) {
       let $input = $('input', $(this).closest('.input-group'));
       let qty = parseInt($input.val());

       qty += $(this).hasClass('incr') ? 1 : -1;

       if (qty === NaN) {
           qty = Catalog.MIN_QTY;
       }
       
       if (qty >= Catalog.MIN_QTY && qty <= Catalog.MAX_QTY) {
           $input.val(qty);
       }

       $(this).closest('.product').trigger('qtyChange', qty);
   });

   /**
     * Gerer la quantite via l'input
     */
    $('.list').on('keypress change blur', 'input', function(e) {
        let $input = $(this);
        let qty = $input.val();

        if (qty === NaN || qty < Catalog.MIN_QTY) {
            qty = Catalog.MIN_QTY;
        } else if (qty > Catalog.MAX_QTY) {
            qty = Catalog.MAX_QTY;
        }

        $input.val(qty);

        $(this).closest('.product').trigger('qtyChange', qty);
    });

    /**
     * Gerer l'ajout de produits au panier
     */
    $('.catalog .list').on('click', '.product .addProduct', function() {
        let $product = $(this).closest('.product');
        let id = $product.attr('product');
        let qty = parseInt($('input', $product).val());

        if (qty === NaN) {
            qty = Catalog.MIN_QTY;
        }

        Cart.addProduct(Catalog.getProduct(id), qty);
    });

    /**
     * Gerer le filtre de recherche par nom
     */
    $('.cart .filters input').on('keyup', function() {
        let search = $(this).val().trim().toLowerCase();

        $('.cart .filters .searching').slideDown("slow");

        clearTimeout(searchTimer);

        searchTimer = setTimeout(function() {
            if (search === "") {
                $('.product', '.catalog .list').show();
                return ;
            }

            $('.product', '.catalog .list').each(function(index, el) {
                let $product = $(el);
                let name = $('.card-title', $product).text().toLowerCase();
    
                if (name.indexOf(search) !== -1) {
                    $product.show(0);
                } else {
                    $product.hide(0);
                }
            });
            $('.cart .filters .searching').slideUp("slow");
        }, searchTimeout);
    });

    /**
     * Generation initiale du panier
     * 
     * Plus rapide que le chargement
     * au cas par cas via onProductLoad
     */
    Catalog.on('load', function(products) {
        $.get('./assets/partials/catalog_product.html')
        .done(function(html) {
            PRODUCT_TEMPLATE = html;
            $products = "";
            for (let idx in products) {
                let product = products[idx];
                let $product = PRODUCT_TEMPLATE;

                for (let prop in product) {
                    let val = product[prop];
                    $product = $product.replace('#'+prop+'#', val);
                }
                $products += $product;
            }
            $($products).appendTo('.catalog .list');
        })
    });
});