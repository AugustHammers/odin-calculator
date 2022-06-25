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
    if (typeof arr[i] == 'object' || arr[i] == '.') { // if its a number
      num.unshift(arr[i]);
    } else if (isOperator(arr[i])) {
      break;
    }
  }

  console.log('num from getLatestNumber is' + num);
  return num;
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
        numOne = new Number(getLatestNumber(numArr).join(''));
        numArr = [];
      } else if (tempOp != '') { //not first operator; numOne exists
        numTwo = new Number(getLatestNumber(numArr).join(''));
        numOne = operate(tempOp, numOne, numTwo);  
        tempOp = arr[index];
        numArr = [];
      } 
    } else{
      numArr[index] = arr[index];
    } 

    if (index == arr.length-1) { // last iteration
      numTwo = new Number(getLatestNumber(numArr).join(''));
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

// button events
numButtons.forEach(button => {
  button.addEventListener('click', () => {
    inputArr.push(new Number(button.textContent));
    console.log(inputArr);
    input.value = inputArr.join('');
    button.blur();
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
    button.blur();
  });
});

backspaceButton.addEventListener('click', () => {
  inputArr.pop();
  console.log(inputArr);
  input.value = inputArr.join('');
  backspaceButton.blur();
});

posNegButton.addEventListener('click', () => {
  let numArr = getLatestNumber(inputArr);
  let num = new Number(numArr.join(''));
  let length = numArr.length; // length to be popped off inputArr
  let index = inputArr.length - 1;

  for (let i = index; i > index-length; i--) {
    inputArr.pop();
  }

  inputArr.push(new Number(num *= -1));
  console.log(inputArr);
  input.value = inputArr.join('');
  posNegButton.blur();
});

enterButton.addEventListener('click', () => {
  input.value = evalExpression(inputArr);
  inputArr = [new Number(input.value)];
  console.log(inputArr);
  enterButton.blur();
});

decimalButton.addEventListener('click', () => {
  inputArr.push(decimalButton.textContent);
  console.log(inputArr);
  input.value = inputArr.join('');
  decimalButton.blur();
});

clearButton.addEventListener('click', () => {
  inputArr = [];
  console.log(inputArr);
  input.value = '';
  clearButton.blur();
});

// keyboard events
document.addEventListener('keyup', (e) => {
  console.log(e.key);

  switch (e.key) {
    case '1':
      inputArr.push(new Number(1));
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '2':
      inputArr.push(new Number(2));
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '3':
      inputArr.push(new Number(3));
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '4':
      inputArr.push(new Number(4));
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '5':
      inputArr.push(new Number(5));
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '6':
      inputArr.push(new Number(6));
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '7':
      inputArr.push(new Number(7));
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '8':
      inputArr.push(new Number(8));
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '9':
      inputArr.push(new Number(9));
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '0':
      inputArr.push(new Number(0));
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '/':
      inputArr.push('÷');
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '*':
      inputArr.push('×');
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '-':
      inputArr.push('-');
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '+':
      inputArr.push('+');
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case '.':
      inputArr.push('.');
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case 'Backspace':
      inputArr.pop();
      console.log(inputArr);
      input.value = inputArr.join('');
      break;
    case 'Enter':
      input.value = evalExpression(inputArr);
      inputArr = [new Number(input.value)];
      console.log(inputArr);
      break;
    default:
      break;
  }
});