
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
    /*https://api.adminweb.vnpage.vn/api/nguyengia.vn/tintuc/danhmuc/10081/0/1 */
        //alert(`${SERVICE_URL}/tintuc/danhmuc/${IDmenu}/${page}/${size}`);
        //let data2 = await fetchAPI(`${SERVICE_URL}/tintuc/danhmuc/${IDmenu}/${page}/${size}`); 
      
        //https://api.support.vnpage.vn/api/runquery/webportal/nguyengiafood.com/select * from T_TIN_TUC
        var strSQL = "select top 6 * FROM T_TIN_TUC";       
        let data = await fetchAPI(`${SERVICE_URL_RUNQUERY}/${strSQL}`);
        if (data.length == 0) {
            document.getElementById("Div_TinTuc").innerHTML = `<div class="col-12 text-center">
                    <h4>Không tìm thấy thông tin</h4>
                    </div>`;
            $('#xemthem').hide();
        }
        
        ShowInfo_list_sanpham(data, 'Div_TinTuc');       

    }
    catch (err) {
        Baoloi(err);
    }
}

/*Xử lý dữ liệu Post*/
const ShowInfo_list_sanpham = (data, idAPI) => {
    var info = "";    
    data.forEach((item) => {        
        
        info += `<div class="col-lg-4 col-md-6">
                <div class="l_news_item">
                    <div class="l_news_img">
                        <img src="${getThumbSizeImgPost(item.hinH_ANH, item.iD_TIN_TUC)}" alt="" class="img-pro">
                    </div>
                    <div class="l_news_text">
                        <a href="#"><h5>${item.ngaY_CAP_NHAT}</h5></a>
                        <a href="#"><h4>${item.tieU_DE}</h4></a>
                        <p>${item.toM_TAT}</p>
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

