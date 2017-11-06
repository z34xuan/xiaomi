/*
 *Created by zxh 2017/9/27
 * 视频模块
 */


main();
function main() {
    // 获取视频DOM元素
    var aVideos     = Array.prototype.slice.call(document.querySelectorAll('.video-item'));
    var aA          = Array.prototype.slice.call(document.querySelectorAll('.figure-a a'));
    var aTitles     = Array.prototype.slice.call(document.querySelectorAll('.h3_title'));
    var aDescs      = Array.prototype.slice.call(document.querySelectorAll('.p_desc'));

    var oClose      = document.querySelector('.video-close');
    var oVideoMask  = document.querySelector('.video-mask');
    var oVideoTitle = document.querySelector('.video-title');
    var oVideoShow  = document.querySelector('.video-show');
    var oVideoPlay  = document.querySelector('.video-play');
    var oVideo      = document.querySelector('video');

    // 请求视频数据
    GET("js/data.json", function (response) {
        // 刷新页面
        var datas = response["video"];
        //循环遍历li
        aVideos.forEach(function (video, idx) {
            // 加载数据
            aA[idx].firstElementChild.src = "img/" + datas[idx]["imgName"];
            aA[idx].setAttribute("data-bgimg", datas[idx]["bgImgName"]);
            aTitles[idx].textContent = datas[idx]["title"];
            aDescs[idx].textContent = datas[idx]["subTitle"];
        });
    }, function (errorStatus) {

    });

    // 点击链接显示视频窗口
    aA.forEach(function (a, idx) {
        // 设置下标属性获取数据
        a.idx = idx;
        addEvent(a, "click", function () {
            // 更新视频弹框上的title
            oVideoTitle.textContent = aTitles[this.idx].textContent;
            // 加载视频背景图
            oVideoShow.style.background = "url(img/" + this.getAttribute('data-bgimg') + ") no-repeat 50% 50%";
            // 更新视频连接
            oVideo.src = this.getAttribute("data-video");
            // 显示视频窗口
            oVideoMask.style.display = "block";
        });
    });

    // 关闭视频窗口
    addEvent(oClose, "click", function () {
        // 暂停视频
        oVideo.pause();
        // 隐藏视频
        oVideo.style.display = "none";
        // 将播放按钮显示状态设置为block
        oVideoPlay.style.display = "block";
        // 隐藏视频窗口
        oVideoMask.style.display = "none";

    });
    // 点击播放视频
    addEvent(oVideoShow, "click", function () {
        //隐藏播放按钮
        oVideoPlay.style.display = "none";
        //显示视频
        oVideo.style.display = "block";
        //播放视频
        oVideo.play();
    });
}