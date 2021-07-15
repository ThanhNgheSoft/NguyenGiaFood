
var numpage = 0;
var size = 10;
var count = 0;
IDmenu = "10081";

$(document).ready(function () {   
    apiPro(numpage);
   
});



/*Gọi API Post */
const apiPro = async (page) => {    
    try {
        numpage = page;
        /*https://api.adminweb.vnpage.vn/api/nguyengia.vn/sanpham/danhmuc/10081/0/1 */
        let data = await fetchAPI(`${SERVICE_URL}/sanpham/danhmuc/${IDmenu}/${page}/${size}`);   
       
        if (data.length == 0) {
            document.getElementById("api-shop").innerHTML = `<div class="col-12 text-center">
                        <h4>Bất động sản bạn cần tìm hiện không có! hãy tìm với tiêu chí khác</h4>
                    </div>`;
            $('#xemthem').hide();
        }
        
        ShowInfo_list_sanpham(data, 'api-shop'); cake_carousel('api-shop');

        if (data.length >= size) {            
            let data = await fetchAPI(`${SERVICE_URL}/sanpham/danhmuc/${IDmenu}/${page + 1}/${size}`);
            if (data.length != 0) {
                $('#xemthem').show();
            }
            else {
                $('#xemthem').hide();
            }
        } else {
            $('#xemthem').hide();
        }
    }
    catch (err) {
        Baoloi(err);
    }
}

/*Xử lý dữ liệu Post*/
const ShowInfo_list_sanpham = (data, idAPI) => {
    var info = "";    
    data.forEach((item) => {        
        info += `<div class="item">
                    <div class="cake_feature_item">
                        <div class="cake_img">
                            <img src="${getThumbSizeImgProduct(item.HINH_ANH, item.ID_SAN_PHAM)}" alt="">
                        </div>
                        <div class="cake_text">
                            <h4>${item.DON_GIA}</h4>
                            <h3>${item.TEN_SAN_PHAM}</h3>
                            <a class="pest_btn" href="#">Add to cart</a>
                        </div>
                    </div>
                </div>`;
    });

    jQuery("#"+idAPI).append(info);
};
$("#xemthem").click(function (e) {
    e.preventDefault();
    apiPost(`${SERVICE_URL}/Tintuc/danhmuc/${id}/${numpage}/${size}`);
});

function cake_carousel(id) {
    if ($('#'+id).length) {
        $('#' + id).owlCarousel({
            loop: true,
            margin: 30,
            items: 4,
            nav: true,
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            navContainerClass: 'cake_feature_slider',
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                430: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 4,
                }
            }
        })
    }
}