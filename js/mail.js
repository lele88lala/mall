/**
 * Created by lele88lala on 16/4/17.
 */
window.onload=loadData("json/mail.json");




function loadData(data_file) {
    //var data_file = "json/mail.json";
    var http_request = new XMLHttpRequest();
    try{
        // Opera 8.0+, Firefox, Chrome, Safari
        http_request = new XMLHttpRequest();
    }catch (e){
        // Internet Explorer Browsers
        try{
            http_request = new ActiveXObject("Msxml2.XMLHTTP");

        }catch (e) {

            try{
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }

        }
    }
    http_request.onreadystatechange = function(){

        if (http_request.readyState == 4 && http_request.status == 200 ){
            // Javascript function JSON.parse to parse JSON data
            var jsonObj = JSON.parse(http_request.responseText);

            // jsonObj variable now contains the data structure and can
            // be accessed as jsonObj.name and jsonObj.country.
            //document.getElementById("Name").innerHTML = jsonObj.name;
            //document.getElementById("Country").innerHTML = jsonObj.country;
            for (var i = 0 ; i < jsonObj.goods.length;i++) {
                var g = jsonObj.goods[i];
                var arr = new Array(g.img, g.codeNum, g.package, g.priceTag, g.presentPrice, g.beforePriceTag, g.beforePrice);
                start(arr);
            }
            ret = 0;
        } else if (http_request.readyState ==4 && http_request.status == 404) {
            var noMoreData = document.querySelector('.noMoreData')
            if (noMoreData == null) {
                var bottomDiv = document.createElement("div");
                bottomDiv.innerHTML = "没有更多数据了";
                document.body.appendChild(bottomDiv);
                bottomDiv.setAttribute("class", "noMoreData");
            }
            ret = 1;
        }
    }

    http_request.open("GET", data_file, true);
    http_request.send();

}
function detail() {
    location.href = "malldetail.html";
}
function start(arr) {
    //model 1
    var div = document.createElement("div");
    div.setAttribute("class", "goods");
    document.body.appendChild(div);
    div.setAttribute("onclick", "detail();")

    //model 2
    var divImg = document.createElement("div");
    var img = document.createElement("img");
    img.setAttribute("class", "goods-picture");
    // add img
    img.setAttribute("src", arr[0]);
    divImg.appendChild(img);

    //model3
    var divList = document.createElement("div");
    divList.setAttribute("class", "package-list");
    var codeSpan = document.createElement("span");
    codeSpan.setAttribute("class", "package-code");
    //add value
    codeSpan.innerHTML = arr[1];
    var packageSpan = document.createElement("span");
    packageSpan.setAttribute("class", "package");
    //add value
    packageSpan.innerHTML = arr[2];
    divList.appendChild(codeSpan);
    divList.appendChild(packageSpan);

    //model4
    var divPrice = document.createElement("div");
    divPrice.setAttribute("class", "price");
    var divPresentPrice = document.createElement("div");
    divPresentPrice.setAttribute("class", "present-price");
    var spanPrice = document.createElement("span");
    //add value
    spanPrice.innerHTML = arr[3];
    var spanPre = document.createElement("span");
    spanPre.setAttribute("class", "pre");
    //add value
    spanPre.innerHTML = arr[4];
    divPresentPrice.appendChild(spanPrice);
    divPresentPrice.appendChild(spanPre);
    var divBeforePrice = document.createElement("div");
    divBeforePrice.setAttribute("class", "before-price strike-center");
    var lab = document.createElement("label");
    //add value
    lab.innerHTML = arr[5];
    var spanBefore = document.createElement("span");
    //add value
    spanBefore.innerHTML = arr[6];
    divBeforePrice.appendChild(lab);
    divBeforePrice.appendChild(spanBefore);
    divPrice.appendChild(divPresentPrice);
    divPrice.appendChild(divBeforePrice);

    div.appendChild(divImg);
    div.appendChild(divList);
    div.appendChild(divPrice);

}
var page = 0;
var ret = 0;
window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // you're at the bottom of the page
        page++;
        if (ret == 0) {
            loadData("json/mail"+page+".json");
        }
    }
};