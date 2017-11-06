/*
 *Created by zxh 2017/9/28
 * 为你推荐模块
 */

var oXmBox = document.getElementsByClassName('recommended-for-you')[0];
var oWrong = document.getElementsByClassName('wrong')[0];
var oOcutome = document.getElementsByClassName('ocutome')[0];

main();
function main() {
    //添加点击事件
    oWrong.onclick = function () {
        if (oXmBox.style.left = 0 + "px") {
            oLeft.setAttribute("disabled", "disabled");
        } else {
            oXmBox.style.left = parseInt(getStyle(oXmBox, "left")) + 1226 + "px"
        }
    }

    //添加点击事件
    oOcutome.onclick = function () {
        if (oXmBox.style.left <= -1226 + "px"){
            oRight.setAttribute("disabled","disabled");
        }else{
            oXmBox.style.left = parseInt(getStyle(oXmBox,"left")) - 1226 + "px"
        }
    }
    setTimeout(setTime,3000);
}