var display = document.getElementById("display");

var listenerBtn = [];

listenerBtn.push(document.getElementById("suma"));
listenerBtn.push(document.getElementById("resta"));
listenerBtn.push(document.getElementById("division"));
listenerBtn.push(document.getElementById("multiplicacion"));

listenerBtn.push(document.getElementById("num0"));
listenerBtn.push(document.getElementById("num1"));
listenerBtn.push(document.getElementById("num2"));
listenerBtn.push(document.getElementById("num3"));
listenerBtn.push(document.getElementById("num4"));
listenerBtn.push(document.getElementById("num5"));
listenerBtn.push(document.getElementById("num6"));
listenerBtn.push(document.getElementById("num7"));
listenerBtn.push(document.getElementById("num8"));
listenerBtn.push(document.getElementById("num9"));

var botonResultado = document.getElementById("resultado");
var botonTodo = document.getElementById("eliminarTodo");
var botonDigito = document.getElementById("eliminarDigito");
listenerBtn.push(document.getElementById("decimal"));

var pointCounter = 0;
var pointLimit = 1;

for (var i = 0; i < listenerBtn.length; i++) {
  listenerBtn[i].addEventListener("click", digitosDisplay); 
}

botonResultado.onclick = function () {
    resul();
};

botonDigito.onclick = function () {
    eliminarDig();
};

botonTodo.onclick = function () {
  display.value = "";
  pointCounter = 0;
};

function resul() {
  if (verificarOperador(display.value.substring(display.value.length - 1, display.value.length))) {
    eliminarDig();
  }

  var calculatedValue = calculateArray(display.value); 

  if (calculatedValue || calculatedValue == "0") {
    display.value = calculatedValue;
  }
}

function eliminarDig() {
  if (display.value.length > 0) {
    if (display.value[display.value.length - 1] === ".") {
      pointCounter = 0;
    }
    display.value = display.value.substring(0, display.value.length - 1);
  }
}

function digitosDisplay() {
  lastDigit = this.value;

  if (verificarOperador(lastDigit)){
    pointCounter = 0;
    if (verificarOperador(display.value.substring(display.value.length - 1, display.value.length))) {
        eliminarDig();
    }
  } 
    
  if (verificarDecimal(lastDigit) === true){
    pointCounter++;
    if (pointCounter > pointLimit){
      return;
    }    
  } 
  display.value += lastDigit;  
}

function verificarDecimal(valorDigitado) {
  if (valorDigitado === ".") {
    return true;
  } else {
    return false;
  }
}

function verificarOperador(operatorValue) {
  switch (operatorValue) {
    case "*":
      return true;
    case "÷":
      return true;
    case "+":
      return true;
    case "-":
      return true;
    default:
      return false;
  }
}

function calculateArray(exp) {
  exp = exp.toString().split("+");
  for (a = 0; a < exp.length; a++) {
    exp[a] = exp[a].split("-");
    for (b = 0; b < exp[a].length; b++) {
      exp[a][b] = exp[a][b].split("*");
      for (c = 0; c < exp[a][b].length; c++) {
        exp[a][b][c] = exp[a][b][c].split("/");
        exp[a][b][c] = divisionArray(exp[a][b][c]);
      }
      exp[a][b] = multiplicacionArray(exp[a][b]);
    }
    exp[a] = restaArray(exp[a]);
  }
  exp = sumaArray(exp);

  return exp;
}

function multiplicacionArray(parameter) {
  var resultMult = 1;
  for (var x = 0; x < parameter.length; x++) {
    resultMult *= parameter[x];
  }
  return resultMult;
}

function divisionArray(parameter) {
  var resultDiv = parameter[0];
  for (var x = 1; x < parameter.length; x++) {
    resultDiv /= parameter[x];
  }
  return resultDiv;
}

function restaArray(parameter) {
  var resultSub = parameter[0];
  for (var x = 1; x < parameter.length; x++) {
    resultSub -= parameter[x];
  }
  return resultSub;
}

function sumaArray(parameter) {
  var resultSum = 0;
  for (var x = 0; x < parameter.length; x++) {
    resultSum += parameter[x];
  }
  return resultSum;
}