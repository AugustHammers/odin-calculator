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

const backspaceButton = document.querySelector("#backspace");
const posNegButton = document.querySelector("#pn");
const enterButton = document.querySelector('#enter');
const decimalButton = document.querySelector('#decimal');
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
  let ans;
  switch (operator.toLowerCase()) {
    case '+':
      input.value = add(a, b);
      ans = add(a, b);
      break;
    case '-':
      input.value = subtract(a, b);
      ans = subtract(a, b);
      break;
    case '×':
      input.value = multiply(a, b);
      ans = multiply(a, b);
      break;
    case '÷':
      input.value = divide(a, b);
      ans = divide(a, b);
      break;
    default:
      ans = 'Error';
  }

  return ans;
}

function isOperator(str) {
  return str == '+' || str == '-' || str == '×' || str == '÷';
}

function hasOperator(arr) {
  return arr.some( (elem) => {
    return isOperator(elem);
  });
}

function getLatestNumber(arr){
  let num = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (typeof arr[i] == 'object') { // if its a number
      num.unshift(arr[i]);
    } else if (isOperator(arr[i])) {
      break;
    }
  }

  return new Number(num.join(''));
}

function evalExpression(arr) {
  if (!hasOperator(arr)) { 
    return 'Enter a valid expression: No operator';
  }
  
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
        numOne = getLatestNumber(numArr);
        numArr = [];
      } else if (tempOp != '') { //not first operator; numOne exists
        numTwo = getLatestNumber(numArr);
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
      if (!isFinite(numOne)) {
        return 'Error: Number is not finite';
      }
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

backspaceButton.addEventListener('click', () => {
  delete inputArr[inputArr.length-1];
  input.value = inputArr.join('');
});

posNegButton.addEventListener('click', () => {
  // let num = inputArr[inputArr.length-1];
  // if (typeof num == 'object') {
  //   num *= -1;
  // }
  // input.value = inputArr.join('');

  //getNumber func - gets number starting at end of inputArray
  //until operator or beginning

  
});

enterButton.addEventListener('click', () => {
  input.value = evalExpression(inputArr);
  inputArr = [new Number(input.value)];
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