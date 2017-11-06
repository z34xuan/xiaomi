//调用头部和尾部
window.name = "Commodity";
addHeader("../json/headerData.json");
addFooter("../json/footerData.json");
$(function(){
    var oA = $(".householdChoose"),
        oSofas = $(".subnav"),
        oTables = $(".subnav_tables"),
        oBeds = $(".subnav_beds"),
        oStorage = $(".subnav_storage"),
        oMore = $(".subnav"),
        oCommend = $(".commend_show");
    
    //获取JSON数据
    $.getJSON("../json/data.json",function(data){
        data.goodsChoose.forEach(function(item){
            oA.append(
                '<a href="#">'+  
                    '<div class="householdImg">'+'<img src="' + item.img +'">'+'</div>'+
                    '<div class="householdBaseInfo">'+
                        '<span class="householdName">' + item.name + '</span>'+
                        '<span class="householdPrice">'+
                            '<span class="oldPrice">'+
                                '<span>' + item.price + '</span>'+
                                '<span class="delePrice">'+'</span>'+
                            '</span>'+
                            '<span class="newPrice">'+
                                '<span>' +item.newest + '</span>'+
                            '</span>'+
                        '</span>'+
                    '</div>'+
                '</a>');
            if(item.newest != ""){
                $(".delePrice").css("display","block");
            }
        }); 
        //循环添加动态数据
        data.sofas.forEach(function(item){
           oSofas.append('<li>'+'<a href="#">'+item+ '</a>'+'</li>'); 
        });
        data.tablesAndChairs.forEach(function(item){
           oTables.append('<li>'+'<a href="#">'+item+ '</a>'+'</li>'); 
        });
        data.beds.forEach(function(item){
           oBeds.append('<li>'+'<a href="#">'+item+ '</a>'+'</li>'); 
        });
        data.storage.forEach(function(item){
           oStorage.append('<li>'+'<a href="#">'+item+ '</a>'+'</li>'); 
        });
        data.more.forEach(function(item){
           oMore.append('<li>'+'<a href="#">'+item+ '</a>'+'</li>'); 
        });
        $(".classifyFilter ul li").click(function(){
            //当前元素添加指定class，其它所有兄弟元素则移除这个class
            $(this).addClass("active").siblings().removeClass("active");
            //将当前元素父级的上一个同级元素添加字体颜色
            $(this).parent().prev().css("color","#d8170e");
        });
    });  
    
});
select();
function select() {
            $(".classifyFilter ul li").on("click",function () {
                var $active =  $(".active");
                $active.on("click",function () {
                    $(this).parent().prev().text($(this).text());
                })
            })
        }
/*跳转到详情页*/
$(function () {
    detailsPage()
});

function detailsPage() {
    $(".householdChoose").on("click","a",function () {
        var title = $(".li_left:nth-child(1)>a:nth-child(1)").text()
        var orPrice = $(this).children().children().children(".oldPrice").children("span:first").text();
       var price   = $(this).children().children().children(".newPrice").children("span:first").text();
       var obj = {
           "title":title,
           "orPrice":orPrice,
           "price":price
       };
       var detailsPage = JSON.stringify(obj);
       localStorage.setItem("detailsPage",detailsPage);
        location.href ="toggle.html"
    })
}
