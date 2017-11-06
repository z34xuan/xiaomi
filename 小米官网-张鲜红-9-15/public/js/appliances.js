/*/
 *Created by zxh 2017/9/28
 * 家电模块
 */
(function main() {
    // 获取dom元素
    var aLis = Array.prototype.slice.call(document.querySelectorAll(".appliances .menu-item-list li"));

    // 获取数据
    GET("js/data.json", function (response) {
        // 设置默认数据
        updateAppliancesface(response["appliances"][0]);
        // 交互设计
        aLis.forEach(function (oLi, idx) {
            oLi.idx = idx;
            oLi.onmouseenter = function () {
                for(var i = 0; i < aLis.length; i++) {
                    if(aLis[i].classList.contains('tab-active')) {
                        aLis[i].classList.remove('tab-active');
                        break;
                    }
                }
                this.classList.add('tab-active');
                updateAppliancesface(response["appliances"][this.idx]);
            }
        });
    }, function (fail) {});
}())
function updateAppliancesface(data) {
    // 获取元素
    var oBoxItems = Array.prototype.slice.call(document.querySelectorAll('.appliances .box-item-list'));
    var oTopBox = document.querySelector('.appliances .top');
    var oBottomBox = document.querySelector('.appliances .bottom');
    // 遍历元素li
    oBoxItems.forEach(function (oBoxItem, idx) {
        // 设置第1、6个的图片
        if(idx == 0 || idx == 5) {
            oBoxItem.style.background = "url('img/" + data[idx] + "') no-repeat 50% 50%";
        }else if(idx == 9) {
            // 更新上方盒子
            oTopBox.querySelector('.title').textContent = data[idx]["top-Title"];
            oTopBox.querySelector('.price').textContent = data[idx]["top-price"];
            oTopBox.querySelector('img').src = "img/" + data[idx]["top-imgName"];
            // 更新浏览更多模块
            oBottomBox.querySelector('.des').textContent = data[idx]["bottom-des"];
        }else {
            // 设置图片
            oBoxItem.children[0].style.background = "url('img/" + data[idx]["imgName"] + "') no-repeat 50% 50%";
            // 设置标题
            oBoxItem.children[1].textContent = data[idx]["title"];
            // 设置评论
            oBoxItem.children[2].textContent = data[idx]["appraise"];
            // 设置价格
            oBoxItem.children[3].textContent = data[idx]["price"];
            // 设置tips
            oBoxItem.children[4].textContent = "";
            oBoxItem.children[4].style.background = "";
            //判断tips值的并设置相应的背景
            if(data[idx]["tips"]) {
                oBoxItem.children[4].textContent = data[idx]["tips"];
                if(data[idx]["tips"] == "新品") {
                    oBoxItem.children[4].style.backgroundColor = "#83c44e";
                } else if(data[idx]["tips"] == "免邮费"){
                    oBoxItem.children[4].style.backgroundColor = "#ffac13";
                } else if(data[idx]["tips"] == "有赠品") {
                    oBoxItem.children[4].style.backgroundColor = "#2196f3";
                } else {
                    oBoxItem.children[4].style.backgroundColor = "#e53935";
                }
            }
            // 设置滑条内容
            oBoxItem.children[5].firstElementChild.textContent = data[idx]["appraiseDes"];
            oBoxItem.children[5].lastElementChild.textContent = data[idx]["appraiseFrom"];

        }
    });

}