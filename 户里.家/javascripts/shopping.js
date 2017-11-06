//调用头部和尾部
window.name = "shopping";
addHeader("../json/headerData.json");
addFooter("../json/footerData.json");
$(function(){
    var $order = JSON.parse(localStorage.getItem("detaShoppingcart"));
    $order.forEach(function (item) {
        $("tbody").append('<tr>' +
            '<td class="icon_ckd">' +
            '<input name="selector_btn" type="checkbox" class="selector_btn"> ' +
            '<i class="icon i_Ckd"></i>' +
            '</td>' +
            '<td class="goodsInfo">' +
            '<div>' +
            '<img src="' + item.img + '">' +
            '<p><a href="#">' + item.tit + '</a></p>' +
            '</div>' +
            '<div>' +
            '<p>' + '产品尺寸' + '</p>' +
            '<p>' + '产品材质' + '</p>' +
            '<p>' + '产品颜色' + '</p>'+
            '</div>' +
            '</td>' +
            '<td class="price">' + item.oPrice + '</td>' +
            '<td class="goods_count">' +
            '<button type="button" class="btn_Subtract">' + "-" + '</button> ' +
            '<input type="text" value="0" class="num"> ' +
            '<button type="button" class="btn_add">' + '+' + '</button> ' +
            '</td>' +
            '<td class="sum_price">' + '￥0'+ '</td>' +
            '<td class="goods_del"><a href="#">' + '删除' + '</a> </td>' +
            '</tr>');
        }); 
        /* 用加减号控制文本框内的数值 */
        count_setBtn();
        deleCurrentRow();
    // 创建填出框内容
	$("body").append(
		'<component class="closing">'+
			'<div class="maskLayer">'+'</div>'+
			'<div class="popupBox">'+
				'<div class="popupBox-content">'+'确定去支付吗?'+'</div>'+
				'<div class="popupBox-ctrl">'+
					'<button class="popupBox-btn-confirm" type="button">'+'确定'+'</button>'+
					'<button class="popupBox-btn-cancel" type="button">'+'取消'+'</button>'+
				'</div>'+
			'</div>'+
		'</component>');
    $(".closing_right button").on("click",function(){
       $("body component").css("display","block");
    });
    $(".popupBox-ctrl .popupBox-btn-confirm ").on("click",function(){
        localStorage.getItem("num");
        location.href = "information.index.html";
    });
    $(".popupBox-ctrl .popupBox-btn-cancel ").on("click",function(){
        $("body component").css("display","none");
    });
    
    // 跳转到商品分类
    $(".nav_main li a").on("click", function() {
        location.href = "sofas.html";
        var getIndex = $(this).parent().index();
        sessionStorage.setItem("getIndex", getIndex);
    });

});
/* 自定义复选框功能 */
checkbox_custom(".i_Ckd", ".allCkd", "tbody", ".blurb");
/**
* 功能：自定义复选框功能
* 参数：1.子复选框标识符；2.全选框标识符；3.子复选框的遍历范围元素；4.全选框的遍历范围元素
**/
function checkbox_custom(ckb_child, ckb_all, ckb_range, ckb_all_range) {
    
    /* 子复选框点击功能 */
    $(document).on("click", ckb_child, function() {
        var ckd_none = $(this).hasClass("sky_icon");
        // 当未选中时使之选中
        if(ckd_none) {
            $(this).removeClass("sky_icon").addClass("icon");
            $(this).siblings("input[type='checkbox']").prop("checked", true);

            // 获得子复选框的个数和未选中个数
            var cld_count = $(ckb_range).find(ckb_child).length,
                cld_none_count = $(ckb_range).find(".sky_icon").length;
            //已选商品
            $(".amount .count_sum").text(cld_count - cld_none_count);
            // 如果全部选中
            if(cld_none_count == 0) {
                // 全选框设为选中状态
                $(ckb_all).removeClass("sky_icon half_icon").addClass("icon");
                $(ckb_all).siblings("input[type='checkbox']").prop("checked", true);
            }
            // 如果只是选中部分
            else {
                // 全选框设为部分选中状态
                $(ckb_all).removeClass("sky_icon icon").addClass("half_icon");
                $(ckb_all).siblings("input[type='checkbox']").prop("checked", true);
            }
        }
        // 否则取消选中效果
        else {
            $(this).removeClass("icon").addClass("sky_icon");
            $(this).siblings("input[type='checkbox']").prop("checked", false);

            // 获得子复选框的个数和未选中个数
            var cld_count = $(ckb_range).find(ckb_child).length,
                cld_none_count = $(ckb_range).find(".sky_icon").length;
            //已选商品
            $(".amount .count_sum").text(cld_count - cld_none_count);
            // 如果只是选中部分
            if(cld_count != cld_none_count && cld_none_count != 0) {
                // 全选框设为部分选中状态
                $(ckb_all).removeClass("sky_icon icon").addClass("half_icon");
                $(ckb_all).siblings("input[type='checkbox']").prop("checked", true);
            }
            // 如果全未选中
            else {
                // 全选框设为初始状态
                $(ckb_all).removeClass("half_icon icon").addClass("sky_icon");
                $(ckb_all).siblings("input[type='checkbox']").prop("checked", false);
            }
        }
    });

    /* 全选复选框点击功能 */
    $(document).on("click", ckb_all, function() {
        var ckb = $(ckb_all_range).find(ckb_child),
            ckb_len = ckb.length,
            ckb_none = $(ckb_all_range).find(ckb_child + ".sky_icon"),
            ckb_none_len = ckb_none.length,
            allCkd = !(ckb_none_len == 0),
            ckb_all_len = $(ckb_all).length;

        // 如果未全选中
        if(allCkd) {
            // 将子复选框全部选中
            for(var i = 0; i < ckb_len; i++) {
                ckb.eq(i).removeClass("sky_icon").addClass("icon");
                ckb.eq(i).siblings("input[type='checkbox']").prop("checked", true);
            }
            // 将全选框选中
            $(ckb_all).removeClass("sky_icon half_icon").addClass("icon");
            $(ckb_all).siblings("input[type='checkbox']").prop("checked", true);
            $(".amount .count_sum").text(ckb_len);
        }
        // 如果已全选中
        else {
            // 取消所有选中状态
            for(var i = 0; i < ckb_len; i++) {
                ckb.eq(i).removeClass("icon").addClass("sky_icon");
                ckb.eq(i).siblings("input[type='checkbox']").prop("checked", false);
            }
            // 取消全选状态
            $(ckb_all).removeClass("half_icon icon").addClass("sky_icon");
            $(ckb_all).siblings("input[type='checkbox']").prop("checked", false);
            $(".amount .count_sum").text(ckb_none_len);
        }
    });
}



    /**
 * 功能：用加减号控制文本框内的数值
 * 参数：增减按钮的直接父容器
 **/
function count_setBtn() {
    //减少数量点击事件
    $(".goods_count .btn_Subtract").on("click",function(){
        //减少数量
        var count = parseInt($(this).next().val());
        $(this).next().val(--count);
        //获取单价
        var unitPrice = parseInt($(this).parent().prev().text());
        //计算金额
        var calcUnitPrice = unitPrice * count;
        //设置金额
        $(this).parent().next().text("￥" + calcUnitPrice);
        //获取购物车商品条数
        var $shopCarGoods = $("#shoppingCar tbody tr");
        var goodsLeng = $shopCarGoods.length;
        //总金额计数
        var totalCount = 0;
        // 当数值小于等于2时减1并禁用
            if (count <=0) {
                $(this).attr("disabled", true);
                console.log(price);
            }
        //计算总计金额
        for(var i = 0 ; i < goodsLeng; i++){
             var currentPrice = parseInt($shopCarGoods.eq(i).children("td").eq(4).text().slice(1));
            
           
            totalCount += currentPrice;
        }
        //设置总金额
        $(".amount .money").text("￥" + totalCount);   
    });
            
    
    
    // 增加数量点击事件
    $(".goods_count .btn_add").on("click",function() {
        // 增加数量
        var count = parseInt($(this).prev().val());
        $(this).prev().val(++count);
        // 获取单价
        var unitPrice = parseInt($(this).parent().prev().text());
        // 计算金额
        var calcUnitPrice = unitPrice * count;
        // 设置金额
        $(this).parent().next().text("￥" + calcUnitPrice);
        // 获取购物车商品条数
        var $shopCarGoods = $("#shoppingCar tbody tr");
        var goodsLeng = $shopCarGoods.length;
        // 总金额计数
        var totalCount = 0;
        // 计算总计金额
        for(var i = 0; i < goodsLeng; i++) {
            var currentPrice = parseInt($shopCarGoods.eq(i).children("td").eq(4).text().slice(1));
            totalCount += currentPrice;
        }
        // 设置总金额
        $(".amount .money").text("￥" + totalCount);
    });
}

/**
* 功能：按钮禁用功能绑定
**/
function disabled_button() {
    var btn = $("button"),
        btn_len = btn.length;

    for(var i = 0; i < btn_len; i++) {
        var isDisBtn = btn.eq(i).hasClass("disabled");
        if(isDisBtn) {
            btn.eq(i).attr("disabled", true);
        }
    }
}


/**
* 功能：删除当前行
**/
function deleCurrentRow(){
    $(".goods_del a").on("click",function(){
        $(this).closest("tr").addClass("watingDele");
        PopupBox({
            confirm:function(){
                $("tr.watingDele").remove();
                $(this).closest("component").fadeOut(600,function(){
                    $(this).remove();
                });
            },
            cancel:function(){
                $("tr.watingDele").removeClass("watingDele");
                $(this).closest("component").fadeOut(600,function(){
                    $(this).remove();
                });
            },
        });
    });
}
/**
* 功能：自定义对话框
* 参数：
* param.confirm：确认按钮功能（Function）
* param.cancel：取消按钮功能（Function）
**/
function PopupBox(param) {
	// 创建填出框内容
	$("body").append(
		'<component>'+
			'<div class="maskLayer">'+'</div>'+
			'<div class="popupBox">'+
				'<div class="popupBox-content">'+'确定要删除数据吗?'+'</div>'+
				'<div class="popupBox-ctrl">'+
					'<button class="popupBox-btn-confirm" type="button">'+'确定'+'</button>'+
					'<button class="popupBox-btn-cancel" type="button">'+'取消'+'</button>'+
				'</div>'+
			'</div>'+
		'</component>');
	// 确定操作
	$(".popupBox-btn-confirm").on("click", function() {
		param.confirm.bind(this)();
	});
	// 取消操作
	$(".popupBox-btn-cancel").on("click", function() {
		param.cancel.bind(this)();
	});
}













