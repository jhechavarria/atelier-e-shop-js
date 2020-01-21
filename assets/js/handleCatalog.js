jQuery(function() {
    // Variables utilitaires pour la recherche dans le catalogue
    let searchTimeout = 500;
    let searchTimer;

    /**
    * Gerer la quantite via les boutons
    */
   $('.list, .modal').on('click', '.product .decr, .product .incr', function(e) {
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
    $('.list .modal').on('keypress change blur', '.product input', function(e) {
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
     * Gere l'affichage du bouton
     */
    $('.catalog .list, .modal').on('qtyChange', '.product', function(e, qty) {
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
    $('.catalog .list, .modal').on('click', '.product .addProduct', function() {
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
    $('#search').on('keyup', function() {
        let search = $(this).val().trim().toLowerCase();

        $('#searching').slideDown("slow");
        $('.loadOnScroll, .noProductsFound').fadeOut();

        clearTimeout(searchTimer);

        searchTimer = setTimeout(function() {
            Catalog.searchProducts(search, function(found) {
                initialProductsLoad();
                if ($('.catalog .list .product').length <= Catalog.getProducts().length) {
                    $(".loadOnScroll").fadeOut("slow");
                }
                if (found) {
                    $('.noProductsFound').fadeOut();
                } else {
                    $('.noProductsFound').fadeIn('slow');
                }
            });
            $('#searching').slideUp();
        }, searchTimeout);
    });

    /**
     * Gère l'affichage des images
     * Gère le chargement des produits
     */
    $(document).on('scroll resize', function() {
        checkOnScrollPageLoad();
        displayImageFromVisibleProducts();
        if ($('.catalog .list .product').length <= Catalog.getProducts().length) {
            $(".loadOnScroll").fadeIn("slow");
        }
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
     * Gestion de l'initialisation du modal de détails des produits
     * 
     * Récupère et insère les données dans le modal
     * lors de son ouverture
     */
    $('.catalog .list').on('click', '[data-target="#product-details"]', function() {
        let $product = CATALOG_PRODUCT_TEMPLATE;
        let product = $(this).closest('.product').attr('product');
        product = Catalog.getProduct(product);

        for (let prop in product) {
            let val = product[prop];
            console.log(prop + " - " + val)
            if (prop === "image" && (val === undefined || val === null || val === '')) {
                val = "./assets/img/no_available_image.png";
            } else if (prop === "image") {
                val = './data/' + val;
            }
            let regexp = new RegExp('#'+prop+'#', 'g');
            $product = $product.replace(regexp, val);
        }
        $('.modal .modal-header h5').html(product.name);
        $('.modal .modal-body').html($product);
        $('.modal .modal-body .product')
            .removeClass('col-md-6 col-lg-4 mb-5')
            .addClass('col-12');
        $('.modal .modal-body .product img').attr('src', $('.modal .modal-body .product img').attr('data-src'));
    });

    /**
     * Generation initiale du catalogue
     * 
     * Plus rapide que le chargement
     * au cas par cas via onProductLoad
     */
    Catalog.on('load', function() {
        if (!Catalog.catalogExists()) {
            $(".loadOnScroll").fadeOut("slow");$
            $('.noProductsFound').fadeIn('slow');
        }
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
                let regexp = new RegExp('#'+prop+'#', 'g');
                $product = $product.replace(regexp, val);
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