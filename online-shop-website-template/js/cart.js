const GetByProducts = localStorage.getItem("BuysProduct") ? JSON.parse(localStorage.getItem("BuysProduct")) : []
$(document).ready(function () {
    let ParsesProduct = GetByProducts.map(el => JSON.parse(el))
    function GetBuy_Products() {
        for (let buyimds of ParsesProduct) {
            let byidetms = `<tr id=${buyimds.id}>
            <td class="align-middle"><img src=${buyimds.img} alt="" style="width: 50px;"> ${buyimds.title}</td>
            <td class="align-middle">$${buyimds.price}</td>
            <td class="align-middle">
                <div class="input-group quantity mx-auto" style="width: 100px;">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-minus" >
                        <i class="fa fa-minus"></i>
                        </button>
                    </div>
                    <input  type="number" class="form-control form-control-sm bg-secondary border-0 text-center inpos" value=${buyimds.count}>
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-plus">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td class="align-middle totalprc">${buyimds.price * buyimds.count}$</td>
            <td class="align-middle"><button class="btn btn-sm btn-danger delete"><i class="fa fa-times"></i></button></td>
            </tr>`
            $("#BuyProds").append(byidetms)
        }
    }
    function ChangeProductCount() {
        let price;
        let count;
        ParsesProduct.forEach(els => {
            if (els.id == $(this).closest("tr").attr("id")) {
                price = +els.price;
                count = els.count
            }
        });

        let counts = $(this).parent().parent().children()[1]?.value | this?.value

        if (this.value) {
            if (this.value <= 0) {
                DelProdcut(event, this)
            }
            $(this).closest("tr").children()[3].innerText = this.value * price + '$'
        }
        else {
            let totalPrice = price * counts
            if (this.className == "btn btn-sm btn-primary btn-minus") {
                if (counts == 1) {
                    console.log("asd");
                    DelProdcut(event, this)
                }
                else {
                    counts--
                    $(this).closest("tr").children()[3].innerText = totalPrice - price + '$'
                }

            }
            else {
                counts++
                $(this).closest("tr").children()[3].innerText = (totalPrice + price) + '$'
            }
            $(this).parent().parent().children()[1].value = counts
        }
        let ChangeCountItm = GetByProducts.map(el => {
            el = JSON.parse(el)
            if (el.id == $(this).closest("tr").attr("id")) {
                el.count = counts
            }
            return JSON.stringify(el)
        })
        localStorage.setItem("BuysProduct", JSON.stringify(ChangeCountItm))
        EditTotal()
    }

    function DelProdcut(event, arg) {
        let inqy;
        if ($(arg).children().length || arg?.value) {
            console.log("1");
            inqy = arg
        }
        else {
            inqy = this
        }
        let myid = $(inqy).closest("tr").attr("id")
        for (const serch in GetByProducts) {
            if (GetByProducts[serch].includes(`id":${myid}`)) {
                GetByProducts.splice(serch, 1)
                localStorage.setItem("BuysProduct", JSON.stringify(GetByProducts))
            }
        }
        $(inqy).closest("tr").remove()
        EditTotal()
        $(".ml-3").children().last().text(GetByProducts.length)
    }
    function EditTotal() {
        let Rashot = 0
        let Gettotal = JSON.parse(localStorage.getItem("BuysProduct")).map(el => JSON.parse(el))
        for (const rash of Gettotal) {
            Rashot += rash.price * rash.count
        }
        let shipings = Rashot != 0 ? 10 : 0
        $("#Subtotal").text(Rashot + "$")
        $("#Shipping").text(shipings + "$")
        $("#TotalPrice").text(Rashot + shipings + "$")

    }

    $("#BuyProds").on("click change", ".btn-minus,.btn-plus,.inpos", ChangeProductCount)
    $("#BuyProds").on("click", ".delete", DelProdcut)
    GetBuy_Products()
    EditTotal()
})




