
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
        
        ShowInfo_list_sanpham(data, 'api-shop');

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
        info += `<div class="col-lg-3 col-md-4 col-6">
                <div class="cake_feature_item">
                    <div class="cake_img">
                        <img src="${getThumbSizeImgProduct(item.HINH_ANH, item.ID_SAN_PHAM)}" class="img-pro">
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