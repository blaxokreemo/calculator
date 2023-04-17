function add(x, y) {
    return x + y;
}

function substract(x, y) {
    return x - y;
}

function multiply (x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

let leftNum = 0;
let rightNum = 0;
let operator = "";

function operate(x, oper, y) {
    switch (oper) {
        case "+":
            return add(x, y);
            break;
        case "-":
            return substract(x, y);
            break;
        case "*":
            return multiply(x, y);
            break;
        case "/":
            return divide(x, y);
            break;
        default:
            break;
    }
}

let displayVal = "0";
let display = document.querySelector('.display');
let displayContent = document.createElement('p');
displayContent.textContent = displayVal;
display.appendChild(displayContent);

function clearDisplay() {
    displayVal = "0";
    displayContent.textContent = displayVal;
}

function addToDisplay(e) {
    let int = e.target.getAttribute("data-int");
    if (displayVal === "0") {
        displayVal = `${int}`;
        displayContent.textContent = displayVal;
    } else {
        displayVal = displayVal + int;
        displayContent.textContent = displayVal;
    }
}

let digits = document.querySelectorAll('.digit');
digits.forEach(btn => {
    btn.addEventListener('click', addToDisplay);
});

let clear = document.querySelector('#clear');
clear.addEventListener('click', clearDisplay);