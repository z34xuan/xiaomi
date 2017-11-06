/*
 *Created by zxh 2017/9/29
 * 内容部分的应用模块
 */

(function content() {
    //获取元素
    var oPrev    = document.getElementsByClassName('app-prev')[0];
    var oNext    = document.getElementsByClassName('app-next')[0];
    var oUl    = document.getElementsByClassName('app')[0];
    var aIdots = document.getElementsByClassName('app-idot');
    //记录当前显示图片位置
    var curImgsIdx   = 0;
    //记录动画执行状态
    var isAnimating = false;

    /**
     * 为左右按钮添加点击事件
     */
    oPrev.onclick = function () {
        if(curImgsIdx == 0 || isAnimating) {return;}
        curImgsIdx--;
        //调用封闭函数
        tab(296);
        changeIdots();
    }
    oNext.onclick = function () {
        if(curImgsIdx == oUl.childElementCount - 1 || isAnimating) {return;}
        curImgsIdx++;
        //调用封闭函数
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
            //调用封闭函数
            tab(offset);
            changeIdots();
        }
    }

    /**
     * 图片切换的函数封装
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

    /*
     * 根据切换的图片来改变圆点的样式
     */
    function changeIdots() {
        for(var i = 0; i < aIdots.length; i++) {
            if(aIdots[i].classList.contains('active')) {
                aIdots[i].classList.remove('active');
                break;
            }
        }
        aIdots[curImgsIdx].classList.add('active');
    }
    
}());