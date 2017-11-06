/*/
 *Created by zxh 2017/9/27
 * 配件模块
 */
main();
function main() {
    // 获取dom元素
    var aLis = Array.prototype.slice.call(document.querySelectorAll(".parts .menu-item-list li"));

    // 获取数据
    GET("js/data.json", function (response) {
        // 设置默认数据
        updateInterface(response["parts"][0]);
        // 交互设计
        aLis.forEach(function (oLi, idx) {
            oLi.idx = idx;
            //鼠标事件
            oLi.onmouseenter = function () {
                for(var i = 0; i < aLis.length; i++) {
                    if(aLis[i].classList.contains('tab-active')) {
                        aLis[i].classList.remove('tab-active');
                        break;
                    }
                }
                this.classList.add('tab-active');
                updateInterface(response["parts"][this.idx]);
            }
        });
    }, function (fail) {});
}