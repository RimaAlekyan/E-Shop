$(document).ready(function () {
    const QueriParams = new URLSearchParams(location.search)
    const IdProducts = QueriParams.get("id") || 1
    let BuysProduct = localStorage.getItem("BuysProduct") ? JSON.parse(localStorage.getItem("BuysProduct")) : [];

    Request().then(data => {
        Carusels(data)
        Deskrpit(data)
        Request(data.category)
        $("button[class='btn btn-primary px-3']").on("click", function () {
            AddCart(data)
        })

    }).catch(er => {
        console.log(er);
    })

    function Request(categorys) {
        return $.ajax({
            method: 'GET',
            beforeSend: function () {
                
            },
            url: !categorys ? API_URL + `/product/${IdProducts}` : API_URL + `/product/category/${categorys}?limit=5`,

            success: function (data) {
                if (categorys) {
                    LikeId(data)
                }
            },
            error: function (e) {

            }
        })
    }

    function Carusels(data) {
        let activeitem = `<div class="carousel-item active">
        <img class="w-100 h-100" src="${data.thumbnail}" alt="Image"></div>`
 
        $("#product-carousel").children().first().append(activeitem)

        for (const imgs of data.images) {
            let its = `<div class="carousel-item">
        <img class="w-100 h-100" src="${imgs}" alt="Image"></div>`
 
            $("#product-carousel").children().first().append(its)
        }
    }

    function Deskrpit(data) {
        let DivDesk = $("div[class='h-100 bg-light p-30']")
        let Deskr = ` 
<h3>${data.title}</h3>
<div class="d-flex mb-3">
    <div class="text-primary mr-2">
        <small class="fas fa-star"></small>
        <small class="fas fa-star"></small>
        <small class="fas fa-star"></small>
        <small class="fas fa-star-half-alt"></small>
        <small class="far fa-star"></small>
    </div>
    <small class="pt-1">${data.stock}</small>
</div>
<h3 class="font-weight-semi-bold mb-4">${data.price}$</h3>
<p class="mb-4">${data.description}</p>`

        DivDesk.children().first().before(Deskr)
        $("#tab-pane-1").children().last().text(data.description)

    }

    function AddCart(data) {
        let ChangeCount = +$("input[class='form-control bg-secondary border-0 text-center']").val()
        if (!BuysProduct.some(el => JSON.parse(el).id == data.id)) {
            BuysProduct.push(JSON.stringify({
                "title": data.title,
                "price": data.price,
                "img": data.images[0],
                "count": ChangeCount,
                "id": data.id
            }))
            $(".ml-3").children().last().text(BuysProduct.length)
        }
        else {
            BuysProduct = BuysProduct.map(pr => {
                pr = JSON.parse(pr)
                if (pr.id == data.id) {
                    pr.count += ChangeCount
                }
                return pr
            }).map(stify => JSON.stringify(stify))
        }
        localStorage.setItem("BuysProduct", JSON.stringify(BuysProduct))
    }

    function LikeId(data) {
        for (const pres of data.products) {
            let Conts = BuysProduct.map(el => JSON.parse(el)).filter(ft => ft.id == pres.id)[0]?.count
            let favs = Favorits.some(el => JSON.parse(el).id == pres.id)
            let likes = `<div id=${pres.id} class="product-item bg-light">
    <div class="product-img position-relative overflow-hidden" <script src="js/aos.js"></script>>
        <img class="img-fluid w-100" src="${pres.images[0]}" alt="">
        <div class="product-action">
        <a data-prds = '{"title":"${pres.title}", "img":"${pres.thumbnail}" ,"price":"${pres.price}" ,"count":${Conts | 1} ,"id":${pres.id}}'href="#prds" class="btn btn-outline-dark btn-square ${Conts ? "activeProds" : ""} buys" href="#"><i class="fa fa-shopping-cart" ></i></a>
        <a class="btn btn-outline-dark btn-square favorit ${favs ? "activeProds" : ""}" 'href="javascript:void(0)"><i class="far fa-heart"></i></a>
        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
        </div>
    </div>
    <div class="text-center py-4">
    <a class="h6 text-decoration-none text-truncate ShopAdd" href="javascript:void(0)">${pres.title}</a>
        <div class="d-flex align-items-center justify-content-center mt-2">
            <h5>${pres.price}$</h5><h6 class="text-muted ml-2"><del>$123.00</del></h6>
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
</div>`;
            console.log($("#prdzdiv"));
            $("#prdzdiv").css({
                display: "flex"
            })
            $("#prdzdiv>div").css({
                marginLeft: "10px"
            })
            $("#prdzdiv").children().first().before(likes)
            console.log(data.products)
        }
        
    }
    
})
