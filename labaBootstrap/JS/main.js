let isDark = false;
function onClickBtn(id){
    document.getElementById(id).scrollIntoView();
}

function theme(){
    if(isDark){
        document.documentElement.style.setProperty('--bgc', '#d2daff');
        document.documentElement.style.setProperty('--gc', '#94a2d7');
        document.documentElement.style.setProperty('--addc', '#96b6fd');
        document.documentElement.style.setProperty('--btnc', '#5497e8');
        document.documentElement.style.setProperty('--fontc', '#000000');
        document.documentElement.style.setProperty('--footerc', '#d2daff');
        isDark = false;
    }
    else {
        document.documentElement.style.setProperty('--bgc', '#222831');
        document.documentElement.style.setProperty('--gc', '#374156');
        document.documentElement.style.setProperty('--addc', '#434a56');
        document.documentElement.style.setProperty('--btnc', '#76abae');
        document.documentElement.style.setProperty('--fontc', '#eeeeee');
        document.documentElement.style.setProperty('--footerc', '#000000');
        isDark = true;
    }
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}