window.onload = function() {
  var bannerHeight = document.querySelector(".jd_banner").offsetHeight;

  var search = document.querySelector(".jd_search");

  window.onscroll = function() {
    var scrollHeight =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (scrollHeight <= bannerHeight) {
      var opacity = scrollHeight / bannerHeight;

      search.style.backgroundColor = "rgba(233,35,34," + opacity + ")";
    }
  };

  timeBack();

  bannerEffect();
};

function bannerEffect() {
  // var bannerWidth = document.querySelector('.jd_banner').offsetWidth;

  var imgBox = document.querySelector(".jd_bannerImg");

  var first = imgBox.querySelector("li:first-of-type");

  var last = imgBox.querySelector("li:last-of-type");

  var circles = document.querySelector(".jd_bannerList").querySelectorAll("li");

  imgBox.appendChild(first.cloneNode(true));

  imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);

  var lis = imgBox.querySelectorAll("li");

  // 设置默认偏移的索引,因为前面还有一张,所以是1;
  var index = 1;

  var count = lis.length;

  imgBox.style.width = count * 100 + "%";

  for (var i = 0; i < count; i++) {
    lis[i].setAttribute('liIndex',i);
    lis[i].style.width = 100 / count + "%";
  }

  imgBox.style.left = -index * 100 + "%";

  // 设置自动轮播
  var timerId;
  function startTime() {
    timerId = setInterval(function() {
      index++;

      imgBox.style.transition = "left 0.3s ease-in-out";

      imgBox.style.left = -index * 100 + "%";

      setTimeout(function() {
        if (index == count - 1) {
          index = 1;
          imgBox.style.transition = "none";
          imgBox.style.left = -index * 100 + "%";
        }
      }, 500);
    }, 2000);
  }
  startTime();

  var setIndicator = function(index){
    var indicators = document.querySelector('.jd_bannerList').querySelectorAll('li');
    for(var i = 0;i<indicators.length;i++){
      indicators[i].classList.remove('active');
    }
    indicators[index-1].classList.add("active");
  }



  // 手动轮播
    var banner = document.querySelector(".jd_banner");
    var startX, moveX, distanceX;
    // var flag = true;
    banner.addEventListener("touchstart", function(e) {
      // console.log(e.targetTouches[0].target.parentNode.parentNode);
      var currentLi = e.targetTouches[0].target.parentNode.parentNode;
      var currentLiIndex = currentLi.getAttribute('liIndex');
      // console.log(currentLiIndex);
      if(currentLiIndex == 9 || currentLiIndex == 0){
        return;
      }
      clearInterval(timerId);
      startX = e.targetTouches[0].clientX;
    });
    banner.addEventListener("touchmove", function(e) {
      var currentLi = e.targetTouches[0].target.parentNode.parentNode;
      var currentLiIndex = currentLi.getAttribute('liIndex');
      // console.log(currentLi);
      if(currentLiIndex == 9 || currentLiIndex == 0){
        return;
      }
      clearInterval(timerId);
      var bannerWidth = document.querySelector(".jd_banner").offsetWidth;

      // console.log(e.targetTouches[0]);
      moveX = e.targetTouches[0].clientX;

      distanceX = moveX - startX;

      imgBox.style.transition = "none";

      imgBox.style.left = -index * 100 + (distanceX / bannerWidth) * 100 + "%";
    });
    banner.addEventListener("touchend", function(e) {
      // console.log(e.target.parentNode.parentNode);
      var currentLi = e.target.parentNode.parentNode;
      var currentLiIndex = currentLi.getAttribute('liIndex');
      if(currentLiIndex == 9 || currentLiIndex == 0){
        return;
      }
      // console.log(index);
      // console.log(e.targetTouches[0]);
      
      clearInterval(timerId);
      // console.log(distanceX);
       if (Math.abs(distanceX) > 100) {
        //  flag = false;
        if (distanceX > 0) {
          index--;
        } else {
          index++;
        }
        imgBox.style.transition = "left 0.3s ease-in-out";
        imgBox.style.left = -index * 100 + "%";
        
      } else if (Math.abs(distanceX) > 0) {
        // flag = false;
        imgBox.style.transition = "left 0.3s ease-in-out";
        imgBox.style.left = -index * 100 + "%";
      }
      // setTimeout(function(){
      //   flag = true;
      // },500)
      startX = 0;
      moveX = 0;
      distanceX = 0;
      startTime();
    });
  
    imgBox.addEventListener("webkitTransitionEnd", function() {
      /*如果到了最后一张(count-1)，回到索引1*/
      /*如果到了第一张(0)，回到索引count-2*/
      if (index >= count - 1) {
        index = 1;
        /*清除过渡*/
        imgBox.style.transition = "none";
        /*设置偏移*/
        imgBox.style.left = -index * 100 + "%";
      } else if (index <= 0) {
        index = count - 2;
        /*清除过渡*/
        imgBox.style.transition = "none";
        /*设置偏移*/
        imgBox.style.left = -index * 100 + "%";
      }
      setIndicator(index);
    });
  
}

function timeBack() {
  var spans = document.querySelectorAll(".jd_sk_time>span");

  var totalTime = 3700;
  (function() {
    totalTime--;
    if (totalTime < 0) {
      clearInterval(timerId);
      return;
    }

    var hour = Math.floor(totalTime / 3600);
    var minute = Math.floor((totalTime % 3600) / 60);
    var second = Math.floor(totalTime % 60);

    spans[0].innerHTML = Math.floor(hour / 10);
    spans[1].innerHTML = Math.floor(hour % 10);

    spans[3].innerHTML = Math.floor(minute / 10);
    spans[4].innerHTML = Math.floor(minute % 10);

    spans[6].innerHTML = Math.floor(second / 10);
    spans[7].innerHTML = Math.floor(second % 10);
  })();

  var timerId = setInterval(function() {
    totalTime--;
    if (totalTime < 0) {
      clearInterval(timerId);
      return;
    }

    var hour = Math.floor(totalTime / 3600);
    var minute = Math.floor((totalTime % 3600) / 60);
    var second = Math.floor(totalTime % 60);

    spans[0].innerHTML = Math.floor(hour / 10);
    spans[1].innerHTML = Math.floor(hour % 10);

    spans[3].innerHTML = Math.floor(minute / 10);
    spans[4].innerHTML = Math.floor(minute % 10);

    spans[6].innerHTML = Math.floor(second / 10);
    spans[7].innerHTML = Math.floor(second % 10);
  }, 1000);
}
