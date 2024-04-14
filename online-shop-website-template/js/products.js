const API_URL = 'https://dummyjson.com'

`<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
<div class="product-item bg-light mb-4">
    <div class="product-img position-relative overflow-hidden">
        <img class="img-fluid w-100" src="img/product-1.jpg" alt="">
        <div class="product-action">
            <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
            <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
            <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
            <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
        </div>
    </div>
    <div class="text-center py-4">
        <a class="h6 text-decoration-none text-truncate" href="">Product Name Goes Here</a>
        <div class="d-flex align-items-center justify-content-center mt-2">
            <h5>$123.00</h5><h6 class="text-muted ml-2"><del>$123.00</del></h6>
        </div>
        <div class="d-flex align-items-center justify-content-center mb-1">
            <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small>
            <small>(99)</small>
        </div>
    </div>
</div>
</div>`




$(document).ready(function () {
    $('#open_category').click(function () {
        loadCategories()
    });

    function loadCategories() {
        let categoryMenu = $('#categories');

        $.ajax({
            method: 'GET',
            beforeSend: function () {
                let loader = $('<img>').attr('src', 'img/loader.gif')
                    .css({
                        width: '30px',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '20px',
                        bottom: 0,
                        margin: 'auto'
                    })
                categoryMenu.html(loader)
            },
            url: API_URL + '/products/categories',
            success: function (data) {
                categoryMenu.empty()
                let item = 'No category';

                if (data?.length) {
                    for (let category of data) {
                        item = $('<a>', {
                            class: 'nav-item nav-link',
                            href: ''
                        }).text(category.replaceAll('-', ' ').toUpperCase());

                        categoryMenu.append(item)
                    }
                } else {
                    categoryMenu.text(item)
                }
            },
            error: function () {

            }
        })
    }
})
