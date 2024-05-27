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

/*---Validation---*/
const form = document.getElementById("register");

let UserName = document.getElementById('name');
let UserSurname = document.getElementById('surname');
let UserLogin = document.getElementById('login');
let UserPassword = document.getElementById('password');

let formInputs = document.querySelectorAll(".js-input");
let formEmail = document.querySelector(".js-input-email");
let formPhone = document.querySelector(".js-input-phone");
/*----------------*/

/*-----------------*/
/*-----------------*/
/*-----------------*/

/*Form*/
function validEmail(email){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function checkPassword(str)
{
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}
function validPhone(phone) {

    if(phone.length !== 17){
        return false;
    }
    else {
        return true;
    }
}
form.onsubmit = function (){
    let valueEmail = formEmail.value;
    let valuePhone = formPhone.value;

    let emptyInputs = Array.from(formInputs).filter(input => input.value === '');

    let flag = true;

    formInputs.forEach(function (input){
        if(input.value === ''){
            input.classList.add('form-error');
        }
        else {
            input.classList.remove('form-error');
        }
    })

    if(!(/^[a-z]+$/i.test(UserName.value) || /^[а-я]+$/i.test(UserName.value)) || UserName.value.length < 3 ){
        console.log("Name ERROR");
        UserName.classList.add('form-error');
        flag = false;
    }
    else {
        UserName.classList.remove('form-error');
    }

    if(!(/^[a-z]+$/i.test(UserSurname.value) || /^[а-я]+$/i.test(UserSurname.value)) || UserSurname.value.length < 3 ){
        console.log("Surname ERROR");
        UserSurname.classList.add('form-error');
        flag = false;
    }
    else {
        UserSurname.classList.remove('form-error');
    }

    if(UserLogin.value.length < 5 || UserLogin.value.length > 8){
        console.log("login ERROR");
        UserLogin.classList.add('form-error');
        flag = false;
    }
    else {
        UserLogin.classList.remove('form-error');
    }

    if(!checkPassword(UserPassword.value)){
        console.log("PASSWORD ERROR")
        UserPassword.classList.add('form-error');
        flag = false;
    }
    else {
        UserPassword.classList.remove('form-error');
    }

    if(emptyInputs.length !== 0){
        console.log("Inputs not field")
        flag = false;
    }

    if(!validEmail(valueEmail)){
        console.log("Email not valid");
        formEmail.classList.add('form-error');
        flag = false;
    }
    else {
        formEmail.classList.remove('form-error');
    }

    if(!validPhone(valuePhone)){
        console.log("Phone not valid");
        formPhone.classList.add('form-error');
        flag = false;
    }
    else {
        formPhone.classList.remove('form-error');
    }

    if(flag){
        alert("Валидация успешна!")
    }

}

window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = new_value;
            }
            if (event.type == "blur" && this.value.length < 5) {
                this.value = "";
            }
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);

    });

});
/*-----*/

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