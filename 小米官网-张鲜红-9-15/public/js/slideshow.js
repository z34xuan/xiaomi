/*
 *Created by zxh 2017/9/26
 * 轮播图的淡入淡出模块
 */
// 轮播图获取页面元素
var oWrap  = document.getElementsByClassName('wrap')[0];
var oPrev  = document.getElementsByClassName('prev')[0];
var oNext  = document.getElementsByClassName('next')[0];
var aImgs  = document.getElementsByClassName('slideshow')[0].children;
var aIdots = document.getElementsByClassName('idot_box')[0].children;
// 记录当前显示图片位置
var curImgIdx = 0;
// 记录动画执行状态
var isAnimating = false;
// 定时器（自动轮播）
var timer = null;
main();
// 显示默认图片
tab();
// 自动轮播
autoplay();
function main() {
    /**
     * 事件添加
     */
    oPrev.onclick = function () {
        // 异常处理，如果当前正在执行图片过渡，则不做任何处理
        if(isAnimating) {
            return;
        }
        curImgIdx = curImgIdx == 0 ? 5 : --curImgIdx;
        tab();
    }
    oNext.onclick = function () {
        if(isAnimating) {
            return;
        }
        curImgIdx = curImgIdx == 5 ? 0 : ++curImgIdx;
        tab();
    }

// 为下面的指示器添加事件（可点击切换）
    for(var i = 0; i < aIdots.length; i++) {
        aIdots[i].idx = i;
        addEvent(aIdots[i], 'click', function () {
            if(isAnimating || this.classList.contains('active')) {
                return;
            }
            curImgIdx = this.idx;
            tab();
        });
    }

// 为图片添加点击事件
    for(var i = 0; i < aImgs.length; i++) {
        aImgs[i].idx = i;
        addEvent(aImgs[i], 'click', function () {
        });
    }

    oWrap.onmouseenter = stop;
    oWrap.onmouseleave = autoplay;
}

/**
 * 函数封装
 */
function tab() {
    isAnimating = true;
    // 异常处理
    for(var i = 0; i < aImgs.length; i++) {
        if(aIdots[i].classList.contains('active')) {
            aIdots[i].classList.remove('active');
            fade(aImgs[i], 0);
            aImgs[i].style.zIndex = '0';
            break;
        }
    }
    aIdots[curImgIdx].classList.add('active');
    fade(aImgs[curImgIdx], 100, 1000, function () {
        isAnimating = false;
    });
    aImgs[curImgIdx].style.zIndex = '1';
}

/**
 * 自动播放
 */
function autoplay() {
    console.log('播放');
    timer = setInterval(function () {
        oNext.onclick();
    }, 5000);
}

/**
 * 停止播放
 */
function stop() {
    clearInterval(timer);
}