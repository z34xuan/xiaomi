/*
 *Created by zxh 2017/9/29
 * 内容部分的游戏模块
 */

(function content() {
    var oPrev    = document.getElementsByClassName('game-prev')[0];
    var oNext    = document.getElementsByClassName('game-next')[0];
    var oUl    = document.getElementsByClassName('game')[0];
    var aIdots = document.getElementsByClassName('game-idot');
    var curImgsIdx   = 0;
    var isAnimating = false;

    /**
     * 为左右按钮添加点击事件
     */
    oPrev.onclick = function () {
        if(curImgsIdx == 0 || isAnimating) {return;}
        curImgsIdx--;
        tab(296);
        changeIdots();
    }
    oNext.onclick = function () {
        if(curImgsIdx == oUl.childElementCount - 1 || isAnimating) {return;}
        curImgsIdx++;
        tab(-296);
        changeIdots();
    }

    //为圆点添加点击事件
    for(var i = 0; i < aIdots.length; i++) {
        aIdots[i].idx = i;
        aIdots[i].onclick = function () {
            if(this == aIdots[curImgsIdx] || isAnimating) {return;}
            var offset = -296 * (this.idx - curImgsIdx);
            curImgsIdx = this.idx;
            tab(offset);
            changeIdots();
        }
    }

    /**
     * 函数封装
     */
    function tab(offset) {
        isAnimating = true;
        var curLeft = parseInt(getStyle(oUl, 'left'));
        var desLeft = curLeft + offset;
        var duration = 500;
        var interval = 20;
        var speed    = Math.ceil(offset / (duration / interval));
        var t = setInterval(function () {
            curLeft = parseInt(getStyle(oUl, 'left'));
            if((offset > 0 && curLeft < desLeft) || (offset < 0 && curLeft > desLeft)) {
                oUl.style.left = curLeft + speed + 'px';
            }else {
                clearInterval(t);
                isAnimating = false;
                oUl.style.left = desLeft + 'px';
            }
        }, interval);
    }

    function changeIdots() {
        for(var i = 0; i < aIdots.length; i++) {
            if(aIdots[i].classList.contains('active')) {
                aIdots[i].classList.remove('active');
                break;
            }
        }
        aIdots[curImgsIdx].classList.add('active');
    }

    function getStyle(element, attr) {
        if(element.currentStyle) {
            return element.currentStyle[attr];
        }else {
            return getComputedStyle(element, null)[attr];
        }
    }
}());