jQuery(function() {
    let searchTimeout = 500;
    let searchTimer;
    let PRODUCT_TEMPLATE =
    '<div class="card col-md-6 col-lg-4 mb-5 product">'+
        '<img class="card-img-top" src="" alt="">'+
        '<div class="card-body justify-content-around">'+
            '<h5 class="card-title"></h5>'+
            '<p class="card-text item-description" style=""></p>'+
            '</div>'+
        '<div class="row justify-content-center">' +
            '<div class="col-md-12 col-lg-4">' +    
                '<p class="card-text price"></p>'+
            '</div>' +
        '</div>' +
        '<div class="card-footer row">'+
            '<div class="input-group col-md-12">'+
                '<div class="input-group-prepend">'+
                    '<button class="btn btn-outline-secondary decr" type="button">-</button>'+
                '</div>'+
                '<input type="test" min="0" max="9" class="form-control text-center" placeholder="Quantite">'+
                '<div class="input-group-append">'+
                    '<button class="btn btn-outline-secondary incr" type="button">+</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="row justify-content-center">'+
            '<button class="btn btn-primary col-md-12 col-lg-6 text-uppercase addProduct">Add to cart</button>'+
        '</div>'+
    '</div>';

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
    $('.cart .filters input').on('keypress change blur', function() {
        let search = $(this).val().trim().toLowerCase();

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
        }, searchTimeout);
    });

    /**
     * Generation initiale du panier
     */
    Catalog.load(function(products) {
        for (let idx in products) {
            let product = products[idx];
            let $product = $(PRODUCT_TEMPLATE);

            $product.attr('product', product.id);
            $('.card-title', $product).text(product.name);
            $('.card-text', $product).text(product.description);
            $('.card-text.price', $product).html(product.price + ' &euro;');
            $('.card-img-top', $product).attr('src', product.image).attr('alt', product.name);
            $('.card-footer input', $product).val(product.qty);

            $product.appendTo('.catalog .list');
        }
    });
});