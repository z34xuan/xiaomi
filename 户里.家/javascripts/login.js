/**
 * Created by admin on 2017/10/31.
 */
//调用头部和尾部
window.name = "login";
addHeader("../json/headerData.json");
addFooter("../json/footerData.json");
//获取账号，密码
var $btn =$(".btn");
$("form[name=login-form] input").on("keyup", function () {
    statusSet();
});
//判断登陆按钮是否可用
function statusSet() {
    var inputAll = $("form[name=login-form] input");
    for(var i = 0; i < inputAll.length; i++){
        if(inputAll[i].value === ""){
            $btn.css({
                "cursor":"no-allowed",
                "background-color":"#838281"
            }).prop("disabled", true);
            return;
        }
    }
    $btn.css({
        "cursor":"pointer",
        "background-color":"#82c353"
    }).prop("disabled", false);
}
$btn.on("click",function () {
   if($(".btn").css("cursor") === "pointer"){
       login()
   }
});

//判断是否登陆成功
function login() {
    //获取账号密码的值
    var $email = $(".eml").val(),
        $pwd = $(".pwd").val();
    if(localStorage["users"]){
        var user = JSON.parse(localStorage["users"]),
            user_length = user.length;
    }
    //查找状态(找到为true,未找到为false)
    var searchStatus = false;
    //遍历进行用户名对比
    for(var i = 0; i < user_length; i++){
        if(user[i].username === $email){
            searchStatus = true;
            break;
        }
    }
    //判断是否和本地存储的值一样
    if(searchStatus && user[i].password === $pwd){
        var arr ="";
        arr =  $email.split("@")[0];
        //存储当前登录的用户,用于在页面显示
        localStorage.setItem("current",arr);
        alert("恭喜" + arr + "登陆成功");
        location.href = "index.html";
    }else {
        alert("账号或密码错误");
    }
}