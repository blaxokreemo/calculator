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
let lastResult = "";

function operate(x, oper, y) {
    x = parseFloat(x);
    y = parseFloat(y);
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

function addToDisplay(digit) {
    lastResult = "";
    opSwitch = false;
    if (displayVal === "0") {
        if (digit === ".") {
            displayVal = `0.`
        } else {
            displayVal = `${digit}`;
            displayContent.textContent = displayVal;
        }
    } else if (displayVal.length > 10) {
        return;
    } else if (displayVal.includes(".") && digit === ".") {
        return;
    } else {
        displayVal = displayVal + digit;
        displayContent.textContent = displayVal;
    }
}

let digits = document.querySelectorAll('.digit');
digits.forEach(btn => {
    btn.addEventListener('click', (e) => {
        addToDisplay(e.target.getAttribute('data-int'));
    });
});

let clear = document.querySelector('#clear');
clear.addEventListener('click', clearDisplay);

let opers = document.querySelectorAll('.oper');
opers.forEach(btn => {
    btn.addEventListener('click', (e) => {beginOp(e.target.getAttribute("data-oper"));});
});

function beginOp(oper) {

    if (lastResult != "") {
        operator = oper;
        leftNum = lastResult;
        opSwitch = true;
        lastResult = "";
        displayVal = "0";
    } else if (opSwitch === true) {
        operator = oper;
    }  else if (leftNum === "") {
        operator = oper;
        leftNum = displayVal;
        displayVal = "0";
        opSwitch = true;
    } else {
        leftNum = operate(leftNum, operator, displayVal);
        displayVal = leftNum;
        displayContent.textContent = displayVal;
        displayVal = "0";
        operator = oper;
        opSwitch = true;
    }   
}

function equals() {
    if (operator != "" && opSwitch === false) {
        rightNum = displayVal;
        displayVal = operate(leftNum, operator, rightNum);
        displayContent.textContent = displayVal;
        lastResult = displayVal;
        displayVal = "0";
        operator = "";
        leftNum = "";
        rightNum = "";
    } else {
        return;
    }
}

let equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', equals);

function del() {
    if (displayVal.length === 1) {
        displayVal = "0";
        displayContent.textContent = displayVal;
    } else {
        displayVal = displayVal.slice(0,-1);
        displayContent.textContent = displayVal;
    }
}

let delBtn = document.querySelector('#del');
delBtn.addEventListener('click', del)

const oneToNine = new RegExp('[1-9]');
const operList = new RegExp('[\\+-/\\.=\\*]')

function roundDisplay(str) {
    let sureStr = str.toString();
    let float = sureStr.includes('.') ? sureStr.substring(sureStr.indexOf('.')) : "";
    let int = sureStr.includes('.') ? sureStr.substring(0, sureStr.indexOf('.')) : sureStr;
    let rounded = "";
    if (sureStr.includes('e') === true){
        let ePos = sureStr.indexOf('e');
        let tail = sureStr.substring(ePos);
        rounded = `${sureStr.substring(0, 11-tail.length)}${tail}`;
        if (oneToNine.test(rounded.substring(2, 11-tail.length)) === false) {
            rounded = `${sureStr[0]}${tail}`
            return rounded;
        } else {
            return rounded;
        }   
    }  else if (int.length > 10) {
        let tail = int.length - 1;
        rounded = `${int.charAt(0)}.${int.substring(1, 6)}e${tail}`;
        return rounded;
    } else if (sureStr.length > 11) {
        trimmedFloat = float.substring(0, (11-int.length));
        rounded = int.concat(trimmedFloat);
        return rounded;
    } else {
        return sureStr;
    }
}

function keyPress(e) {
    const key = e.key
    if (oneToNine.test(key) || e.key === "0" || e.key === ".") {
        addToDisplay(key);
        return;
    } else if (operList.test(key)) {
        beginOp(key);
        return;
    } else {
        return;
    }
}

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
        equals();
    } else if (e.key === "Backspace" || e.key === "Delete") {
        del();
    } else if (e.code === "Space") {
        clearDisplay();
    }

    keyPress(e);
})


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
