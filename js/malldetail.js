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
var index = 0;
var xDiff = null;
var arr = new Array("dot-pic1", "dot-pic2", "dot-pic3");
var len = document.querySelector("html").offsetWidth / 20;
function touchHandler(e) {
    if (e.type == "touchstart") {
        xDown = e.touches[0].clientX;
        document.querySelector(".animate").removeAttribute("animate");
        document.querySelector("#" + arr[index] + "").setAttribute("class", "docselectcolor");
        //document.querySelector("#"+arr[index]+"").classList.remove("dotcolor");
    } else if (e.type == "touchmove") {
        var xUp = e.touches[0].clientX;
        xDiff = index * slideWidth + xDown - xUp;
        if (xDiff < 800) {
            document.querySelector(".wrap").style.cssText = "transform:translate3d(-" + xDiff + "px,0,0)";
        }
    } else if (e.type == "touchend" || e.type == "touchcancel") {
        var absMove = Math.abs(index * slideWidth - xDiff);
        if (absMove > slideWidth / 5) {
            if (xDiff > index * slideWidth && index < 2) {
                index++;
            } else if (xDiff < index * slideWidth && index > 0) {
                index--;
            }
        }
        document.querySelector("#" + arr[index] + "").setAttribute("class", "dotcolor");
        document.querySelector(".animate").style.cssText = "transform:translate3d(-" + index * slideWidth + "px,0,0)";
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

var rules = document.querySelectorAll(".rule");
for (var index = 0 ;index < rules.length; index++) {
    rules[index].onclick = function () {
        if (this.querySelector(".arrow").classList.contains("arrow-down")) {
            this.querySelector(".arrow").classList.remove("arrow-down");
            this.querySelector(".arrow").classList.add("arrow-up");
            this.querySelector(".rule-detail").style.height = "10rem";
            this.querySelector(".rule-detail").classList.add("rule-detail-border");
        } else {
            this.querySelector(".arrow").classList.remove("arrow-up");
            this.querySelector(".arrow").classList.add("arrow-down");
            this.querySelector(".rule-detail").style.height = "0rem";
            this.querySelector(".rule-detail").classList.remove("rule-detail-border");
        }


    }
}
