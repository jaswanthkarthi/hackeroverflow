function Toast(toast){

    $('#unique-toast').remove();
    if(timer){
        clearTimeout(timer);
    }

    var imgurl="/hackeroverflow/images/info.png";

    if(toast.hasOwnProperty("iconUrl")){
        imgurl=toast.iconUrl;
    }

    var imgDiv = document.createElement("div");
    imgDiv.classList.add("toast-img");
    var img = document.createElement("img");
    img.setAttribute("src",imgurl)
    img.setAttribute("style","width:20px;height:20px;");
    imgDiv.appendChild(img);


    var div1=document.createElement("div");

    var headerDiv = document.createElement("div");
    headerDiv.classList.add("toast-header");
    var headerText = document.createTextNode(toast.headerMessage);
    headerDiv.appendChild(headerText);

    var bodyDiv = document.createElement("div");
    bodyDiv.classList.add("toast-body");
    var bodyText = document.createTextNode(toast.message);
    bodyDiv.appendChild(bodyText);

    div1.appendChild(headerDiv);
    div1.appendChild(bodyDiv);

    if(toast.close) {
        var closeDiv = document.createElement("div");
        closeDiv.setAttribute("style", "margin-top: -5px;margin-left: 15px;color: white;font-weight: 700;font-size: 20px;font-family: Montserrat,Roboto, Helvetica, sans-serif;cursor: pointer");
        closeDiv.setAttribute("onclick", "toastClose()")
        var closeText = document.createTextNode("x");
        closeDiv.appendChild(closeText);
    }

    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("style",toast.grid);
    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(div1);
    if(toast.close) {
        mainDiv.appendChild(closeDiv);
    }

    var main = document.createElement("div");
    main.setAttribute("id","unique-toast");
    main.classList.add("toast-position");
    main.setAttribute("style",toast.mainStyle);
    main.appendChild(mainDiv);

    if(toast.hasOwnProperty("append")) {
        main.appendChild(toast.append);
    }

    document.getElementById('toast').appendChild(main);

    if(toast.animation){

        $('#unique-toast').hide().fadeIn(350);
    }

    if(!toast.hasOwnProperty("append")) {
        timer = setTimeout(function () {

            $('#unique-toast').fadeOut(500);

        }, 2000);
    }

}

function toastClose(){
    $('#unique-toast').fadeOut(500);
}


function countCharactersInTextArea(element) {

    return element.value.length;

}

function countLineNumberInTextArea(element) {

    var noOfLines=element.value.split(/\r*\n/);

    return noOfLines.length;

}

function GET(url) {
    return new Promise(function(resolve, reject) {

        const request = new XMLHttpRequest();

        request.open('GET', url);
        request.onload = () => {

            resolve(request.response); // we got data here, so resolve the Promise

        };

        request.onerror = () => {
            reject(Error('Error fetching data.')); // error occurred, reject the  Promise
        };

        request.send(); // send the request
    });
};