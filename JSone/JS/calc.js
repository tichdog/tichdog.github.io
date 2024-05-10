console.log("Check js");
const outputText = document.getElementById('display');
let operation = '';

let num_1 = 0;
let num_2 = 0;
let result;
let flagZero = false;
// max 6 sim на переменную
function addToDisplay(value){
    if(outputText.textContent.length < 6 && flagZero === false){
        outputText.textContent += value;
    }
}

function addToOperation(value){
    if(flagZero === false){
        operation = value;
        num_1 = +(outputText.textContent);
        outputText.textContent = '';
    }
}

function ClearDisplay(){
    outputText.textContent = '';
    operation = '';
    num_1 = num_2 = result = 0;
    flagZero = false;
}

function Result(){
    if(flagZero)
        return;

    num_2 = +(outputText.textContent);

    if(operation === '+'){
        result = num_1 + num_2;
        if(result <= 999999999999){
            outputText.textContent = num_1 + num_2;
            num_1 = num_1 + num_2;
            num_2 = 0;
        }
        else {
            outputText.textContent = 'Error len max!';
            flagZero = true;
        }
    }

    if(operation === '-'){
        result = num_1 - num_2;
        if(result <= 999999999999){
            outputText.textContent = num_1 - num_2;
            num_1 = num_1 - num_2;
            num_2 = 0;
        }
        else {
            outputText.textContent = 'Error len max!';
            flagZero = true;
        }

    }

    if(operation === '*'){
        result = num_1 * num_2;
        if(result <= 999999999999){
            outputText.textContent = num_1 * num_2;
            num_1 = num_1 * num_2;
            num_2 = 0;
        }
        else {
            outputText.textContent = 'Error len max!';
            flagZero = true;
        }
    }

    if(operation === '/'){
        if(num_2 !== 0){
            result = num_1 / num_2;
            if(result <= 999999999999){
                outputText.textContent = num_1 / num_2;
                num_1 = num_1 / num_2;
                num_2 = 0;
            }
            else {
                outputText.textContent = 'Error len max!';
                flagZero = true;
            }
        }
        else {
            flagZero = true;
            outputText.textContent = 'Error zero!';
        }
    }
}