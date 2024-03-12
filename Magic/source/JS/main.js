const rb_1 = document.getElementById('1');
const rb_2 = document.getElementById('2');
const btn =  document.getElementById('btn');
const label = document.getElementById('l')

btn.onclick = function (){
    if (rb_1.checked){
        label.textContent = "Нахуй тебе дорога!";
    }

    if(rb_2.checked){
        label.textContent = "В пизду тебе!";
    }
}