/*---Scroll menu---*/
let prevScrollPos = window.scrollY;
let currentScrollPos;
let navbar = document.getElementById("navbar");
/*-----------------*/

/*---Collapsible---*/
let coll = document.getElementsByClassName("collapsible");
/*-----------------*/

/*---Slideshow---*/
let slideIndex = 1;
/*---------------*/

/*-----------------*/
/*-----------------*/
/*-----------------*/

/*Scroll*/
window.onscroll = function (){
    currentScrollPos = window.scrollY;
    console.log(currentScrollPos);
    if(prevScrollPos > currentScrollPos){
        navbar.style.top = "0";
        console.log("> вниз");
    }
    else {
        navbar.style.top = "-70px";
        console.log("< вверх");
    }
    prevScrollPos = currentScrollPos;
}
/*------*/

/*Collapsible*/
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;

        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}
/*-----------*/

/*Slideshow*/
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
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
/*---------*/