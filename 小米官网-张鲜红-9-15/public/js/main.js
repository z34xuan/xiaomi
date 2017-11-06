/*
 *Created by zxh 2017/9/27
 * 导航模块
 */


main();
function main() {
    // 获取dom元素
    var aLis = Array.prototype.slice.call(document.querySelectorAll(".nav-item"));
    var oBox = document.querySelector(".site-header");

    // 获取数据
    GET("js/data.json", function (response) {
        aLis.forEach(function (oLi, idx) {
            oLi.idx = idx;
            oLi.onmouseenter = function () {
                updateNavface(response["objectData"][this.idx]);
                oBox.style.display = "block"
            }
            oLi.onmouseleave=function () {
                oBox.style.display = "none"
            }
        });
    }, function (fail) {});
}


users();
function users() {
    var oBox = document.querySelector(".greet");
    var storage = sessionStorage.getItem('key');
    var oChangeBox = document.querySelector(".logout");
    var oChangeBtn = document.querySelector(".cancel");
    var oExitBtn = document.querySelector(".exit");
    if (storage){
        oBox.innerHTML = "<p>"+ "欢迎您," + storage + "</p>";
        oChangeBox.style.display = "block";
        oBox.style.display = "block";
    }else{
        oChangeBox.style.display = "none";
        oBox.style.display = "none";
    }
    oChangeBtn.onclick = function () {
        window.location.href = "login.html";
    }
    oExitBtn.onclick = function () {
        sessionStorage.clear();
    }

}

