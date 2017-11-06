/**
 * Created by admin on 2017/10/31.
 */
window.name = "register";
//调用头部和尾部
addHeader("../json/headerData.json");
addFooter("../json/footerData.json");
//添加用户
function add(key,user,callBack) {
    var users = null;
    if(localStorage[key]){
        users = JSON.parse(localStorage[key]);
    }else {
        users = [];
    }
    users.push(user);
    localStorage[key] = JSON.stringify(users);
    if(callBack){
        callBack();
    }
}
//判断用户是否存在
function judge(key,gist,value,response) {
    if(!localStorage[key]){
        response(1);
        return;
    }
    var users = JSON.parse(localStorage[key]);
//    默认用户不存在
    var tag = false;
    for(var i = 0; i < users.length; i++){
        if(users[i][gist] === value){
            tag = true;
        }
    }
    tag ? response(0) : response(1);
}
//邮箱验证
$(".eml").on("blur",function () {
    var regs = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    if(regs.test($(this).val())){
        $(".Prompt-accounts").css("opacity","0")
    }else {
        $(".Prompt-accounts").css("opacity","1")
        $(".eml").val("")
    }
});
//密码长度验证
$(".pwd").on("blur",function () {
    if($(this).val().length >5 && $(this).val().length < 17){
        $(".Prompt-pwd").css("opacity","0")
    }else{
        $(".Prompt-pwd").css("opacity","1");
        $(".pwd").val("");
    }
});
//确认密码验证
$(".confirm-pwd").on("blur",function () {
    if($(".pwd").val() !== $(".confirm-pwd").val()){
        $(".confirm").css("opacity","1");
        $(this).val("");
    }else{
        $(".confirm").css("opacity","0");

    }
});
//图形验证码验证
$(".Verification-input").on("blur",function () {
    var str = "";
    //获取图形验证码
    var $item = $(".Verification").children(),
        $item_length = $item.length;
    for(var i = 0; i < $item_length; i++){
        str += $item[i].textContent;
    }
    if(str !== $(this).val()){
        $(".request-account").css("opacity","1");
        $(this).val("")
    }else {
        $(".request-account").css("opacity","0");
    }

});
//第一次图形验证码自动生成
fistVerification();
function fistVerification() {
    random_char(5)
}
//点击图形验证码进行更换
$(".Verification").on("click",function () {
    random_char(5);

});
function random_char(length) {
    var $item = $(".Verification").children();
    var strCode = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var str_length = strCode.length;
    for (var i = 0; i < length; ++i) {
        //循环获取样式
        var color = Math.round(Math.random()*20+13);
        var randColor = "color-" + color;
        $item[i].textContent = "";
        $item[i].className = randColor;
        //获取随机数
        var rand = Math.floor(Math.random() * str_length);
        $item[i].textContent = strCode.charAt(rand);
    }
}
$(".btn").on("click",function () {
    if($(".btn").css("cursor") === "pointer"){
        var user = {
            "username" : $(".eml").val(),
            "password" : $(".pwd").val()
        };
        judge("users","username",$(".eml").val(),function (status) {
            if(status === 0){
                alert("用户已存在!");
                $(".eml").val("");
                $(".pwd").val("");
                $(".confirm-pwd").val("");
                $(".Verification-input").val("");
            }else if (status === 1){
                add("users",user,function () {
                    var arr ="";
                    arr =  $(".eml").val().split("@")[0];
                    localStorage.setItem("current",arr);
                    alert("恭喜" + arr + "注册成功");
                    location.href = "../index.html"
                })
            }
        })
    }
});
$("form[name=register-form] input").on("keyup", function () {
    statusSet();
});
//判断点击事件的状态
function statusSet() {
    var inputAll = $("form[name=register-form] input");
    for(var i = 0; i < inputAll.length; i++){
        if(inputAll[i].value === ""){
            $(".btn").css({
                "cursor":"no-allowed",
                "background-color":"#838281"
            }).prop("disabled", true);
            return;
        }
    }
    $(".btn").css({
        "cursor":"pointer",
        "background-color":"#82c353"
    }).prop("disabled", false);
}

