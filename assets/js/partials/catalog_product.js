var CATALOG_PRODUCT_TEMPLATE = '<div class="card col-md-6 col-lg-4 mb-5 product" product="#id#">'+
    '<img class="card-img-top" src="./assets/img/loading.gif" data-src="#image#" alt="">'+
    '<div class="card-body justify-content-around">'+
        '<h5 class="card-title">#name#</h5>'+
        '<p class="card-text catalog-item-description">#description#</p>'+
    '</div>'+
    '<div class="card-footer row align-items-center">'+
        '<div class="input-group col-sm-9 col-md-6 col-lg-6">'+
            '<div class="input-group-prepend">'+
                '<button class="btn btn-outline-secondary decr" type="button">-</button>'+
            '</div>'+
            '<input type="test" min="0" max="9" class="form-control text-center" placeholder="Quantite" value="#qty#">'+
            '<div class="input-group-append">'+
                '<button class="btn btn-outline-secondary incr" type="button">+</button>'+
            '</div>'+
        '</div>'+
        '<div class="col-sm-3 col-md-6 col-lg-6">'+
            '<p class="card-text price">#price#&euro;</p>'+
        '</div>'+
    '</div>'+
    '<div class="row justify-content-center">'+
        '<button class="btn btn-primary col-sm-8 col-md-8 col-lg-8 text-uppercase addProduct disabled">Add to cart</button>'+
    '</div>'+
'</div>';