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
  if (typeof a != 'number' || typeof b != 'number') {
    return 'Enter a valid number';
  } else if (typeof operator != 'string') {
    return 'Enter a valid operator';
  }
  switch (operator.toLowerCase()) {
    case 'add':
      return add(a, b);
      break;
    case 'subtract':
      return subtract(a, b);
      break;
    case 'multiply':
      return multiply(a, b);
      break;
    case 'divide':
      return divide(a, b);
      break;
    default:
      return 'Operator not found';
  }
}

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
let inputArr = [];

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    inputArr.push(new Number(button.textContent));
    console.log(inputArr);
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    inputArr.push(button.textContent);
    console.log(inputArr);
  });
});

decimalButton.addEventListener('click', () => {
  inputArr.push(decimalButton.textContent);
  console.log(inputArr);
});

clearButton.addEventListener('click', () => {
  inputArr = [];
  console.log(inputArr);
});
