var CATALOG_PRODUCT_TEMPLATE = '<div class="card col-md-6 col-lg-4 mb-5 product vertical" product="#id#">'+
    '<img class="card-img-top" src="./assets/img/loading.gif" data-src="#image#" alt="#name#" data-toggle="modal" data-target="#product-details" />'+
    '<div class="card-body justify-content-around">'+
        '<h5 class="card-title" data-toggle="modal" data-target="#product-details">#name#</h5>'+
        '<p class="card-text catalog-item-description">#description#</p>'+
    '</div>'+
    '<div class="card-footer row align-items-center">'+
        '<div class="input-group col-7">'+
            '<div class="input-group-prepend">'+
                '<button class="btn btn-outline-secondary decr" type="button">-</button>'+
            '</div>'+
            '<input type="text" min="0" max="9" class="form-control text-center" placeholder="Quantite" value="#qty#">'+
            '<div class="input-group-append">'+
                '<button class="btn btn-outline-secondary incr" type="button">+</button>'+
            '</div>'+
        '</div>'+
        '<div class="col-5">'+
            '<p class="card-text price">#price#&euro;</p>'+
        '</div>'+
    '</div>'+
    '<div class="row justify-content-center">'+
        '<button class="btn btn-primary col-sm-8 col-md-8 col-lg-8 text-uppercase addProduct disabled">Add to cart</button>'+
    '</div>'+
'</div>'+
'<div class="card mb-3 product horizontal hidden" product="#id#">'+
  '<div class="row no-gutters">'+
    '<div class="col-md-4">'+
      '<img src="./assets/img/loading.gif" data-src="#image#" alt="#name#" class="card-img">'+
    '</div>'+
    '<div class="col-md-8">'+
      '<div class="card-body">'+
        '<h5 class="card-title">#name#</h5>'+
        '<p class="card-text">#description#</p>'+
      '</div>'+
      '<div class="card-footer row align-items-center">'+
        '<div class="input-group col-7">'+
            '<div class="input-group-prepend">'+
                '<button class="btn btn-outline-secondary decr" type="button">-</button>'+
            '</div>'+
            '<input type="text" min="0" max="9" class="form-control text-center" placeholder="Quantite" value="#qty#">'+
            '<div class="input-group-append">'+
                '<button class="btn btn-outline-secondary incr" type="button">+</button>'+
            '</div>'+
        '</div>'+
        '<div class="col-5">'+
            '<p class="card-text price">#price#&euro;</p>'+
        '</div>'+
    '</div>'+
    '<div class="row justify-content-center">'+
        '<button class="btn btn-primary col-sm-8 col-md-8 col-lg-8 text-uppercase addProduct disabled">Add to cart</button>'+
    '</div>'+
    '</div>'+
  '</div>'+
'</div>';