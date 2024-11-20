function processInput(input) {
    //updates the display
    if (expressionToCalculate.length == 0 && numbers.includes(input)) {
      if (display.innerHTML == 0) {
        display.innerText = input;
        leftOperand = input;
      } else {
        display.innerText += input;
        leftOperand += input;
      }
    }
    
    // Handle the operator input
    if (expressionToCalculate.length == 0 && operators.includes(input)) {
      operator = input;
      expressionToCalculate.push(leftOperand);
      expressionToCalculate.push(operator);
      console.log("expression to calculate", expressionToCalculate);
    }
    
    // Handle the right operand input when operator has been selected
    if (expressionToCalculate.length == 2) {
      if (numbers.includes(input)) {
        if (display.innerHTML == 0) {
          display.innerText = input;
          rightOperand = input; // Initialize right operand correctly without any operator
        } else {
          display.innerText += input;
          rightOperand += input;
          console.log("right operand is:", rightOperand);   
        }
      }
    }
  }
  