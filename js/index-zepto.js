$(function() {
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
});

function bannerEffect() {
  var first = $(".jd_bannerImg").find("li:first-of-type");
  var last = $(".jd_bannerImg").find("li:last-of-type");

  $(".jd_bannerImg").append(first.clone());
  last.clone().insertBefore(first);

  var count = $(".jd_bannerImg").children().length;
  $(".jd_bannerImg").width(count * 100 + "%");
  $(".jd_bannerImg")
    .children()
    .width(100 / count + "%");

  $(".jd_bannerImg").css("left", "-100%");

  var index = 1;
  var imgBox = $(".jd_bannerImg");

  function imgAnimate() {
    imgBox.animate(
      { left: -index * 100 + "%" },
      200,
      "ease-in-out",
      function() {
        if (index == count - 1) {
          index = 1;
          imgBox.css("left", -index * 100 + "%");
        } else if (index == 0) {
          index = count - 2;
          imgBox.css("left", -index * 100 + "%");
        }

        $(".jd_bannerList")
          .children()
          .removeClass("active")
          .eq(index - 1)
          .addClass("active");

          
      }
    );
  }

  var timerId ;
  // 设置自动轮播
  function setAutoPlay(){
     timerId = setInterval(function() {
      index++;
      imgAnimate();
    }, 1000);
  }
  setAutoPlay();

  // 设置手动轮播
  imgBox.on("swipeLeft", function() {
    // console.log('left');
    clearInterval(timerId);
    index++;
    imgAnimate();
    setAutoPlay();
  });
  imgBox.on('swipeRight',function(){
    // console.log('right');
    clearInterval(timerId);
    index--;
    imgAnimate();
    setAutoPlay();
  })
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
