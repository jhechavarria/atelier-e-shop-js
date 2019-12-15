var CART_PRODUCT_TEMPLATE = '<div class="container card product cart-item">'+
    '<div class="row justify-content-md-center align-items-center no-gutter">'+
        '<div class="col-sm-11 col-md-11 col-lg-7">'+
            '<p class="title cart-item-title"></p>'+
            '<span class="cart-price"></span>'+
            '<a class="cart-delete remove" href="#">supprimer</a>'+
        '</div>'+
        '<div class="col-sm-1 col-md-1 col-lg-1">'+
            '<span>x</span>'+
        '</div>'+
        '<div class="input-group col-sm-12 col-md-12 col-lg-4">'+
            '<div class="input-group-prepend">'+
                '<button class="btn btn-outline-secondary btn-sm decr" type="button">-</button>'+
            '</div>'+
            '<input type="text" min="0" max="9" class="form-control text-center item-qty" placeholder="Qté">'+
            '<div class="input-group-append">'+
                '<button class="btn btn-outline-secondary btn-sm incr" type="button">+</button>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<!-- <div class="row">'+
        '<div class="col-md-12 text-right">'+
            '<a class="cart-delete remove" href="#">supprimer</a>'+
        '</div>'+
    '</div> -->'+
    '<div class="row justify-content-center">'+
        '<p class="col-md-12 col-lg-6 text-uppercase bg-danger unavailable">Produit indisponible</p>'+
    '</div>'+
'</div>';