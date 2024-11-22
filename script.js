// to do ********************************
// backspace
// decimal
// deal with long numbers
// roman
// words
// calculate result if an operator key is pressed
// if I only put one number and press equals, show that one number in result.

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

function reset(prevAnswer) {
  display.innerText = prevAnswer;
  expressionToCalculate.length = 0;
  leftOperand = prevAnswer;
  rightOperand = 0;
  expressionToCalculate[0] = leftOperand;
}

function processAnswer(answer) {
  result.innerText = answer;
  reset(answer);
}

function processExpressionToCalculate(expressionArray) {
  const [left, operator, right] = expressionArray;
  console.log("left: " + left);
  console.log("operator: " + operator);
  console.log("right: " + right);
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

function processInput(input) {
  if (
    // Processing leftOperand
    (expressionToCalculate.length === 0 ||
      expressionToCalculate.length === 1) &&
    numbers.includes(input)
  ) {
    if (display.innerHTML === '0') {
      display.innerText = input;
      leftOperand = input;
      expressionToCalculate[0] = input;
    } else {
      if (input == "." && !leftOperand.includes(".")) {
        display.innerText += input;
        leftOperand += input;
      } else {
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
  if (expressionToCalculate.length == 2 && numbers.includes(input)) {
    if (rightOperand === "0") {
      display.innerText = input;
      rightOperand = input;
      expressionToCalculate[2] = input;
    } else if (input == "." && !rightOperand.includes(".")) {
      display.innerText += input;
      rightOperand += input;
    } else {
      display.innerText += input;
      rightOperand += input;
    }
    expressionToCalculate[2] = rightOperand;
    console.log("expression to calculate", expressionToCalculate);
    // adds eventListener to equals button
    
  }
  console.log("expression to calculate", expressionToCalculate);
}

equals.addEventListener("click", () => {
  if (expressionToCalculate.length == 2) {
    expressionToCalculate.push(rightOperand);
    console.log("expression to calculate:", expressionToCalculate);
    processExpressionToCalculate(expressionToCalculate);
  }
});

function clearDisplay() {
  console.clear();
  display.innerText = "";
  result.innerText = 0;
  expressionToCalculate.length = 0;
  leftOperand = 0;
  rightOperand = 0;
}

numbersAndOperators.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    processInput(value);
    // const currentInput = document.querySelector("#input").value;
    // document.querySelector("#input").value = currentInput + button.textContent;
  });
});


// function backspace() {
//   console.log("expressionToCalculate: ", expressionToCalculate)
//   display.innerText = display.innerText.slice(0, -1);
//   expressionAsString = expressionToCalculate.join(",");
//   console.log(expressionAsString);
//   expressionAsString = expressionAsString.slice(0, -1)
//   console.log(expressionAsString);
//   expressionToCalculate =expressionAsString.split(",");
//   console.log(expressionToCalculate);
// }
