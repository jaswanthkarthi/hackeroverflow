//emoji touch sensor--

function createParticle(x, y) {

  var json=["&#128525;","&#129315;","&#128558;","&#127881;","&#127880;","&#128525;"];
  var size = Math.random() * 50 + 10;

  x -= size / 2;
  y -= size / 2;

  var particle = document.createElement('div');
  particle.setAttribute("class","particle");
  particle.innerHTML=json[Math.floor(Math.random() * 5) + 1];
  document.getElementById("page-4").appendChild(particle);
  TweenMax.set(particle, {
    x: x,
    y: y,
    width: size,
    height: size,
});

  TweenMax.to(particle, Math.random() * 2 + 1, {
    x: x + (Math.random() - 0.5) * 200,
    y: y + (Math.random() - 0.5) * 200,
    opacity: 0,
    scale: 0,
    ease: Power2.easeOut,
    onComplete: function () {
      document.getElementById("page-4").removeChild(particle);
    } });

}

function animateEmoji(id,delay,animationName){
document.getElementById(id).style.animation="slide-in-elliptic-bottom-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"+", "+animationName;

document.getElementById(id).style.animationDelay=delay+"s, "+"3.2s";
}

function animateHiwText(id,delay,animationName){
document.getElementById(id).style.animation=animationName;

document.getElementById(id).style.animationDelay=delay+"s";
}

function animateEmojiText(id,className){
document.getElementById(id).classList.add(className);
}


function emptyAnimateEmoji(id){
	document.getElementById(id).style.animation="";
	document.getElementById(id).style.animationDelay="";
}

function scroll(){

var scrolled = window.scrollY;
var emoji_percent_scroll_animation=0;
var first_page_hght=window.innerHeight;
var otherpages=895;

if(scrolled<=first_page_hght){
emoji_percent_scroll_animation=scrolled/first_page_hght*100;
}
else{

emoji_percent_scroll_animation=(scrolled-first_page_hght)/otherpages*100;
emoji_percent_scroll_animation=emoji_percent_scroll_animation+100;

}
console.log(emoji_percent_scroll_animation);

// -----EMOTICONS SCROLL EFFECTS -----

var fourthpagescrolledboolean=document.getElementById("page-4").getAttribute("bool-scrolled");

if(fourthpagescrolledboolean=="false"){

if(emoji_percent_scroll_animation>78.5 && emoji_percent_scroll_animation<203){

animateEmoji("emoticons-img-love_sym",0,"floating 3s ease-in-out infinite");
animateEmoji("emoticons-img-angry_face",0.4,"floating 3s ease-in-out infinite");
animateEmoji("emoticons-img-Wow_face",0.8,"floating 3s ease-in-out infinite");
animateEmoji("emoticons-img-Sad_face",1.2,"floating 3s ease-in-out infinite");
animateEmoji("emoticons-img-Haha_face",1.6,"floating 3s ease-in-out infinite");
animateEmoji("emoticons-img-like",2.0,"floating 3s ease-in-out infinite");
animateEmojiText("emoji--text--con-anim","emojitext");
document.getElementById("page-4").setAttribute("bool-scrolled","true");

}
else if(emoji_percent_scroll_animation>78.5){
animateEmojiText("emoji--text--con-anim","emojitext");
document.getElementById("page-4").setAttribute("bool-scrolled","true");
document.getElementById("page-4").setAttribute("animation","true");
}
else{

emptyAnimateEmoji("emoticons-img-love_sym");
emptyAnimateEmoji("emoticons-img-angry_face");
emptyAnimateEmoji("emoticons-img-Wow_face");
emptyAnimateEmoji("emoticons-img-Sad_face");
emptyAnimateEmoji("emoticons-img-Haha_face");
emptyAnimateEmoji("emoticons-img-like");

}

}
else{

if(emoji_percent_scroll_animation<2 || emoji_percent_scroll_animation>201){

emptyAnimateEmoji("emoticons-img-love_sym");
emptyAnimateEmoji("emoticons-img-angry_face");
emptyAnimateEmoji("emoticons-img-Wow_face");
emptyAnimateEmoji("emoticons-img-Sad_face");
emptyAnimateEmoji("emoticons-img-Haha_face");
emptyAnimateEmoji("emoticons-img-like");
document.getElementById("page-4").setAttribute("animation","true");

}
else{
var animBool=document.getElementById("page-4").getAttribute("animation");
if(animBool=="true"){

animateEmoji("emoticons-img-love_sym",0,"floating 3s ease-in-out infinite");
animateEmoji("emoticons-img-angry_face",0.4,"floating 3s ease-in-out infinite");
animateEmoji("emoticons-img-Wow_face",0.8,"floating 3s ease-in-out infinite");
animateEmoji("emoticons-img-Sad_face",1.2,"floating 3s ease-in-out infinite");
animateEmoji("emoticons-img-Haha_face",1.6,"floating 3s ease-in-out infinite");
animateEmoji("emoticons-img-like",2.0,"floating 3s ease-in-out infinite");
document.getElementById("page-4").setAttribute("animation","false");

}
}

}


// HOW IT WORKS - ANIMATION

var hiwpagescrolledboolean=document.getElementById("page-6").getAttribute("bool-scrolled");

if(hiwpagescrolledboolean=="false"){

if(emoji_percent_scroll_animation>178.5 && emoji_percent_scroll_animation<303){

animateHiwText("howitworks-title-id",0.8,"tracking-in-expand-fwd-bottom 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both");
animateHiwText("howitworks-text1-id",2,"jello-horizontal 1s both");
animateHiwText("howitworks-text2-id",3.3,"jello-horizontal 1s both");
animateHiwText("howitworks-text3-id",4.6,"jello-horizontal 1s both");
document.getElementById("page-6").setAttribute("bool-scrolled","true");

}
else if(emoji_percent_scroll_animation>178.5){
document.getElementById("page-6").setAttribute("bool-scrolled","true");
document.getElementById("page-6").setAttribute("animation","true");
}
else{
emptyAnimateEmoji("howitworks-title-id");
emptyAnimateEmoji("howitworks-text1-id");
emptyAnimateEmoji("howitworks-text2-id");
emptyAnimateEmoji("howitworks-text3-id");
}
}
else{

if(emoji_percent_scroll_animation<102 || emoji_percent_scroll_animation>301){

emptyAnimateEmoji("howitworks-title-id");
emptyAnimateEmoji("howitworks-text1-id");
emptyAnimateEmoji("howitworks-text2-id");
emptyAnimateEmoji("howitworks-text3-id");
document.getElementById("page-6").setAttribute("animation","true");

}
else{
var animBool2=document.getElementById("page-6").getAttribute("animation");
if(animBool2=="true"){

animateHiwText("howitworks-title-id",0.8,"tracking-in-expand-fwd-bottom 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both");
animateHiwText("howitworks-text1-id",2,"jello-horizontal 1s both");
animateHiwText("howitworks-text2-id",3.3,"jello-horizontal 1s both");
animateHiwText("howitworks-text3-id",4.6,"jello-horizontal 1s both");
document.getElementById("page-6").setAttribute("animation","false");

}
}
}

}