const API_URL = 'https://dummyjson.com'
let BuysProduct = localStorage.getItem("BuysProduct") ? JSON.parse(localStorage.getItem("BuysProduct")) : []
const Favorits = localStorage.getItem("Favorits") ? JSON.parse(localStorage.getItem("Favorits")) : []

$(document).ready(function () {
    let inputseach = $("#serch")
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
                            class: 'nav-item nav-link category-item',
                            href: '#prds'
                        }).attr('data-category', category).text(category.replaceAll('-', ' ').toUpperCase());

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
    $('#categories').on('click', '.category-item', function () {
        getCategoryProdutcs($(this).data('category'))
    })

    function getCategoryProdutcs(category, seach = null) {
        $("#prdzdiv").empty()
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
                $("#prdzdiv").html(loader)
            },
            url: seach ? API_URL + `/products/search?q=${inputseach.val().trim()}` : API_URL + '/products/category/' + category,
            success: function (data) {

                console.log();
                $("#down").remove()
                if (data?.total != 0) {
                    for (const pres of data.products) {
                        let Conts = BuysProduct.map(el => JSON.parse(el)).filter(ft => ft.id == pres.id)[0]?.count
                        let favs = Favorits.some(el => JSON.parse(el).id== pres.id)
                    
                        let productItem = `<div id='${pres.id}' class="col-lg-3 col-md-4 col-sm-6 pb-1">
            <div  class="product-item bg-light mb-4">
                <div class="product-img position-relative overflow-hidden">
                    <img class="img-fluid w-100" src="${pres.thumbnail}" alt="">
                    <div class="product-action">
                        <a data-prds = '{"title":"${pres.title}", "img":"${pres.thumbnail}" ,"price":"${pres.price}" ,"count":${Conts | 1} ,"id":${pres.id} ,"stock":${pres.stock}}'href="javascript:void(0)" class="btn btn-outline-dark btn-square ${Conts ? "activeProds" : ""} buys" href="#"><i class="fa fa-shopping-cart" ></i></a>
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
                        $("#prdzdiv").append(productItem)
                    }
                }
                else {
                    $("#prdzdiv").append("There is no such product")
                }
            },
            error: function () {
            }
        })
    }
    
    $("#prdzdiv").on('click', '.buys', SetData_Produicts)
    $("#prdzdiv").on('click', '.favorit', SetFavorit)
    $("#prdzdiv").on('click', ".ShopAdd", PostId)

    function SetData_Produicts() {
        let item = $(this).attr("data-prds")
        $(this).addClass("activeProds");
        if (!BuysProduct.some(el => JSON.parse(el).id == JSON.parse(item).id)) {
            BuysProduct.push(item)
            $(".ml-3").children().last().text(BuysProduct.length)
        }
        else {
            BuysProduct = BuysProduct.map(pr => {
                pr = JSON.parse(pr)
                if (pr.id == JSON.parse(item).id) {
                    pr.count++
                }
                return pr
            }).map(stify => JSON.stringify(stify))
        }
        localStorage.setItem("BuysProduct", JSON.stringify(BuysProduct))
    }
    function SetFavorit() {
        let favitmess  = $(this).parent().children().first().attr("data-prds")
        let thisId = $(this).closest("div[id]").attr('id')
        if (Favorits.some(el => JSON.parse(el).id == thisId)) {

            Favorits.forEach((els, index) => {
                if (JSON.parse(els).id == thisId) {
                    $(this).removeClass("activeProds")
                    Favorits.splice(index, 1)
                }
            });
            if (location.pathname=="/Favorits.html") {
                $(this).closest("div[id]").remove()
            }
        }
        else {
            Favorits.push(favitmess)
            $(this).addClass("activeProds")
        }
        $("a[class='btn px-0']").children().last().text(Favorits.length)

        localStorage.setItem("Favorits", JSON.stringify(Favorits))
    }

    function PostId() {
        let thisId = $(this).closest("div[id]").attr('id')
        location.replace("detail.html?id="+thisId)
    }

    $("#serchbut").on('click', search)
    function search() {
        getCategoryProdutcs(null, true)
    }
    $(".ml-3").children().last().text(BuysProduct.length)
    $("a[class='btn px-0']").children().last().text(Favorits.length)

})
