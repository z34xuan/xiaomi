/*
 *Created by zxh 2017/9/28
 * 注册单品模块
 */

var oUser  = document.querySelector('#userName');
var oPwd = document.querySelector('#userPwd');
var oBtn      = document.querySelector('#btn');

oBtn.onclick = function () {
    // 表单验证
    var user = {
        "username": oUser.value,
        "password": oPwd.value
    };

    // 注册用户
    if(!oUser.value || !oPwd.value) {
        alert("请输入账号或密码！");
        oUser.value = "";
        oPwd.value = "";
        return;
    }

    determineUserIsExists("users", "username", oUser.value, function (status) {
        if(status == 0) {
            alert("用户已经存在！");
            oUser.value = "";
            oPwd.value = "";
        }else if(status == 1) {
            // 存储用户
            addUser("users", user, function () {
                alert("注册成功！");
                // 跳转到主页
                window.open("index.html");
            });
        }
    });
};
