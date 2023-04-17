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