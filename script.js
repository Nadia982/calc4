const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const numbersAndOperators = [...numberButtons, ...operatorButtons];
const display = document.querySelector("#display");
const result = document.querySelector("#result");
let leftOperand = 0;
let partOfExpression = leftOperand;
let expressionToCalculate = [];
let operatorButtonsArray = Array.from(operatorButtons);
let operator = "";
let rightOperand = "";
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const equals = document.getElementById("equals");
// let numbersAsDigits = [0,1, 2,3,4,5,6,7,8,9, "."]
let operators = ["+", "-", "*", "/"];

function processInput(input) {
  if (expressionToCalculate.length == 0 && numbers.includes(input)) {
    if (display.innerHTML == 0) {
      display.innerText = input;
      leftOperand = input;
    } else {
      display.innerText += input;
      leftOperand += input;
    }
  }
  if (expressionToCalculate.length == 0 && operators.includes(input)) {
    console.log("operators includes input");
    operator = input;
    expressionToCalculate.push(leftOperand);
    expressionToCalculate.push(operator);
    display.innerText += input;
  }
  if (expressionToCalculate.length == 2) {
    console.log("expressionToCalculate length is 2");
    if (numbers.includes(input)) {
      if (display.innerHTML == 0) {
        display.innerText = input;
        rightOperand = input;
      } else {
        display.innerText += input;
        rightOperand += input;
        console.log("right operand is:", rightOperand);
      }
      equals.addEventListener("click", () => {
        if (expressionToCalculate.length == 2) {
          expressionToCalculate.push(rightOperand);
          console.log("expression to calculate:", expressionToCalculate)
        }
      });
    }
  }
  console.log("expression to calculate", expressionToCalculate);

  //   else {
  //     result.innerText = "This calculation can handle one operation at a time";
  //   }
  // console.log("afterwards expressionToCalculate", expressionToCalculate);
}
function calculate(rightOperand) {
  console.log("equals clicked");
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
  expressionToCalculate = [];
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
function calculate(leftOperand, operator, rightOperand) {
  if (operator === "+") {
    return leftOperand + rightOperand;
  } else if (operator === "-") {
    return leftOperand - rightOperand;
  } else if (operator === "*") {
    return leftOperand * rightOperand;
  } else {
    return leftOperand / rightOperand;
  }
}
