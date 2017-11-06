/*
 *Created by zxh 2017/9/26
 * 网页中的调用函数
 */
function updateNavface(datas) {
    // 获取元素
    var oFirsts = Array.prototype.slice.call(document.querySelectorAll('.first'));

    var oImg = Array.prototype.slice.call(document.querySelectorAll('.first img'));

    // 遍历元素li
    oFirsts.forEach(function (oFirstsList,idx) {
        oImg[idx].src = "img/" + datas[idx]["img"];
        oFirstsList.children[1].textContent = datas[idx]["name"];
        oFirstsList.children[2].textContent = datas[idx]["money"];
        oFirstsList.children[3].textContent = datas[idx]["commodity"];
        if(datas[idx]["commodity"] == "") {
            oFirstsList.children[3].style.border = "transparent";
        } else {
            oFirstsList.children[3].style.border = "1px solid #ff6700";
        }
    })


}

function updateInterface(data) {
    // 获取元素
    var oPartsItems = Array.prototype.slice.call(document.querySelectorAll('.parts .box-item-list'));
    var oTopParts = document.querySelector('.parts .top');
    var oBottomParts = document.querySelector('.parts .bottom');
    // 遍历元素li
    oPartsItems.forEach(function (oBoxItem, idx) {
        // 设置第1、6个的图片
        if(idx == 0 || idx == 5) {
            oBoxItem.style.background = "url('img/" + data[idx] + "') no-repeat 50% 50%";
        }else if(idx == 9) {
            // 更新上方盒子
            oTopParts.querySelector('.title').textContent = data[idx]["top-Title"];
            oTopParts.querySelector('.price').textContent = data[idx]["top-price"];
            oTopParts.querySelector('img').src = "img/" + data[idx]["top-imgName"];
            // 更新浏览更多模块
            oBottomParts.querySelector('.des').textContent = data[idx]["bottom-des"];
        }else {
            // 设置图片
            oBoxItem.children[0].style.background = "url('img/" + data[idx]["imgName"] + "') no-repeat 50% 50%";
            // 设置标题
            oBoxItem.children[1].textContent = data[idx]["title"];
            // 设置价格
            oBoxItem.children[2].textContent = data[idx]["price"];
            // 设置评论
            oBoxItem.children[3].textContent = data[idx]["appraise"];
            // 设置tips
            oBoxItem.children[4].textContent = "";
            oBoxItem.children[4].style.background = "";
            if(data[idx]["tips"]) {
                oBoxItem.children[4].textContent = data[idx]["tips"];
                oBoxItem.children[4].style.backgroundColor = data[idx]["tips"] == "新品" ? "#83c44e" : "#e53935";
            }
            // 设置滑条内容
            oBoxItem.children[5].firstElementChild.textContent = data[idx]["appraiseDes"];
            oBoxItem.children[5].lastElementChild.textContent = data[idx]["appraiseFrom"];

        }
    });

}














