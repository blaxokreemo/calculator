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
let opSwitch = false;

function operate(x, oper, y) {
    x = parseInt(x);
    y = parseInt(y);
    switch (oper) {
        case "+":
            return roundDisplay(add(x, y));
            break;
        case "-":
            return roundDisplay(substract(x, y));
            break;
        case "*":
            return roundDisplay(multiply(x, y));
            break;
        case "/":
            if (y === 0) {
                return "You...can't";
            } else {
                return roundDisplay(divide(x, y));
            }
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
    opSwitch = false;
    if (displayVal === "0") {
        displayVal = `${int}`;
        displayContent.textContent = displayVal;
    } else if (displayVal.length > 13) {
        return;
    }  else {
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
        opSwitch = true;
    } else {
        leftNum = operate(leftNum, operator, displayVal);
        displayVal = leftNum;
        displayContent.textContent = displayVal;
        displayVal = "0";
        operator = e.target.getAttribute("data-oper");
        opSwitch = true;
    }   
}

let equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    if (operator != "" && opSwitch === false) {
        rightNum = displayVal;
        displayVal = operate(leftNum, operator, rightNum);
        displayContent.textContent = displayVal;
    } else {
        return;
    }
})

function roundDisplay(str) {
    let sureStr = str.toString();
    if (sureStr.length >= 14) {
        let int = sureStr.substring(0, sureStr.indexOf('.'));
        if (int.length === 13) {
            return int;
        } else {
            let float = sureStr.substring(sureStr.indexOf('.'));
            let trim = 14 - int.length;
            let trimmedFloat = float.substring(0, trim);
            return int.concat(trimmedFloat);
        }
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
