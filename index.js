const input = document.querySelector('input');
const allButtons = Array.from(document.querySelectorAll('.button'));

const numButtons = allButtons.filter(button => {
  if (button.classList.contains('number')) {
    return button;
  }
});

const operatorButtons = allButtons.filter(button => {
  if (button.classList.contains('operator')) {
    return button;
  }
})

const decimalButton = document.querySelector('#decimal');
const enterButton = document.querySelector('#enter');
const clearButton = document.querySelector('#clear');

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator.toLowerCase()) {
    case '+':
      input.value = add(a, b);
      return add(a, b);
      break;
    case '-':
      input.value = subtract(a, b);
      return subtract(a, b);
      break;
    case '×':
      input.value = multiply(a, b);
      return multiply(a, b);
      break;
    case '÷':
      input.value = divide(a, b);
      return divide(a, b);
      break;
    default:
      return 'Error';
  }
}

function isOperator(str) {
  return str == '+' || str == '-' || str == '×' || str == '÷';
}

function hasOperator(arr) {
  return arr.some( (elem) => {
    return isOperator(elem);
  });
}

function evalExpression(arr) {
  if (!hasOperator(arr)) { 
    return 'Enter a valid expression: No operator';
  }
  
  let eval = 0;
  if (typeof arr[0] != 'object') {
    return 'Enter a valid expression: First input is not a number';
  } else if (typeof arr[arr.length-1] != 'object') {
    return 'Enter a valid expression: Last input is not a number';
  }

  let numArr = [];
  let numOne = null;
  let tempOp = '';
  let numTwo = null;
  let index = 0;
  do {
    if (isOperator(arr[index])) {
      if (tempOp == '')  { //first operator
        tempOp = arr[index];
        numOne = new Number(numArr.join(''));
        numArr = [];
      } else if (tempOp != '') { //not first operator; numOne exists
        numTwo = new Number(numArr.join(''));
        numOne = operate(tempOp, numOne, numTwo);  
        tempOp = arr[index];
        numArr = [];
      } 
    } else{
      numArr[index] = arr[index];
    } 

    if (index == arr.length-1) { // last iteration
      numTwo = new Number(numArr.join(''));
      numOne = operate(tempOp, numOne, numTwo);
    }
    index++;
  } while (index < arr.length);

  return Math.round(numOne * 10) / 10;
  /*
  1.start at first index, add to num array until you hit an operator
  2.make array a string then a number from string
  3.save operator to pass into func later
  4.start at index after operator, add to new num array until you hit an operator
  or end of array
  5.operate(operator, firstNum, secondNum);
  6.keep going until none left
  */
}

let inputArr = [];

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    inputArr.push(new Number(button.textContent));
    console.log(inputArr);
    input.value = inputArr.join('');
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (hasOperator(inputArr)) {
      input.value = evalExpression(inputArr);
      inputArr = [new Number(input.value)];
    }
    inputArr.push(button.textContent);
    console.log(inputArr);
    input.value = inputArr.join('');
  });
});

decimalButton.addEventListener('click', () => {
  inputArr.push(decimalButton.textContent);
  console.log(inputArr);
  input.value = inputArr.join('');
});

clearButton.addEventListener('click', () => {
  inputArr = [];
  input.value = '';
  console.log(inputArr);
});

enterButton.addEventListener('click', () => {
  input.value = evalExpression(inputArr);
  inputArr = [new Number(input.value)];
});