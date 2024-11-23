// to do ********************************
// deal with long numbers
// roman
// words

console.clear();
const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const numbersAndOperators = [...numberButtons, ...operatorButtons];
const display = document.querySelector("#display");
const result = document.querySelector("#result");
let leftOperand = "";
let rightOperand = "";
let expressionToCalculate = [];
let operatorButtonsArray = Array.from(operatorButtons);
let operator = "";
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const equals = document.getElementById("equals");
let operators = ["+", "-", "*", "/"];
let answer;
let smallFont = "28px";
let largeFont = "56px"

function prepareForFurtherCalculations(prevAnswer) {
  display.innerText = prevAnswer;
  expressionToCalculate.length = 0;
  leftOperand = prevAnswer;
  rightOperand = "";
  expressionToCalculate[0] = leftOperand;
}

function processAnswer(answer) {
  console.log(answer.toString().length);
  if (answer.toFixed(6).toString().length<14){
  result.style.fontSize = largeFont;
  result.innerText = answer.toFixed(6);
  prepareForFurtherCalculations(answer.toFixed(6));
}else {
  result.style.fontSize = smallFont;
  result.innerText = "This calculator only shows answers up to 14 digits long. Please press 'AC' and try again."
}
}

function processExpressionToCalculate(expressionArray) {
  const [left, operator, right] = expressionArray;
  console.log("left: " + left);
  console.log("operator: " + operator);
  console.log("right: " + right);
  if (operator === "/" && right === "0") {
    result.innerText = "Can't divide by 0";
  } else if (right === "") {
    result.innerText = "Please enter a second number to calculate";
  } else {
    switch (operator) {
      case "+":
        answer = +left + +right;
        processAnswer(answer);
        break;
      case "-":
        answer = +left - +right;
        processAnswer(answer);
        break;
      case "*":
        answer = +left * +right;
        processAnswer(answer);

        break;
      case "/":
        answer = +left / +right;
        processAnswer(answer);
        break;
    }
  }
}

function processInput(input) {
  if(display.innerText.length < 20){
  if (
    // Processing leftOperand
    (expressionToCalculate.length === 0 ||
      expressionToCalculate.length === 1) &&
    numbers.includes(input)
  ) {
    if (display.innerText === "0") {
      display.innerText = input;
      leftOperand = input;
      expressionToCalculate[0] = input;
    } else {
      if (input === "." && !leftOperand.includes(".")) {
        display.innerText += input;
        leftOperand += input;
      } else if (input !== ".") {
        display.innerText += input;
        leftOperand += input;
      }
      expressionToCalculate[0] = leftOperand;
    }
  }

  // Processing operator
  if (expressionToCalculate.length == 1 && operators.includes(input)) {
    operator = input;
    expressionToCalculate.push(operator);
    display.innerText += input;
  }
  // Processing rightOperand
  if (
    (expressionToCalculate.length == 2 || expressionToCalculate.length == 3) &&
    numbers.includes(input)
  ) {
    if (rightOperand === "0" && input !== ".") {
      display.innerText = input;
      rightOperand = input;
    } else {
      if (input === "." && !rightOperand.includes(".")) {
        display.innerText += input;
        rightOperand += input;
        console.log(rightOperand);
      } else if (input !== ".") {
        display.innerText += input;
        rightOperand += input;
        console.log(rightOperand);
      }
    }
    expressionToCalculate[2] = rightOperand;
    console.log("expression to calculate", expressionToCalculate);
  }} else {
    result.style.fontSize = smallFont;
      result.innerText = "Display shows up 20 characters";
  }
}

equals.addEventListener("click", () => {
  if (expressionToCalculate.length === 1 && expressionToCalculate[0] === "") {
    result.innerText = 0;
  } else if (expressionToCalculate.length === 1) {
    result.style.fontSize = largeFont;
    result.innerText = expressionToCalculate[0];
  } else if (expressionToCalculate.length == 3) {
    processExpressionToCalculate(expressionToCalculate);
  }
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (expressionToCalculate.length == 2) {
      result.style.fontSize = smallFont;
      result.innerText = "Please enter a second number to calculate";
    } else if (expressionToCalculate.length == 3) {
      processExpressionToCalculate(expressionToCalculate);
    }
  });
});

function clearDisplay() {
  console.clear();
  display.innerText = "";
  result.innerText = 0;
  expressionToCalculate.length = 0;
  leftOperand = "";
  rightOperand = "";
}

numbersAndOperators.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    processInput(value);
  });
});

function backspace() {
  console.log("expressionToCalculate: ", expressionToCalculate);
  display.innerText = display.innerText.slice(0, -1);
  expressionAsString = expressionToCalculate.join(",");
  console.log(expressionAsString);
  expressionAsString = expressionAsString.slice(0, -1);
  console.log(expressionAsString);
  expressionToCalculate = expressionAsString.split(",");
  console.log(expressionToCalculate);
}
