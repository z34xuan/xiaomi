/*
 *Created by zxh 2017/9/26
 * 明星单品模块
 */

var oProduct = document.getElementsByClassName('single-product-list')[0];
var oLeft = document.getElementsByClassName('left')[0];
var oRight = document.getElementsByClassName('right')[0];

main();
function main() {
    oLeft.onclick = function () {
        if (oProduct.style.left = 0 + "px") {
            oLeft.setAttribute("disabled", "disabled");
        } else {
            oProduct.style.left = parseInt(getStyle(oProduct, "left")) + 1100 + "px"
        }
    }

    oRight.onclick = function () {
        if (oProduct.style.left <= -1100 + "px"){
            oRight.setAttribute("disabled","disabled");
        }else{
            oProduct.style.left = parseInt(getStyle(oProduct,"left")) - 1100 + "px"
        }
    }
    setTimeout(setTime,3000);
}

function setTime() {
    if (oProduct.style.left =0+'px'){
        oProduct.setAttribute("left","1100px")
    }else {

    }

}
