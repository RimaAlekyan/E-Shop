$(document).ready(function () {
    const Favorits = JSON.parse(localStorage.getItem("Favorits")).map(el => JSON.parse(el)) || []

    function PaintsProds(data) {
        for (const pres of data) {
            let Conts = BuysProduct.map(el => JSON.parse(el)).filter(ft => ft.id == pres.id)[0]?.count
            let productItem = `<div id='${pres.id}' class="col-lg-4 col-md-6 col-sm-6 pb-1">
        <div  class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
                <img class="img-fluid w-100" src="${pres.img}" alt="">
                <div class="product-action">
                    <a data-prds = '{"title":"${pres.title}", "img":"${pres.img}" ,"price":"${pres.price}" ,"count":${Conts | 1} ,"id":${pres.id} ,"stock":${pres.stock}}'href="#prds" class="btn btn-outline-dark btn-square ${Conts ? "activeProds" : ""} buys" href="#"><i class="fa fa-shopping-cart" ></i></a>
                    <a class="btn btn-outline-dark btn-square favorit activeProds" 'href="javascript:void(0)"><i class="far fa-heart"></i></a>
                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                </div>
            </div>
            <div class="text-center py-4">
                <a class="h6 text-decoration-none text-truncate ShopAdd" href="javascript:void(0)">${pres.title}</a>
                <div class="d-flex align-items-center justify-content-center mt-2">
                    <h5>$${pres.price}</h5><h6 class="text-muted ml-2"><del>$123.00</del></h6>
                </div>
                <div class="d-flex align-items-center justify-content-center mb-1">
                    <small class="fa fa-star text-primary mr-1"></small>
                    <small class="fa fa-star text-primary mr-1"></small>
                    <small class="fa fa-star text-primary mr-1"></small>
                    <small class="fa fa-star text-primary mr-1"></small>
                    <small class="fa fa-star text-primary mr-1"></small>
                    <small>${pres.stock}</small>
                </div>
            </div>
        </div>
        </div>`;
            $("#pgsnav").before(productItem)
        }
    }
    PaintsProds(Favorits)
})
