const bAhora = document.getElementById("brillo");
const vAhora = document.getElementById("valor");
var trans;
function mover(){
    valPercent = (bAhora.value / bAhora.max)*255;
    vAhora.textContent = bAhora.value;
    trans = (bAhora.value/255);
    bAhora.style.boxShadow = '0px 0px 15px 15px rgba(173, 255, 47, '+trans+')'
}
mover();