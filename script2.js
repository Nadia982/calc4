const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const numbersAndOperators = [...numberButtons, ...operatorButtons];
const display = document.querySelector("#display");
const result = document.querySelector("#result");
let leftOperand = 0;
let partOfExpression = leftOperand;
let expressionToCalculate = [];
let operatorButtonsArray = Array.from(operatorButtons)
let operator = "";
let rightOperand = "";

function calculateOperand(nameOfOperand, input){
    if (display.innerHTML == 0) {
        display.innerText = input;
        nameOfOperand = input;
      } else {
        display.innerText += input;
        nameOfOperand += input;
      } 
}

function processInput(input) {
  //updates the display
//   console.log("initial expressionToCalculate", expressionToCalculate);
  if (expressionToCalculate.length == 0) {
    calculateOperand(leftOperand, input);
    if (expressionToCalculate.length == 0 && input =="+" || input=="-" || input=="*"|| input=="/") {
      operator=input;
    expressionToCalculate.push(leftOperand);
    expressionToCalculate.push(operator);
      console.log("expression to calculate", expressionToCalculate);

  } 
 else if (expressionToCalculate.length == 2){
    calculateOperand(rightOperand, input);
 }
 
//   else {
//     result.innerText = "This calculation can handle one operation at a time";
//   }
  console.log("afterwards expressionToCalculate", expressionToCalculate);
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
