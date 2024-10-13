const azul = document.getElementById('botona'),
      violeta = document.getElementById('botonv'),
      verde = document.getElementById('botonve');

const ledazul = document.getElementById('leda'),
      ledvioleta = document.getElementById('ledv'),
      ledverde = document.getElementById('ledve');
let prendidoa = 0, prendidov = 0, prendidove = 0;
azul.addEventListener('click', function() {
    if (prendidoa == 0) {
        ledazul.style.boxShadow = '0px 0px 10px 10px #52cfd3';
        azul.value = 'Apagar LED AZUL';
        console.log("Se prendio el LED AZUL");
        prendidoa = 1;
    } else if (prendidoa == 1) {
        ledazul.style.boxShadow = 'none';
        azul.value = 'Prender LED AZUL';
        console.log("Se apago el LED AZUL");
        prendidoa = 0;
    }
});

violeta.addEventListener('click', function() {
    if (prendidov == 0) {
        ledvioleta.style.boxShadow = '0px 0px 10px 10px #aa00ff';
        violeta.value = 'Apagar LED VIOLETA';
        console.log("Se prendio el LED VIOLETA");
        prendidov = 1;
    } else if (prendidov == 1) {
        ledvioleta.style.boxShadow = 'none'
        violeta.value = 'Prender LED VIOLETA';
        console.log("Se apago el LED VIOLETA");
        prendidov = 0;
    }
});

verde.addEventListener('click', function() {
    if (prendidove == 0) {
        ledverde.style.boxShadow = '0px 0px 10px 10px #80ff00';
        verde.value = 'Apagar LED VERDE';
        console.log("Se prendio el LED VERDE");
        prendidove = 1;
    } else if (prendidove == 1) {
        ledverde.style.boxShadow = 'none';
        verde.value = 'Prender LED VERDE';
        console.log("Se apago el LED VERDE");
        prendidove = 0;
    }
});