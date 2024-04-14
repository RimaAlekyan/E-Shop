$(document).ready(function () {
    const API_URL = 'https://dummyjson.com/'
    const lmt = 9
    Request(0, lmt, true)
    function Request(skp, lmt, ones = null, seach = null) {
        $.ajax({
            method: 'GET',
            beforeSend: function () {
                let loader = $('<img>').attr('src', 'img/loader.gif')
                    .css({
                        width: "100px",
                        zIndex: 1,
                        position: "absolute",
                        inset: "20px 0px 0px",
                        margin: "auto",

                    }).attr("id", "down")
                $("#prdzdiv").append(loader)
            },
            url: API_URL + `product?skip=${skp}&limit=${lmt}`,
            success: function (data) {
                $("#down").remove()
                PaintsProds(data)
                if (ones) {
                    PaintPage(data)
                }

            },
            error: function (e) {

            }
        })

    }

    function PaintsProds(data) {
        $(".pb-1").remove()
        if (data?.total != 0) {
            for (const pres of data.products) {
                let Conts = BuysProduct.map(el => JSON.parse(el)).filter(ft => ft.id == pres.id)[0]?.count
                let favs = Favorits.some(el => JSON.parse(el).id== pres.id)

                let productItem = `<div id='${pres.id}' class="col-lg-4 col-md-6 col-sm-6 pb-1">
        <div  class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
                <img class="img-fluid w-100" src="${pres.thumbnail}" alt="">
                <div class="product-action">
                    <a data-prds = '{"title":"${pres.title}", "img":"${pres.thumbnail}" ,"price":"${pres.price}" ,"count":${Conts | 1} ,"id":${pres.id} ,"stock":${pres.stock}}'href="#prds" class="btn btn-outline-dark btn-square ${Conts ? "activeProds" : ""} buys" href="#"><i class="fa fa-shopping-cart" ></i></a>
                    <a class="btn btn-outline-dark btn-square favorit ${favs ? "activeProds" : ""}" 'href="javascript:void(0)"><i class="far fa-heart"></i></a>
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
        else {
            $("#prdzdiv").append("There is no such product")
        }
    }

    function PaintPage(data) {
        let previus = `<li class="page-item "><a class="page-link" href="javascript:void(0)">Previous</span></a></li>`
        $("#ulpg").append(previus)
        let max = Math.ceil(data?.total / lmt)
        for (let i = 1; i < 1 + max; i++) {
            let pgsnav = `<li class="page-item"><a class="page-link" href="javascript:void(0)">${i}</a></li>`
            $("#ulpg").append(pgsnav)
        }
        let next = `<li data-max='${max}' class="page-item "><a class="page-link" href="javascript:void(0)">Next</span></a></li>`
        $("#ulpg").append(next)
    }

    $("#ulpg").on("click", ".page-item", function () {
        let pg = $(this).text()
        let oldpage
        if ($(".page-item").hasClass("active")) {
            oldpage = +$(".active").text().replace(/[^0-9]/g, "")
        }
        else {
            oldpage = 1
        }
        let skip
        if (pg == "Next" && oldpage < $(this).data("max")) {
            $(".page-item").removeClass("active")
            skip = (oldpage + 1) * lmt - lmt
            for (const pges of $(".page-item")) {
                if ($(pges).text() == oldpage + 1) {
                    $(pges).addClass("active")
                }
            }
            Request(skip, lmt)
        }
        else if (pg == "Previous" && oldpage > 1) {
            $(".page-item").removeClass("active")
            skip = (oldpage - 1) * lmt - lmt
            for (const pges of $(".page-item")) {
                if ($(pges).text() == oldpage - 1) {
                    $(pges).addClass("active")
                }
            }
            Request(skip, lmt)
        }
        else if (!isNaN(pg) && pg != oldpage) {
            $(".page-item").removeClass("active")
            skip = pg * lmt - lmt
            $(this).addClass("active")
            Request(skip, lmt)
        }
    })

})
