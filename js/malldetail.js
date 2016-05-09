/**
 * Created by lele88lala on 16/4/26.
 */
var html = document.querySelector("html");
var rem = html.offsetWidth / 20;
html.style.fontSize = rem + "px";
document.querySelector(".wrap").addEventListener("touchstart", touchHandler, false);
document.querySelector(".wrap").addEventListener("touchmove", touchHandler, false);
document.querySelector(".wrap").addEventListener("touchend", touchHandler, false);
var xDown = null;
var slideWidth = document.querySelector(".holder").offsetWidth;
var ind= 0;
var xDiff = null;
var arr = new Array("dot-pic1", "dot-pic2", "dot-pic3");
var len = document.querySelector("html").offsetWidth / 20;
function touchHandler(e) {
    if (e.type == "touchstart") {
        xDown = e.touches[0].clientX;
        document.querySelector(".animate").removeAttribute("animate");
        document.querySelector("#" + arr[ind] + "").setAttribute("class", "docselectcolor");
        //document.querySelector("#"+arr[index]+"").classList.remove("dotcolor");
    } else if (e.type == "touchmove") {
        var xUp = e.touches[0].clientX;
        xDiff = ind * slideWidth + xDown - xUp;
        if (xDiff < 800) {
            document.querySelector(".wrap").style.cssText = "transform:translate3d(-" + xDiff + "px,0,0)";
        }
    } else if (e.type == "touchend" || e.type == "touchcancel") {
        var absMove = Math.abs(ind * slideWidth - xDiff);
        if (absMove > slideWidth / 5) {
            if (xDiff > ind * slideWidth && ind < 2) {
                ind++;
            } else if (xDiff < ind * slideWidth && ind > 0) {
                ind--;
            }
        }
        document.querySelector("#" + arr[ind] + "").setAttribute("class", "dotcolor");
        document.querySelector(".animate").style.cssText = "transform:translate3d(-" + ind * slideWidth + "px,0,0)";
    }
}
//buy count
var count = 1;
document.querySelector(".img-minus").onclick = function(){
  if (count == 1) {
      document.querySelector(".count").innerHTML= count;
  } else {
      count--;
      document.querySelector(".count").innerHTML= count;
  }
}

document.querySelector(".img-plus").onclick = function(){
        count++;
        document.querySelector(".count").innerHTML= count;
}

var rules = document.querySelectorAll(".rule-query");
for (var index = 0 ;index < rules.length; index++) {
    rules[index].onclick = function () {
        if (this.parentNode.querySelector(".arrow").classList.contains("arrow-down")) {
            this.parentNode.querySelector(".arrow").classList.remove("arrow-down");
            this.parentNode.querySelector(".arrow").classList.add("arrow-up");
            this.parentNode.querySelector(".rule-detail").style.height = "12rem";
            this.parentNode.querySelector(".rule-detail").classList.add("rule-detail-border");
        } else {
            this.parentNode.querySelector(".arrow").classList.remove("arrow-up");
            this.parentNode.querySelector(".arrow").classList.add("arrow-down");
            this.parentNode.querySelector(".rule-detail").style.height = "0rem";
            this.parentNode.querySelector(".rule-detail").classList.remove("rule-detail-border");
        }
    }
}
