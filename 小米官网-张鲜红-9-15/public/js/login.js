/*
 *Created by zxh 2017/9/28
 * 登录模块
 */

var oUser  = document.querySelector('#userName');
var oPwd = document.querySelector('#userPwd');
var oBtnadpt = document.querySelector('.btnadpt');
oBtnadpt.onclick = function () {
    login("users", {
        "username":oUser.value,
        "password":oPwd.value
    }, function (status) {
        if(status == 0) {
            alert('用户不存在！');
        }else if(status == 1) {
            alert("账号或密码错误！");
        }else if(status == 2) {
            alert("账号或密码为空！");
        }else if(status == 200) {
            alert("登录成功！");
            window.open("index.html");
            sessionStorage.setItem("key",oUser.value);
        }
    });
};