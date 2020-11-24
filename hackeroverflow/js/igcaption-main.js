inputHandler = function(event) {

    hashTagCountInGivenText(document.getElementById('editor').value);

    if(event.inputType==="insertText" || event.inputType==="insertCompositionText") {

        if(event.target.value.length<input.length){
            insta();
        }
        else if(event.target.value.length===input.length+1){
            if (event.data===" "){
                insta();
            }
            else{
                inp(event.data,true,1);
            }
        }
        else if (event.target.value.length>input.length){

            inp(event.data,false,event.data.length);

        }

        input=event.target.value;
        inputMax(input);

    }
    else if(event.inputType==="deleteContentBackward" || event.inputType==="insertLineBreak"){
        input=event.target.value;
        inputMax(input);
        insta();
    }
    else {
        input=event.target.value;
        inputMax(input);
    }


    document.getElementById('lineCount').innerHTML=countLineNumberInTextArea(document.getElementById('editor'));
    document.getElementById('charCount').innerHTML=countCharactersInTextArea(document.getElementById('editor'));
    document.getElementById('hashTagsCount').innerHTML=hashTagCountInGivenText(document.getElementById('editor').value);

}


function inputMax(input1){

if(input1.length>2200){
    Toast({
        header: true,
        headerMessage: "Warning!",
        message: "Exceeds the IG Chararacter limit. Write the Caption within 2200 character length",
        mainStyle: "background: #FFBD00;border-bottom: 8px solid #FFDE81;",
        grid: "display: grid;grid-template-columns: 50px 180px 50px;grid-column-gap: 10px;",
        animation: true,
        close: true
    });
    replaceSelectedText(document.getElementById('editor'), "","deleteText",2);
    input=document.getElementById('editor').value;
}

}



function inp(inputData,oneChar,length) {
    var ch;
    var charStr;

    if(document.getElementById("fontChosen").getAttribute("data-font")==="NORMAL"){
        //
        //boooooom........

    }
    else{

        if(oneChar){
            if(inputData.length===1){
                charStr=inputData;
            }
            else{
                charStr=inputData.charAt(inputData.length-1);
            }
        }
        else{
            charStr=inputData;
        }

        var fontName = document.getElementById("fontChosen").getAttribute("data-font");
        ch = changeFontStyleForGivenText(charStr, fontName);
        if(oneChar){
            replaceSelectedText(document.getElementById('editor'), ch,"insertAtCaret",length);
        }
        else{
            replaceSelectedText(document.getElementById('editor'), ch,"swipedText",length);
        }

    }

    insta();
}

function insta(){
    if(xhttp){
        xhttp.abort();
        xhttp=null;
    }
    document.getElementById("tag-name").innerHTML="";
    document.getElementById("tag-name").style.display="none";

    document.getElementById("hash-name").innerHTML="";
    document.getElementById("hash-name").style.display="none";

    var tagName=AlertPrevWord();
    if(tagName[0]==="@" || tagName[0]==="#"){
        var tagNameRegex = /^@[^@#]+$/g;
        var hashTagRegex = /^#[^@#]+$/g;

        if(document.getElementById("fontChosen").getAttribute("data-font")!=="NORMAL" && (tagName.length===1 || tagName.length===2 || tagName.length===3)){

            if(document.getElementById("fontChosen").getAttribute("data-info-normal")!=="false"){

                var mainappend=document.createElement("div");
                mainappend.setAttribute("style", "margin-top: 10px;");

                var append=document.createElement("div");
                append.setAttribute("style", "display: inline-flex;margin-left: 58px;margin-top: 5px;");

                var okbutton = document.createElement("button");
                okbutton.setAttribute("class", "button");
                okbutton.setAttribute("onclick", "changeToNormal()");
                okbutton.setAttribute("style", "background-color: white;color: #f44336;");
                var okbuttonText = document.createTextNode("Change");
                okbutton.appendChild(okbuttonText);

                var okbutton1 = document.createElement("button");
                okbutton1.setAttribute("style", "background-color: white;color: #f44336;margin-left:5px");
                okbutton1.setAttribute("onclick", "Close(document.getElementById('toast-checkbox').checked)");
                okbutton1.setAttribute("class", "button");
                var okbuttonText1 = document.createTextNode("Close");
                okbutton1.appendChild(okbuttonText1);

                var checkboxlbl = document.createElement("div");
                checkboxlbl.setAttribute("class", "container");
                checkboxlbl.setAttribute("style", "margin-left: 58px;");

                var checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.setAttribute("style", "margin:0;");
                checkbox.setAttribute("id", "toast-checkbox");

                var span = document.createElement("div");
                span.setAttribute("style", "margin-left: 5px;");
                var spantxt = document.createTextNode("Don't show again");
                span.appendChild(spantxt);


                checkboxlbl.appendChild(checkbox);
                checkboxlbl.appendChild(span);

                append.appendChild(okbutton);
                append.appendChild(okbutton1);

                mainappend.appendChild(checkboxlbl);
                mainappend.appendChild(append);


                Toast({header:true,headerMessage:"Info!",message:"Only NORMAL font searches the insta! Change TO 'Normal' Font",mainStyle:"background: #0088D7;border-bottom: 8px solid #81C4EB;margin-top:"+(($(window).height()-137)/2)+"px;",grid:"display: grid;grid-template-columns: 50px 240px;grid-column-gap: 10px;",animation:true,close:false,append:mainappend});
                document.getElementById('editor').blur();

            }

        }


        if(tagName.length>2 && !hashTagWarning && (tagName.match(tagNameRegex)!==null || tagName.match(hashTagRegex)!==null) && document.getElementById("fontChosen").getAttribute("data-font")==="NORMAL"){

            if(tagName.charAt(0)==="@") {
                document.getElementById('tag-name').style.marginTop = (getCaretCoordinates(document.getElementById('editor'), document.getElementById('editor').selectionEnd).top + 185 - document.getElementById('editor').scrollTop) + "px";
                instaAjaxCall(tagName);
            }
            else{
                document.getElementById('hash-name').style.marginTop = (getCaretCoordinates(document.getElementById('editor'), document.getElementById('editor').selectionEnd).top + 185 - document.getElementById('editor').scrollTop) + "px";
                hashAjaxCall(tagName);
            }
        }
    }
}

function hashAjaxCall(tagName){

    var textParam=tagName.slice(1,tagName.length).trim().toLowerCase();

    document.getElementById("hash-name").style.display="";
    document.getElementById("hash-name").innerHTML="<center><img src='/hackeroverflow/images/loading.svg' style='height: 100px;width: 100px;margin-top: 100px;'></center>";

    var url="https://www.instagram.com/web/search/topsearch/?context=hashtag&query="+encodeURI(textParam)+"&rank_token=0.7700473304112787&include_reel=true";
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {

            var hashnameDiv=document.getElementById("hash-name");
            var jsonObject=JSON.parse(this.responseText);
            var usersArray=jsonObject.hashtags;
            document.getElementById("hash-name").innerHTML="";

            for(var p=0;p<usersArray.length;p++){

                var positionObject=usersArray[p];

                if(positionObject.hasOwnProperty('hashtag')) {
                    var hashNameObject = positionObject.hashtag;
                    var div = document.createElement("div");1
                    div.setAttribute("style", "margin-left: 30px;margin-top: 6px;font-family: Montserrat;font-size: 14px;font-weight: 600;");
                    var hashnameText = document.createTextNode(hashNameObject.name);
                    div.appendChild(hashnameText);

                    var mediaCounts = document.createElement("div");
                    mediaCounts.setAttribute("style", "margin-left: 30px;margin-top: 3px;font-family: Montserrat;font-size: 14px;margin-bottom: 6px;font-weight: 400;opacity: 0.6;");
                    var noOfPosts = document.createTextNode(hashNameObject.search_result_subtitle);
                    mediaCounts.appendChild(noOfPosts);

                    var rowMainDiv = document.createElement("div");
                    rowMainDiv.setAttribute("data-hashname",hashNameObject.name);
                    rowMainDiv.classList.add("hash-width");
                    rowMainDiv.setAttribute("onclick","replaceTagname(document.getElementById('editor'),this.getAttribute('data-hashname'),'#')");
                    rowMainDiv.setAttribute("style", "border-bottom: #D6D6D6 1px solid;");
                    rowMainDiv.appendChild(div);
                    rowMainDiv.appendChild(mediaCounts);

                    hashnameDiv.appendChild(rowMainDiv);
                }
                document.getElementById("editor").focus();

            }

        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

}

function instaAjaxCall(tagName){

    var textParam=tagName.slice(1,tagName.length).trim().toLowerCase();

    document.getElementById("tag-name").style.display="";
    document.getElementById("tag-name").innerHTML="<center><img src='/hackeroverflow/images/loading.svg' style='height: 100px;width: 100px;margin-top: 100px;'></center>";

    var url="https://www.instagram.com/web/search/topsearch/?context=user&query="+encodeURI(textParam)+"&rank_token=0.7700473304112787&include_reel=true";
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {

            var tagnameDiv=document.getElementById("tag-name");
            var jsonObject=JSON.parse(this.responseText);
            var usersArray=jsonObject.users;
            document.getElementById("tag-name").innerHTML="";

            for(var p=0;p<usersArray.length;p++){

                var positionObject=usersArray[p];

                if(positionObject.hasOwnProperty('user')) {
                    var userObject = positionObject.user;
                    var span = document.createElement("span");
                    var usernameText = document.createTextNode(userObject.username);
                    span.appendChild(usernameText);

                    var usernameDiv = document.createElement("div");
                    usernameDiv.setAttribute("style", "margin-top: 6px;font-family: Montserrat-Bold;font-size: 14px;");

                    if (userObject.is_verified) {

                        var verifiedImage = document.createElement("img");
                        verifiedImage.setAttribute("src", "/hackeroverflow/images/verified.png");
                        verifiedImage.setAttribute("style", "height: 10px;width: 10px;margin-left: 5px;");
                        usernameDiv.appendChild(span);
                        usernameDiv.appendChild(verifiedImage);

                    } else {

                        usernameDiv.appendChild(span);

                    }

                    var fullnameDiv = document.createElement("div");
                    fullnameDiv.setAttribute("style", "color: #7E7E7E;font-family: Montserrat;font-weight: 400;font-size: 14px;margin-top: 2px;margin-bottom: 6px;");
                    var fullnameText = document.createTextNode(userObject.full_name);
                    fullnameDiv.appendChild(fullnameText);

                    var rightElement = document.createElement("div");
                    rightElement.appendChild(usernameDiv);
                    rightElement.appendChild(fullnameDiv);

                    var profileImage = document.createElement("img");
                    profileImage.setAttribute("src", decodeURIComponent(userObject.profile_pic_url));
                    profileImage.setAttribute("style", "height: 30px;width: 30px;border-radius: 20px;float: right;margin-top: 10px;");

                    var leftElement = document.createElement("div");
                    leftElement.appendChild(profileImage);

                    var rowMainDiv = document.createElement("div");
                    rowMainDiv.setAttribute("data-username",userObject.username);
                    rowMainDiv.classList.add("tag-width");
                    rowMainDiv.setAttribute("onclick","replaceTagname(document.getElementById('editor'),this.getAttribute('data-username'),'@')");
                    rowMainDiv.setAttribute("style", "display: grid;\n" +
                        "grid-template-columns: 50px minmax(200px,max-content);grid-column-gap: 13px;border-bottom: #D6D6D6 1px solid;");
                    rowMainDiv.appendChild(leftElement);
                    rowMainDiv.appendChild(rightElement);

                    tagnameDiv.appendChild(rowMainDiv);
                }
                document.getElementById("editor").focus();

            }

        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

}


function replaceTagname(el,div,prefix) {

    var sel = getInputSelection(el), val = el.value;
    var newText = prefix+div;
    var tagNamelength=AlertPrevWord();
    sel.start=sel.start-tagNamelength.length;
    el.value = val.slice(0, sel.start) + newText + val.slice(sel.end);
    el.focus();
    el.selectionStart=sel.start;
    el.selectionEnd=sel.start+newText.length;
    document.getElementById('charCount').innerHTML=countCharactersInTextArea(document.getElementById('editor'));
    document.getElementById('hashTagsCount').innerHTML=hashTagCountInGivenText(document.getElementById('editor').value);
    document.getElementById('tag-name').style.display='none';
    document.getElementById('hash-name').style.display='none';
    return true;

}


function Close(bool) {

    if(bool){
        document.getElementById('fontChosen').setAttribute("data-info-normal","false");
    }
    $('#unique-toast').fadeOut(500);

}

function changeToNormal() {

    document.getElementById('fontChosen').setAttribute("data-font","NORMAL");
    document.getElementById('fontChosen').innerHTML="Normal";
    $('#unique-toast').fadeOut(500);

}

function copyToClipBoard(event){

    if(document.getElementById('editor').value.length>0) {
        document.getElementById('editor').select();
        document.execCommand("Copy");
        document.getElementById('editor').blur();
        Toast({
            header: true,
            headerMessage: "Success!",
            message: "Copied to Clipboard",
            mainStyle: "background: #41D888;border-bottom: 8px solid #A2ECC5;",
            grid: "display: grid;grid-template-columns: 50px 180px 50px;grid-column-gap: 10px;",
            animation: true,
            close: true,
            iconUrl:"/hackeroverflow/images/tick.png"
        });
    }
    else{
        Toast({
            header: true,
            headerMessage: "Warning!",
            message: "Nothing To Copy, Experience it!",
            mainStyle: "background: #FFBD00;border-bottom: 8px solid #FFDE81;",
            grid: "display: grid;grid-template-columns: 50px 180px 50px;grid-column-gap: 10px;",
            animation: true,
            close: true
        });
    }
}

function changeValue(e){
    $('#unique-toast').fadeOut(500);
    var el = document.getElementById("fontChosen");
    el.setAttribute("data-font",e.getAttribute("data-value"));
    el.innerHTML=e.getAttribute("data-font");
    var txtarea = document.getElementById("editor");
    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    var sel = txtarea.value.substring(start, finish);
    replaceSelectedText(document.getElementById("editor"),sel,"selectionReplace");
    document.getElementById('charCount').innerHTML=countCharactersInTextArea(document.getElementById('editor'));
    document.getElementById('hashTagsCount').innerHTML=hashTagCountInGivenText(document.getElementById('editor').value);

}

function hashTagCountInGivenText(text) {

    var hashTagRegex = /^#[a-z0-9]/g;
    var hashTags = 0;
    var textSpaceSplit=text.split(/[ |\n]/);

    for(var z=0;z<textSpaceSplit.length;z++) {
        if (textSpaceSplit[z].match(hashTagRegex)!==null) {
            hashTags += 1;

        }
    }

    if(hashTags>30){
        Toast({
            header: true,
            headerMessage: "Warning!",
            message: "More than 30 HashTags. Disabled Hashtag searches; Delete "+(hashTags-30)+" more hashtags to enable",
            mainStyle: "background: #FFBD00;border-bottom: 8px solid #FFDE81;",
            grid: "display: grid;grid-template-columns: 50px 180px 50px;grid-column-gap: 10px;",
            animation: true,
            close: true
        });
        hashTagWarning=true;
    }
    else{
        if(hashTagWarning){
            Toast({
                header: true,
                headerMessage: "Done!",
                message: "Now, there are insta valid 30 hashtags. Enabled hashtag insta search",
                mainStyle: "background: #41D888;border-bottom: 8px solid #A2ECC5;",
                grid: "display: grid;grid-template-columns: 50px 180px 50px;grid-column-gap: 10px;",
                animation: true,
                close: true,
                iconUrl:"/hackeroverflow/images/tick.png"
            });
            hashTagWarning=false;
        }
    }

    return hashTags;
}

function replaceSelectedText(el, text, todo,length) {

    var sel;
    var newText;

    if(todo==="selectionReplace") {
        sel = getInputSelection(el), val = el.value;
        newText = oldTextToNewOmitHashAndTagname(text);
        var scrollPos=el.scrollTop;
        if((val.slice(0, sel.start) + newText + val.slice(sel.end)).length<=2200) {
            el.value = val.slice(0, sel.start) + newText + val.slice(sel.end);
            el.selectionStart = sel.start;
            el.selectionEnd = sel.start + newText.length;
        }
        else{
            var chars=[...newText];
            var char1=[...newText];
            var text1=text;
            var textArray=[...text];
            var charsToRemove=chars.length;
            var unselectLength=0;

            while(chars.length!==0){
                if(newText.length+(el.value.length-text.length)>2200){
                    if(chars[chars.length-1].length===1){
                        newText=newText.substring(0,newText.length-1);
                        text=text.substring(0,text.length-1);
                        unselectLength+=1;
                        chars.pop();
                        textArray.pop();
                    }
                    else{
                        newText=newText.substring(0,newText.length-2);
                        if(textArray[textArray.length-1].length===2) {
                            text = text.substring(0, text.length - 2);
                            unselectLength += 2;
                        }
                        else{
                            text = text.substring(0, text.length - 1);
                            unselectLength += 1;
                        }
                        chars.pop();
                        textArray.pop();
                    }
                }
                else{
                    break;
                }
            }

            el.selectionStart = sel.start;
            el.selectionEnd = sel.start + text1.length;

            var mainappend=document.createElement("div");
            mainappend.setAttribute("id", "charInfo");
            mainappend.setAttribute("data-charStart", sel.start);
            mainappend.setAttribute("data-charEnd", sel.end);
            mainappend.setAttribute("data-unselect", unselectLength);
            mainappend.setAttribute("style", "margin-top: 8px;");

            var append=document.createElement("div");
            append.setAttribute("style", "display: inline-flex;margin-left: 58px;margin-top: 5px;");

            var okbutton = document.createElement("button");
            okbutton.setAttribute("class", "button");
            okbutton.setAttribute("onclick", "Unselect()");
            okbutton.setAttribute("style", "background-color: white;color: #f44336;");
            var okbuttonText = document.createTextNode("Unselect");
            okbutton.appendChild(okbuttonText);

            var okbutton1 = document.createElement("button");
            okbutton1.setAttribute("style", "background-color: white;color: #f44336;margin-left:5px");
            okbutton1.setAttribute("onclick", "charClose()");
            okbutton1.setAttribute("class", "button");
            var okbuttonText1 = document.createTextNode("Close");
            okbutton1.appendChild(okbuttonText1);


            append.appendChild(okbutton);
            append.appendChild(okbutton1);

            mainappend.appendChild(append);

            Toast({
                header: true,
                headerMessage: "Warning!",
                message: "Your Selected Text exceeds IG character limit 2200, Please unselect last "+(char1.length-chars.length)+" characters to be replaced",
                mainStyle: "background: #FFBD00;border-bottom: 8px solid #FFDE81;",
                grid: "display: grid;grid-template-columns: 50px 240px;grid-column-gap: 10px;",
                animation: true,
                close: false,
                append:mainappend
            });
        }
        el.focus();
        el.scrollTop = scrollPos;
    }
    else if(todo==="insertAtCaret"){

        insertAtCaret("editor",text)

    }
    else if(todo==="swipedText"){

        sel = getInputSelection(el), val = el.value;
        newText = oldTextToNewOmitHashAndTagname(text);
        var scrollPos=el.scrollTop;
        el.value = val.slice(0, sel.start-length) + newText + val.slice(sel.end);
        el.focus();
        el.scrollTop = scrollPos;
    }
    else if(todo==="deleteText"){

        sel = getInputSelection(el), val = el.value;
        el.value = val.slice(0, sel.start-length)  + val.slice(sel.end);
        el.selectionStart=sel.start-length;
        el.selectionEnd =sel.start-length;
        el.focus();
    }


    return true;
}

function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() === el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}

function oldTextToNewOmitHashAndTagname(text) {

    var spaceSplitArray=text.split("\n");
    var newTextArrayToJoin=[];
    var tagNameRegex = /^@[^@#]+$/g;

    for(var t=0;t<spaceSplitArray.length;t++){
        var spaceseparate=spaceSplitArray[t].split(" ");
        var spaceArrayToJoin=[];
        var spaceJoinString="";

        for(var s=0;s<spaceseparate.length;s++){
            if(spaceseparate[s]===""){
                spaceArrayToJoin.push("");
            }
            else if(spaceseparate[s].match(tagNameRegex)){
                spaceArrayToJoin.push(spaceseparate[s]);
            }
            else{
                spaceArrayToJoin.push(changeFontStyleForGivenText(spaceseparate[s],document.getElementById("fontChosen").getAttribute("data-font")));
            }
        }
        spaceJoinString=spaceArrayToJoin.join(" ");
        newTextArrayToJoin.push(spaceJoinString);
    }

    return newTextArrayToJoin.join("\n");
}

function changeFontStyleForGivenText(oldText,toFontName) {

    var newtext="";
    var oldTextArray=[...oldText];
    for (x=0;x<oldTextArray.length;x++) {

        var char = oldTextArray[x];
        var regexCheckArray = fonts["REGEXCHECK"];
        var fontStyleOject = fonts[toFontName];
        var bool = false;
        var indexNumber = 0;
        var identity;
        var normalChar;
        var newchar;
        var caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";   //10 types of fonts contains caps.
        var small = "abcdefghijklmnopqrstuvwxyz";  //10 types of fonts contains small.
        var number = "0123456789";    // 7 types of fonts contains numbers.

        for (var i = 0; i < regexCheckArray.length; i++) {
            if (bool === false) {
                if ([...regexCheckArray[i]["LIST"]].indexOf(char) !== -1) {
                    indexNumber = [...regexCheckArray[i]["LIST"]].indexOf(char);
                    identity = regexCheckArray[i]["NAME"];

                    if (identity === "number") {
                        normalChar = number[indexNumber%10];
                    } else if (identity === "small") {
                        normalChar = small[indexNumber%26];
                    } else if (identity === "caps") {
                        normalChar = caps[indexNumber%26];
                    }
                    bool=true;
                }
            }
        }

        if (bool === true) {
            if(fontStyleOject["STATUS"]["containsall"][2] === "s") {
                if (fontStyleOject["STATUS"]["containsall"][0] === "0") {
                    if (fontStyleOject["STATUS"]["notcontains"].includes(identity)) {
                        newchar=changeTheCodePointsFont("A","A","a","a","0","0",normalChar);
                    }
                    else {
                        newchar = changeTheCodePointsFont(fontStyleOject["CAPSFIRST"],"A",fontStyleOject["SMALLFIRST"],"a",fontStyleOject["NUMBERFIRST"],"0",normalChar);
                    }
                }
                else {
                    newchar = changeTheCodePointsFont(fontStyleOject["CAPSFIRST"],"A",fontStyleOject["SMALLFIRST"],"a",fontStyleOject["NUMBERFIRST"],"0",normalChar);
                }
            }
            else{
                if(fontStyleOject["STATUS"]["exceptionlist"].indexOf(normalChar)!==-1){
                    newchar=[...fontStyleOject["STATUS"]["changeto"]][fontStyleOject["STATUS"]["exceptionlist"].indexOf(normalChar)];
                }
                else {
                    if (fontStyleOject["STATUS"]["containsall"][0] === "0") {
                        if (fontStyleOject["STATUS"]["notcontains"].includes(identity)) {
                            newchar = changeTheCodePointsFont("A","A","a","a","0","0",normalChar);
                        }
                        else {
                            newchar = changeTheCodePointsFont(fontStyleOject["CAPSFIRST"],"A",fontStyleOject["SMALLFIRST"],"a",fontStyleOject["NUMBERFIRST"],"1",normalChar);
                        }
                    }
                    else {
                        newchar = newchar = changeTheCodePointsFont(fontStyleOject["CAPSFIRST"],"A",fontStyleOject["SMALLFIRST"],"a",fontStyleOject["NUMBERFIRST"],"1",normalChar);
                    }
                }
            }
        }
        else {
            newchar = char;
        }

        newtext += newchar;
    }

    return newtext;
}

function changeTheCodePointsFont(row1,col1,row2,col2,row3,col3,normalChar){

    var diff;
    var char;

    if (/[A-Z]/.test(normalChar)) {
        diff = row1.codePointAt(0) - col1.codePointAt(0);
    } else if (/[a-z]/.test(normalChar)) {
        diff = row2.codePointAt(0) - col2.codePointAt(0);
    } else if (/[0-9]/.test(normalChar)) {
        diff = row3.codePointAt(0) - col3.codePointAt(0);
    }
    char = String.fromCodePoint(normalChar.codePointAt(0) + diff);

    return char;

}

function ReturnWord(text, caretPos) {
    var index = text.indexOf(caretPos);
    var preText = text.substring(0, caretPos);
    if (preText.indexOf(" ") >= 0 || preText.indexOf("\n")>=0) {
        var words = preText.split(/[ |\n]/);
        return words[words.length - 1]; //return last word
    }
    else {
        return preText;
    }
}

function AlertPrevWord() {
    var text = document.getElementById("editor");
    var caretPos = GetCaretPosition(text)
    var word = ReturnWord(text.value, caretPos);
    if (word != null) {
        return word;
    }
    else{
        return "";
    }

}

function GetCaretPosition(ctrl) {
    var CaretPos = 0;   // IE Support
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart === '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}


function insertAtCaret(areaId, text) {
    var txtarea = document.getElementById(areaId);
    if (!txtarea) {
        return;
    }

    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart === '0') ?
        "ff" : (document.selection ? "ie" : false));
    if (br === "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
    } else if (br === "ff") {
        strPos = txtarea.selectionStart;
    }

    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front.substring(0,front.length-1) + text + back;
    strPos = strPos-1 + text.length;
    if (br === "ie") {
        txtarea.focus();
        var ieRange = document.selection.createRange();
        ieRange.moveStart('character', -txtarea.value.length);
        ieRange.moveStart('character', strPos);
        ieRange.moveEnd('character', 0);
        ieRange.select();
    } else if (br === "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }

    txtarea.scrollTop = scrollPos;
}


function resizeFunction() {
    document.getElementById('tag-name').style.marginTop=(getCaretCoordinates(document.getElementById('editor'), document.getElementById('editor').selectionEnd).top+185-document.getElementById('editor').scrollTop)+"px";
    document.getElementById('hash-name').style.marginTop=(getCaretCoordinates(document.getElementById('editor'), document.getElementById('editor').selectionEnd).top+185-document.getElementById('editor').scrollTop)+"px";

    var firstRow=50;
    var secondRow=$(window).height()-120-50-20-20-25;
    var thirdRow=120;
    document.getElementById("main").style.gridTemplateRows=firstRow+"px "+secondRow+"px "+thirdRow+"px";
    document.getElementById("editor").style.height=(secondRow-168)+"px";

    document.getElementById('width-img').style.width=$(window).width()+"px";

    if($(window).width()<415) {
        document.getElementById('main').style.width =$(window).width()-30+"px";

    }
    else{
        document.getElementById('main').style.width="375px";
    }

    if($(window).height()<400){
        document.getElementById('bgimg-wave').setAttribute("src","/hackeroverflow/images/rect-200.svg");
    }
    else if($(window).height()<600){
        document.getElementById('bgimg-wave').setAttribute("src","/hackeroverflow/images/rect-300.svg")
    }
    else if($(window).height()<750){
        document.getElementById('bgimg-wave').setAttribute("src","/hackeroverflow/images/rect-400.svg")
    }
    else{
        document.getElementById('bgimg-wave').setAttribute("src","/hackeroverflow/images/rect-500.svg")
    }

    document.getElementById('editor').scrollTo(0,getCaretCoordinates(document.getElementById('editor'), document.getElementById('editor').selectionEnd).top);
}


function readyFunction() {

    document.getElementById('tag-name').style.display='none';
    document.getElementById('hash-name').style.display='none';
    var firstRow = 50;
    var secondRow = $(window).height() - 120 - 50 - 20 - 20 - 25;
    var thirdRow = 120;
    document.getElementById("main").style.gridTemplateRows = firstRow + "px " + secondRow + "px " + thirdRow + "px";
    document.getElementById("editor").style.height=(secondRow-168)+"px";

    if ($(window).width() < 1000) {

        document.getElementById('mobile-view').innerHTML="<center>Made with ❤️ Contribute 🙏 thank U</center>"

    }


    if ($(window).width() < 405) {
        document.getElementById('main').style.width = ($(window).width() - 30) + "px";
        document.getElementById('tag-name').style.minWidth = ($(window).width() - 30-100) + "px";
        document.getElementById('tag-name').style.maxWidth = ($(window).width() - 30-80) + "px";

        document.getElementById('hash-name').style.minWidth = ($(window).width() - 30-100) + "px";
        document.getElementById('hash-name').style.maxWidth = ($(window).width() - 30-80) + "px";
    }

    if($(window).height()<400){
        document.getElementById('bgimg-wave').setAttribute("src","/hackeroverflow/images/rect-200.svg");
    }
    else if($(window).height()<600){
        document.getElementById('bgimg-wave').setAttribute("src","/hackeroverflow/images/rect-300.svg")
    }
    else if($(window).height()<750){
        document.getElementById('bgimg-wave').setAttribute("src","/hackeroverflow/images/rect-400.svg")
    }
    else{
        document.getElementById('bgimg-wave').setAttribute("src","/hackeroverflow/images/rect-500.svg")
    }
    document.getElementById('width-img').style.width=$(window).width()+"px";

}

function documentClickFunction(){

    if(event.target.getAttribute("class")==="droparrow" || $('.droparrow').has(event.target).length>0){
        $(".dropdown-content").slideToggle();
        document.getElementById('font').setAttribute("data-dropped","true");
        document.getElementById('editor').focus();
    }
    else{
        $(".dropdown-content").slideUp();
        if(document.getElementById('font').getAttribute("data-dropped")==="true") {
            document.getElementById('editor').focus();
            document.getElementById('font').setAttribute("data-dropped","false");
        }
    }

    if(event.target.getAttribute("class")==="tagname" || $('.tagname').has(event.target).length>0){
        return;
    }
    else {
        document.getElementById("tag-name").innerHTML="";
        document.getElementById("tag-name").style.display="none";
    }

    if(event.target.getAttribute("class")==="hashname" || $('.hashname').has(event.target).length>0){
        return;
    }
    else {
        document.getElementById("hash-name").innerHTML="";
        document.getElementById("hash-name").style.display="none";
    }

}

function Unselect(){
    $('#unique-toast').fadeOut(500);
    var editor=document.getElementById('editor');
    editor.selectionStart=parseInt(document.getElementById('charInfo').getAttribute("data-charStart"));
    editor.selectionEnd=parseInt(document.getElementById('charInfo').getAttribute("data-charEnd"))-parseInt(document.getElementById('charInfo').getAttribute("data-Unselect"));
    editor.focus();

    var mainappend=document.createElement("div");
    mainappend.setAttribute("style", "margin-top: 10px;");
    mainappend.setAttribute("id", "change-font");
    mainappend.setAttribute("data-cs", editor.selectionStart);
    mainappend.setAttribute("data-ce", editor.selectionEnd);

    var append=document.createElement("div");
    append.setAttribute("style", "display: inline-flex;margin-left: 58px;margin-top: 5px;");

    var okbutton = document.createElement("button");
    okbutton.setAttribute("class", "button");
    okbutton.setAttribute("onclick", "changeFont(document.getElementById('"+document.getElementById("fontChosen").getAttribute("data-font")+"'))");
    okbutton.setAttribute("style", "background-color: white;color: #f44336;");
    var okbuttonText = document.createTextNode("Change");
    okbutton.appendChild(okbuttonText);

    var okbutton1 = document.createElement("button");
    okbutton1.setAttribute("style", "background-color: white;color: #f44336;margin-left:5px");
    okbutton1.setAttribute("onclick", "closeFont()");
    okbutton1.setAttribute("class", "button");
    var okbuttonText1 = document.createTextNode("Close");
    okbutton1.appendChild(okbuttonText1);

    append.appendChild(okbutton);
    append.appendChild(okbutton1);
    mainappend.appendChild(append);

    Toast({
        header: true,
        headerMessage: "Done!",
        message: "Now you can change to the selected '"+document.getElementById(document.getElementById("fontChosen").getAttribute("data-font")).getAttribute("data-font")+" ' font",
        mainStyle: "background: #41D888;border-bottom: 8px solid #A2ECC5;",
        grid: "display: grid;grid-template-columns: 50px 180px 50px;grid-column-gap: 10px;",
        animation: true,
        close: false,
        iconUrl:"/hackeroverflow/images/tick.png",
        append: mainappend
    });

}

function charClose(){
    $('#unique-toast').fadeOut(500);
    var editor=document.getElementById('editor');
    editor.selectionStart=parseInt(document.getElementById('charInfo').getAttribute("data-charStart"));
    editor.selectionEnd=parseInt(document.getElementById('charInfo').getAttribute("data-charEnd"));
    editor.focus();
}

function changeFont(el){
    changeValue(el);
}

function closeFont(){
    $('#unique-toast').fadeOut(500);
    var editor=document.getElementById('editor');
    editor.selectionStart=parseInt(document.getElementById('change-font').getAttribute("data-cs"));
    editor.selectionEnd=parseInt(document.getElementById('change-font').getAttribute("data-ce"));
    editor.focus();
}

