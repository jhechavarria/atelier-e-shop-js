jQuery(function() {
    let PRODUCT_TEMPLATE =
    '<div class="item product">'+
        //'<p class="image"><img src="" alt="" /></p>'+
        //'<p class="name"></p>'+
        //'<p class="description"></p>'+
        '<p class="price"></p>'+
        '<div class="qty">'+
            '<button class="decr">-</button>'+
            '<input type="text" placeholder="Quantite">'+
            '<button class="incr">+</button>'+
        '</div>'+
        '<button class="addProduct">ADD TO CART</button>'+
    '</div>';

    /**
    * Gerer la quantite via les boutons
    */
   $('#products, #basket').on('click', '.product .decr, .product .incr', function(e) {
       let $input = $('input', $(this).closest('.product'));
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
    $('#products, #basket').on('keypress change blur', '.qty input', function(e) {
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
    $('#products').on('click', '.product .addProduct', function() {
        let $product = $(this).closest('.product');
        let index = $product.attr('product');
        let qty = parseInt($('input', $product).val());

        if (qty === NaN) {
            qty = Catalog.MIN_QTY;
        }

        Cart.addProduct(Catalog.products[index], qty);
    });

    /**
     * Gerer le filtre de recherche par nom
     */
    $('#basket #search-bar input').keypress(function() {
        let search = $(this).val().trim().toLowerCase();

        if (search === "") {
            $('.product', '#products').show();
            return ;
        }

        $('.product', '#products').each(function(index, el) {
            let $product = $(el);
            let name = $('.name', $product).text().toLowerCase();

            if (name.indexOf(search) !== -1) {
                $product.show(0);
            } else {
                $product.hide(0);
            }
        });
    });

    /**
     * Generation initiale du panier
     */
    Catalog.load(function(products) {
        for (let idx in products) {
            let product = products[idx];
            let $product = $(PRODUCT_TEMPLATE);

            $product.attr('product', product.id);
            $('.name', $product).text(product.name);
            $('.description', $product).text(product.description);
            $('.price', $product).html(product.price + ' &euro;');
            $('.image img', $product).attr('src', product.image).attr('alt', product.name);
            $('.qty input', $product).val(product.qty);

            $product.appendTo('#products');
        }
    });
});