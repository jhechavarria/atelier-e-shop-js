jQuery(function() {
    // Variables utilitaires pour la recherche dans le catalogue
    let searchTimeout = 500;
    let searchTimer;

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
            Catalog.searchProducts(search, initialProductsLoad);
            $('.cart .filters .searching').slideUp("slow");
        }, searchTimeout);
    });

    /**
     * Gère l'affichage des images
     * Gère le chargement des produits
     */
    $(document).on('scroll resize', function() {
        checkOnScrollPageLoad();
        displayImageFromVisibleProducts();
    });

    /**
     * Gère l'ordre des produits
     */
    $('select[name="orderBy"]').on('change', function() {
        let val = $(this).val().split(' ');
        Catalog.orderBy(val[0], val[1]);
        initialProductsLoad();
    });

    /**
     * Gère le nombre de ^produits à charger par page
     */
    $('select[name="itemsPerPage"]').on('change', function() {
        let val = $(this).val();
        Pagination.setItemsPerPage(val);
    });

    /**
     * Définit le type de pagination à utiliser
     */
    $('.switchPagination').on('click', function() {
        let loadOnScroll = $(this).is(':checked');
        Pagination.loadOnScroll = loadOnScroll;

        if (loadOnScroll) {
            $('.pagination').fadeOut();
            $('.loadOnScroll').fadeIn();
        } else {
            $('.pagination').fadeIn();
            $('.loadOnScroll').fadeOut();
        }
    });

    /**
     * Generation initiale du catalogue
     * 
     * Plus rapide que le chargement
     * au cas par cas via onProductLoad
     */
    Catalog.on('load', function() {
        Pagination.setLength();
        let $products = generateProducts();
        if (Pagination.loadOnScroll) {
            $('.pagination').fadeOut();
            $('.loadOnScroll').fadeIn();
        } else {
            $('.pagination').fadeIn();
            $('.loadOnScroll').fadeOut();
            generatePaginationLinks();
        }
        $($products).appendTo('.catalog .list');
        setTimeout(function() {
            displayImageFromVisibleProducts();
            $('.catalog-loader').css('width', '0');
        }, 1000);
    });

    /**
     * Chargement initial du catalogue
     */
    Catalog.load();

    /**
     * Gère l'affichage des images des produits
     */
    function displayImageFromVisibleProducts() {
        $('.list .product').each(function(index) {
            $product = $(this);
            $img = $('img', $product);
    
            if ($product.isInViewport() && $img.attr('src') != $img.attr('data-src')) {
                $img.attr('src', $img.attr('data-src'));
            }
        });
    }

    /**
     * Génère l
     */
    function generateProducts() {
        let products = Catalog.getProducts();
        let $products = "";
        let page_range = Pagination.getPageRange();
        Pagination.loadedItems += Pagination.itemsPerPage;
        for (let idx = page_range.start; idx <= page_range.end; idx++) {
            let product = products[idx];
            let $product = CATALOG_PRODUCT_TEMPLATE;

            if (product == undefined) {
                break;
            }

            for (let prop in product) {
                let val = product[prop];
                if (prop === "image" && (val === undefined || val === null || val === '')) {
                    val = "./assets/img/no_available_image.png";
                } else if (prop === "image") {
                    val = './data/' + val;
                }
                $product = $product.replace('#'+prop+'#', val);
            }
            $products += $product;
        }
        return $products;
    }

    /**
     * Gère le chargement des produits on scroll
     */
    function checkOnScrollPageLoad() {
        if ($('.loadOnScroll').isInViewport() && Pagination.loadOnScroll
            && Pagination.loadedItems < Catalog.countProducts()) {
            Pagination.current++;
            let $products = generateProducts();
            $($products).appendTo('.catalog .list');
        }
    }

    function initialProductsLoad() {
        Pagination.setLength();
        Pagination.loadedItems = 0;
        let $products = generateProducts();
        if (Pagination.loadOnScroll) {
            $('.pagination').fadeOut();
            $('.loadOnScroll').fadeIn();
        } else {
            $('.pagination').fadeIn();
            $('.loadOnScroll').fadeOut();
            generatePaginationLinks();
        }
        $('.catalog .list').html($products);
        setTimeout(function() {
            displayImageFromVisibleProducts();
        }, 1000);
    }

    /**
     * Génère les liens de pagination classique
     *
    function generatePaginationLinks() {
        $('.pagination .page-item .page-link:not(.prev):not(.next)').remove();
        for (let i = 1; i <= Pagination.length; i++) {
            $('.pagination').each(function() {
                $pagination = $(this);
                $last = $('.page-item:last', $pagination);
                $('<li class="page-item"><a class="page-link" href="#">'+i+'</a></li>').insertBefore($last);
            });
        }
    }
    */
});