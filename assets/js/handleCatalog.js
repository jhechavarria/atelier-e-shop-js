jQuery(function() {
    // Variables utilitaires pour la recherche dans le catalogue
    let searchTimeout = 500;
    let searchTimer;
    // Contient le template html d'un produit du catalogue
    let PRODUCT_TEMPLATE;

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
     * Gere l'affichage di bouton
     */
    $('.catalog .list').on('qtyChange', '.product', function(e, qty) {
        let $product = $(this);

        if (qty == 0) {
            $('.addProduct', $product).addClass('disabled');
        } else {
             $('.addProduct', $product).removeClass('disabled');
        }
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

        if (qty === 0) {
            return false;
        }

        Cart.addProduct(Catalog.getProduct(id), qty);

        $('input', $product).val(Catalog.MIN_QTY);
        $product.trigger('qtyChange', 0);
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
                $('.product.hidden', '.catalog .list').removeClass('hidden');
                return ;
            }

            let products = Catalog.getProducts();

            for (let id in products) {
                let $product = products[id];
                let name = $product.name.toLowerCase();

                if (name.indexOf(search) !== -1) {
                    $product.addClass('hidden');
                } else {
                    $product.removeClass('hidden');
                }
            }
            $('.cart .filters .searching').slideUp("slow");
        }, searchTimeout);
    });

    /**
     * Generation initiale du catalogue
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
                    if (prop === "image" && (val === undefined || val === null || val === '')) {
                        val = "https://picsum.photos/400";
                    }
                    $product = $product.replace('#'+prop+'#', val);
                }
                $products += $product;
            }
            $($products).appendTo('.catalog .list');
        })
    });

    /**
     * Chargement initial du catalogue
     */
    Catalog.load();
});