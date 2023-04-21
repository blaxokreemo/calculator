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

let leftNum = "";
let rightNum = "";
let operator = "";

function operate(x, oper, y) {
    x = parseInt(x);
    y = parseInt(y);
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
    leftNum = "";
    rightNum = "";
    operator = "";
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

let opers = document.querySelectorAll('.oper');
opers.forEach(btn => {
    btn.addEventListener('click', beginOp)
});

function beginOp(e) {
    if (leftNum === "") {
        operator = e.target.getAttribute("data-oper");
        leftNum = displayVal;
        displayVal = "0";
    } else {
        leftNum = operate(leftNum, operator, displayVal);
        displayVal = leftNum;
        displayContent.textContent = displayVal;
        displayVal = "0";
        operator = e.target.getAttribute("data-oper");
    }   
}

let equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    rightNum = displayVal;
    displayVal = operate(leftNum, operator, rightNum);
    displayContent.textContent = displayVal;
})

function roundDisplay(str) {
    let sureStr = str.toString();
    if (sureStr.length > 14) {
        let int = sureStr.substring(0, sureStr.indexOf('.'));
        let float = sureStr.substring(sureStr.indexOf('.'));
        let trim = 14 - int.length;
        let trimmedFloat = float.substring(0, trim);
        return int.concat(trimmedFloat);
    } else {
        return sureStr;
    }
}

// Operations
// What do I need to do?
// 
// Once class "oper" is pressed, displayVal is stored in leftNum
// The kind of operator that was pressed is also stored in operator (pulled from data-oper)
// 
// How do we make the NEXT digit press clear the display and start a new displayVal?
// ANSWER: Just clear displayVal, don't update display! Does it work?
//
// Then, the next digit press will start a new displayVal and update display
//
// Next, when "=" is pressed, store displayVal in another variable
// And call operate function

// Making chained operations work
// What do I need to do?

// 
