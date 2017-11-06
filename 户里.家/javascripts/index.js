/**
 * Created by admin on 2017/10/30.
 */
window.name = "index";
//调用头部和尾部
addHeader("json/headerData.json");
addFooter("json/footerData.json");
Carousel();
//轮播图
function Carousel() {
    var imgs =  $(".img-box").children(),
        idots = $(".idots-box").children();
    var imgs_length = imgs.length;
//    执行轮播
    setInterval(function () {
        runImgSlide();
    },3000);
//    控制点切换图片
    idots.on("click",function () {
        var thisIdx = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        imgs.eq(thisIdx).addClass("show").siblings().removeClass("show");
    });
//    图片轮播
    function runImgSlide() {
    //    索引
        var showImg = $(".show"),
            showImg_idx = showImg.index();
        //    创建随机数
        var random = Math.round(Math.random() * 3 + 1);
        if(showImg_idx !== imgs_length - 1){
            showImg.removeAttr("class").next().addClass("show enlarge-" + random);
            idots.eq(showImg_idx + 1).addClass("active").siblings().removeClass("active");
        } else {
            showImg.removeAttr("class");
            imgs.eq(0).addClass("show enlarge-" + random);
            idots.eq(0).addClass("active").siblings().removeClass("active");
        }
    }
}

