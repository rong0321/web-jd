window.onload = function () {

    var ulBox = document.querySelector('.ct_cLeft').querySelector('ul:first-of-type');

    var startY = 0,
        moveY = 0,
        distanceY = 0,
        currentY = 0;

    var ct_cLeft = document.querySelector('.ct_cLeft');

    var maxTop = 0;

    var minTop = ct_cLeft.offsetHeight - ulBox.offsetHeight;

    // 设置最大弹簧距离
    var maxBounceTop = maxTop + 100;
    // 设置最小弹簧距离
    var minBounceTop = minTop - 100;

    ulBox.addEventListener('touchstart', function (e) {

        startY = e.targetTouches[0].clientY;

    })


    ulBox.addEventListener('touchmove', function (e) {

        moveY = e.targetTouches[0].clientY;

        distanceY = moveY - startY;

        if ((currentY + distanceY) < minBounceTop || (currentY + distanceY) > maxBounceTop) {

            return;

        }
        ulBox.style.transition = 'none';

        ulBox.style.top = (currentY + distanceY) + 'px';

    })

    ulBox.addEventListener('touchend', function () {
        // console.log('min:' + minTop);
        // console.log('currentY:'+currentY);
        // console.log('dy:'+distanceY);

        // console.log(currentY + distanceY);

        if ((currentY + distanceY) < minTop) {
            // console.log(123);
            currentY = minTop;
            ulBox.style.transition = 'top 0.5s ease-out';
            ulBox.style.top = minTop + 'px';
        } else if ((currentY + distanceY) > maxTop) {

            currentY = maxTop;
            ulBox.style.transition = 'top 0.5s ease-out';
            ulBox.style.top = maxTop + 'px';
        } else {

            currentY += distanceY;

        }
        distanceY = 0;
    })


    var lis = ulBox.querySelectorAll('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
    }
    var liHeight = lis[0].offsetHeight;

    // 自己封装的tap事件
    // my$.tap(ulBox, function (e) {

    //     for (var i = 0; i < lis.length; i++) {
    //         lis[i].classList.remove('active');
    //     }

    //     e.target.parentNode.classList.add('active');
    //     if (-(e.target.parentNode.index * liHeight) > minTop) {
    //         ulBox.style.transition = 'top 0.5s ease-out';
    //         ulBox.style.top = -(e.target.parentNode.index * liHeight) + 'px';
    //         currentY = -(e.target.parentNode.index * liHeight);
    //     }else if(-(e.target.parentNode.index * liHeight) < minTop ){
    //         ulBox.style.transition = 'top 0.5s ease-out';
    //         ulBox.style.top = minTop + 'px';
    //         currentY = minTop;
    //     }

    // })

    // zepto封装的tap事件,也是解决了移动端click事件的延时问题,
    // 但是!!随之而来的点透问题.
    // $(ulBox).on('tap',function(e){
    //     for (var i = 0; i < lis.length; i++) {
    //         lis[i].classList.remove('active');
    //     }

    //     e.target.parentNode.classList.add('active');
    //     if (-(e.target.parentNode.index * liHeight) > minTop) {
    //         ulBox.style.transition = 'top 0.5s ease-out';
    //         ulBox.style.top = -(e.target.parentNode.index * liHeight) + 'px';
    //         currentY = -(e.target.parentNode.index * liHeight);
    //     }else if(-(e.target.parentNode.index * liHeight) < minTop ){
    //         ulBox.style.transition = 'top 0.5s ease-out';
    //         ulBox.style.top = minTop + 'px';
    //         currentY = minTop;
    //     }
    // })

    // 插件fastclick完美解决了click延时问题和tap点透问题,

    // 给body上的所有对象绑定fastclick,必须在用之前的操作
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    // 此处的click已经不是以前的click了  是fastclick封装的click,PC端和移动端都能使用
    ulBox.addEventListener('click', function (e) {
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
        }

        e.target.parentNode.classList.add('active');
        if (-(e.target.parentNode.index * liHeight) > minTop) {
            ulBox.style.transition = 'top 0.5s ease-out';
            ulBox.style.top = -(e.target.parentNode.index * liHeight) + 'px';
            currentY = -(e.target.parentNode.index * liHeight);
        } else if (-(e.target.parentNode.index * liHeight) < minTop) {
            ulBox.style.transition = 'top 0.5s ease-out';
            ulBox.style.top = minTop + 'px';
            currentY = minTop;
        }
    })

    // 以上都是原生js实现滚动和拖拽,以下用iscroll插件,非常方便的实现页面的滚动,
    // 需要页面结构符合
    // <div id="wrapper">
    //     <ul>
    //         <li>...</li>
    //         <li>...</li>
    //         ...
    //     </ul>
    // </div>
    // 不一定是div>ul>li   符合这个结构即可

    // 这一句初始化iscroll即可.第二个参数是个对象控制滚轮和滚动条
    // 此滚动条是定位的,需要给父盒子设置position:relative;
    var myScroll = new IScroll('#ct_hotCategory', {
        mouseWheel: true,
        scrollbars: true
    });









}