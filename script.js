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
  leftOperand = prevAnswer.toString();
  rightOperand = "";
  expressionToCalculate[0] = leftOperand;
}

function processAnswer(answer) {
  console.log(answer.toString().length);
  if (answer.toFixed(6).toString().length<14){
  result.style.fontSize = largeFont;
  result.innerText = parseFloat(answer.toFixed(6));
  prepareForFurtherCalculations(parseFloat(answer.toFixed(6)));
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

function calculate(){
      if (expressionToCalculate.length === 1 && expressionToCalculate[0] === "") {
      result.innerText = 0;
    } else if (expressionToCalculate.length === 1) {
      result.style.fontSize = largeFont;
      result.innerText = expressionToCalculate[0];
    } else if (expressionToCalculate.length == 3) {
      processExpressionToCalculate(expressionToCalculate);
    }
  }

equals.addEventListener("click", calculate);

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

function numberToRomanNumerals() {
  calculate();
  let num = result.innerText;
  if (num > 3999999) {
    result.style.fontSize = "32px";
    result.innerText =
      "Error: max value to convert to Roman numerals is 3,999,999";
  } else {
    const romanNumerals = {
      M̅: 1000000,
      C̅M̅: 900000,
      D̄: 500000,
      C̅D̄: 400000,
      C̅: 100000,
      X̅C̅: 90000,
      L̅: 50000,
      X̅L̅: 40000,
      X̅: 10000,
      V̅: 5000,
      MV̅: 4000,
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };

    let romanNumeralOutput = "";
    for (const letter in romanNumerals) {
      const numberEquivalentToRomanNumeral = romanNumerals[letter];
      while (num >= numberEquivalentToRomanNumeral) {
        num -= numberEquivalentToRomanNumeral;
        romanNumeralOutput += letter;
      }
    }

    result.innerText = romanNumeralOutput;
  }
}

function convertNumberToWords() {
  calculate(); //calculates result if this hasn't already been done
  const num = result.innerText;
  const maxNumLimit = 1000000;
  const minNumLimit = -maxNumLimit;
  result.style.fontSize = "32px";

  if (num > maxNumLimit) {
    result.innerText = "Error: max value to convert to words is 1,000,000";
    return;
  }
  if (num < minNumLimit) {
    result.innerText = "Error: min value to convert to words is -1,000,000";
    return;
  }

  result.innerText = numberToWords(num);
}

function numberToWords(num) {
  if (num == 0) {
    return "zero";
  } else if (num < 0) {
    const positiveNum = num.toString().slice(1);
    return "minus " + numberToWords(positiveNum);
  } else if (num.includes(".")) {
    const [integerPart, decimalPart] = num.split(".");
    return (
      convertPositiveNumberToWords(parseInt(integerPart)) +
      " point " +
      convertDecimalPartToWords(decimalPart)
    );
  } else {
    return convertPositiveNumberToWords(num);
  }
}

function convertDecimalPartToWords(decimalStr) {
  const digits = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
  };

  let decimalWords = "";
  for (let digit of decimalStr) {
    decimalWords += digits[digit] + " ";
  }
  return decimalWords.trim();
}

function convertPositiveNumberToWords(num) {
  const ones = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
  };
  const teens = {
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
  };
  const tens = {
    2: "twenty",
    3: "thirty",
    4: "forty",
    5: "fifty",
    6: "sixty",
    7: "seventy",
    8: "eighty",
    9: "ninety",
  };

  let words = "";

  function handleOneToNinetyNine(num) {
    if (num > 0 && num < 10) {
      words += ones[num];
    } else if (num >= 10 && num < 20) {
      words += teens[num];
    } else if (num >= 20 && num < 100) {
      words += tens[Math.floor(num / 10)];
      if (num % 10 > 0) {
        words += " " + ones[num % 10];
      }
    }
    return words;
  }

  function handle100to999(num) {
    words += ones[Math.floor(num / 100)] + " hundred";
    if (num % 100 > 0) {
      words += " and ";
      handleOneToNinetyNine(num % 100);
    }
    return words;
  }

  function handle1000to999999(num) {
    const thousands = Math.floor(num / 1000);
    if (thousands < 100) {
      handleOneToNinetyNine(thousands);
    } else {
      handle100to999(thousands);
    }
    words += " thousand";
    if (num % 1000 > 0) {
      if (num % 1000 < 100) {
        words += " and ";
      } else {
        words += ", ";
      }
      handle100to999(num % 1000);
    }
    return words;
  }

  if (num < 100) {
    handleOneToNinetyNine(num);
  } else if (num >= 100 && num < 1000) {
    handle100to999(num);
  } else if (num >= 1000 && num < 1000000) {
    handle1000to999999(num);
  }

  return words;
}