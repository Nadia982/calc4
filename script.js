console.clear();
const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const numbersAndOperators = [...numberButtons, ...operatorButtons];
const display = document.querySelector("#display");
const result = document.querySelector("#result");
let leftOperand = 0;
let rightOperand = 0;
let partOfExpression = leftOperand;
let expressionToCalculate = [];
let operatorButtonsArray = Array.from(operatorButtons);
let operator = "";
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const equals = document.getElementById("equals");
let operators = ["+", "-", "*", "/"];
let answer;

function reset(prevAnswer){
  display.innerText = prevAnswer;
  expressionToCalculate.length=0;
  leftOperand = 0;
  rightOperand = 0;
  expressionToCalculate = [prevAnswer];
}

function processAnswer(answer){
  result.innerText = answer;
  reset(answer);
}

function processExpressionToCalculate(expressionArray) {
  const [left, operator, right] = expressionArray;
  console.log("left: " + left)
  console.log("operator: " + operator);
  console.log("right: " + right);
  switch (operator) {
    case "+":
       answer =  +left + +right;
       processAnswer(answer);
       break;
    case "-":
       answer =  +left - +right;
       processAnswer(answer);
       break;
    case "*":
        answer =  +left * +right;
        processAnswer(answer);

      break;
      case "/":
        answer =  +left / +right;
        processAnswer(answer);
      break;
  }
}

function processInput(input) {
  if (expressionToCalculate.length == 0 && numbers.includes(input)) {
    if (display.innerHTML == 0) {
      display.innerText = input;
      leftOperand = input;
      expressionToCalculate[0] = input;
    } else {
      display.innerText += input;
      leftOperand += input;
      expressionToCalculate[0] += input;
    }
  }
  if (expressionToCalculate.length == 1 && operators.includes(input)) {
    operator = input;
    // expressionToCalculate.push(leftOperand);
    expressionToCalculate.push(operator);
    display.innerText += input;
  }
  if (expressionToCalculate.length == 2) {
    if (numbers.includes(input)) {
      if (rightOperand == 0) {
        display.innerText = input;
        rightOperand = input;
      } else {
        display.innerText += input;
        rightOperand += input;
      }
      equals.addEventListener("click", () => {
        if (expressionToCalculate.length == 2) {
          expressionToCalculate.push(rightOperand);
          console.log("expression to calculate:", expressionToCalculate);
          processExpressionToCalculate(expressionToCalculate);
        }
      });
    }
  }
  console.log("expression to calculate", expressionToCalculate);

  //   else {
  //     result.innerText = "This calculation can handle one operation at a time";
  //   }
  
}
function calculate(rightOperand) {
  if (expressionToCalculate.length == 3) {
    expressionToCalculate.push(rightOperand);
    console.log("expression to calculate", expressionToCalculate);
    //   const resultValue = calculate(parseFloat(expressionToCalculate[0]), expressionToCalculate[1], parseFloat(expressionToCalculate[2]));
    //   result.innerText = resultValue;
    //   leftOperand = resultValue;
    //   expressionToCalculate = [leftOperand];
  }
}

function clearDisplay() {
  display.innerText = "";

  result.innerText = 0;
  expressionToCalculate.length = 0;
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
//data-type = "operator"
// function calculate(leftOperand, operator, rightOperand) {
//   if (operator === "+") {
//     return leftOperand + rightOperand;
//   } else if (operator === "-") {
//     return leftOperand - rightOperand;
//   } else if (operator === "*") {
//     return leftOperand * rightOperand;
//   } else {
//     return leftOperand / rightOperand;
//   }
// }
