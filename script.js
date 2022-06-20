// Selections
const screen = document.querySelector(".screen");
const operatorSign = document.querySelector(".operatorSign");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const multiplyBtn = document.getElementById("multiply");
const divideBtn = document.getElementById("divide");
const clearBtn = document.getElementById("clear");
const equalBtn = document.getElementById("equal");
const numberBtns = document.querySelectorAll(".num");
// keeping track of operators if they are being used or not
let operatorIsActive = false;
// to know which operator is active
let activeOperator = "none";
//two no. on which operations have to be performed
let previousNo = 0,
  presentNo = 0;
// to keep track of last clicked button so that one operator doesn't add again and again
let lastClicked = "none";

// events
numberBtns.forEach((btn) => {
  btn.addEventListener("click", showNumsOnScreen);
});
clearBtn.addEventListener("click", (e) => {
  screen.innerText = "0";
  lastClicked = e.target.innerText;
  operatorIsActive = false;
  activeOperator = "none";
  (previousNo = 0), (presentNo = 0);
  lastClicked = "none";
});
plusBtn.addEventListener("click", add);
minusBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);

equalBtn.addEventListener("click", (e) => {
  if (activeOperator == "subtract") {
    subtract(e);
  } else if (activeOperator == "add") {
    add(e);
  } else if (activeOperator == "multiply") {
    multiply(e);
  } else if (activeOperator == "divide") {
    divide(e);
  }
  operatorSign.innerText = "=";
  activeOperator = "none";
  lastClicked = "=";
});

// functions

function showNumsOnScreen(e) {
  if (lastClicked == "=") {
    previousNo = 0;
  }
  lastClicked = e.target.innerText;
  let runTheCode = true;
  const no = e.target.innerText;
  if (no == ".") {
    if (decimalIsPresent()) {
      runTheCode = false;
    }
  }

  if (runTheCode) {
    let fullNo;
    if (screen.innerText == 0 || operatorIsActive) {
      fullNo = no;
      operatorIsActive = false;
    } else {
      fullNo = screen.innerText + no;
    }
    screen.innerText = fullNo;
  }
}

function decimalIsPresent() {
  const num = screen.innerText;
  for (let digit of num) {
    if (digit == ".") {
      return true;
    }
  }
  return false;
}

// adding the numbers
function add() {
  if (lastClicked != "+") {
    operatorSign.innerText = "+";
    activeOperator = "add";
    operatorIsActive = true;
    presentNo = parseFloat(screen.innerText);
    if (lastClicked == "=") {
      presentNo = 0;
    }
    screen.innerText = presentNo + previousNo;
    previousNo = parseFloat(screen.innerText);
    lastClicked = "+";
  }
}
// subtracting the numbers
function subtract(e) {
  if (lastClicked != "-") {
    operatorSign.innerText = "-";
    activeOperator = "subtract";
    operatorIsActive = true;
    presentNo = parseFloat(screen.innerText);
    // if(lastClicked=='='){
    //     presentNo=0;
    // }
    if (e.target.innerText == "=") {
      if (previousNo == 0 && lastClicked != 0) {
        screen.innerText = presentNo;
      } else {
        screen.innerText = previousNo - presentNo;
      }
    }
    previousNo = parseFloat(screen.innerText);
    lastClicked = "-";
  }
}

// multilying the numbers
function multiply(e) {
  if (lastClicked != "x") {
    operatorSign.innerText = "x";
    activeOperator = "multiply";
    operatorIsActive = true;
    presentNo = parseFloat(screen.innerText);
    if (lastClicked == "=") {
      presentNo = 1;
    }
    if (previousNo == 0 && lastClicked != 0) {
      screen.innerText = presentNo;
    } else {
      screen.innerText = presentNo * previousNo;
    }
    previousNo = parseFloat(screen.innerText);
    lastClicked = "x";
  }
}

// dividing the numbers
function divide(e) {
  if (lastClicked != "÷") {
    operatorSign.innerText = "÷";
    activeOperator = "divide";
    operatorIsActive = true;
    presentNo = parseFloat(screen.innerText);
    if (lastClicked == "=") {
      presentNo = 1;
    }
    if (previousNo == 0 && lastClicked != 0) {
      screen.innerText = presentNo;
    } else {
      screen.innerText = previousNo / presentNo;
    }
    previousNo = parseFloat(screen.innerText);
    lastClicked = "÷";
  }
}

// on load
