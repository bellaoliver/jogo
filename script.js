// Variáveis
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const largura = canvas.width;
const altura = canvas.height;
const raqueteAltura = 100;
const raqueteLargura = 10;
const bolaTamanho = 10;
const velocidade = 3;
let pontosJogador1 = 0;
let pontosJogador2 = 0;
let tempo = 0;
let intervaloTempo;

// Objetos
const raquete1 = {
    x: 10,
    y: altura / 2 - raqueteAltura / 2,
    velocidade: velocidade
};

const raquete2 = {
    x: largura - 20,
    y: altura / 2 - raqueteAltura / 2,
    velocidade: velocidade
};

const bola = {
    x: largura / 2,
    y: altura / 2,
    velocidadeX: velocidade,
    velocidadeY: velocidade
};

// Funções
function desenhar() {
    ctx.clearRect(0, 0, largura, altura);
    ctx.fillStyle = '#000';
    ctx.fillRect(raquete1.x, raquete1.y, raqueteLargura, raqueteAltura);
    ctx.fillRect(raquete2.x, raquete2.y, raqueteLargura, raqueteAltura);
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bolaTamanho / 2, 0, 2 * Math.PI);
    ctx.fill();
}

function atualizar() {
    // Movimentar raquetes
    if (teclaCima1) {
        raquete1.y -= raquete1.velocidade;
    }
    if (teclaBaixo1) {
        raquete1.y += raquete1.velocidade;
    }
    if (teclaCima2) {
        raquete2.y -= raquete2.velocidade;
    }
    if (teclaBaixo2) {
        raquete2.y += raquete2.velocidade;
    }

    // Movimentar bola
    bola.x += bola.velocidadeX;
    bola.y += bola.velocidadeY;

    // Colisão com raquetes
    if (bola.x <= raquete1.x + raqueteLargura && bola.y >= raquete1.y && bola.y <= raquete1.y + raqueteAltura) {
        bola.velocidadeX = -bola.velocidadeX;
    }
    if (bola.x + bolaTamanho >= raquete2.x && bola.y >= raquete2.y && bola.y <= raquete2.y + raqueteAltura) {
        bola.velocidadeX = -bola.velocidadeX;
    }

    // Colisão com parede
    if (bola.y <= 0 || bola.y + bolaTamanho >= altura) {
        bola.velocidadeY = -bola.velocidadeY;
    }

    // Pontuação
    if (bola.x <= 0) {
        pontosJogador2++;
        document.getElementById('pontos-jogador-2').innerText = pontosJogador2;
        bola.x = largura / 2;
        bola.y = altura / 2;
        bola.velocidadeX = velocidade;
        bola.velocidadeY = velocidade;
    }
    if (bola.x + bolaTamanho >= largura) {
        pontosJogador1++;
        document.getElementById('pontos-jogador-1').innerText = pontosJogador1;
        bola.x = largura / 2;
        bola.y = altura / 2;
        bola.velocidadeX = -velocidade;
        bola.velocidadeY = -velocidade;
    }

    // Verificar vitória
    if (pontosJogador1 >= 5) {
        alert('Jogador 1 ganhou!');
        location.reload();
    }
    if (pontosJogador2 >= 5) {
        alert('Jogador 2 ganhou!');
        location.reload();
    }
}

function loop() {
    desenhar();
    atualizar();
    requestAnimationFrame(loop);
}

// Teclas
let teclaCima1 = false;
let teclaBaixo1 = false;
let teclaCima2 = false;
let teclaBaixo2 = false;

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            teclaCima1 = true;
            break;
        case 's':
            teclaBaixo1 = true;
            break;
        case 'ArrowUp':
            teclaCima2 = true;
            break;
        case 'ArrowDown':
            teclaBaixo2 = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            teclaCima1 = false;
            break;
        case 's':
            teclaBaixo1 = false;
            break;
        case 'ArrowUp':
            teclaCima2 = false;
            break;
        case 'ArrowDown':
            teclaBaixo2 = false;
            break;
    }
});

// Tempo
intervaloTempo = setInterval(() => {
    tempo++;
    document.getElementById('tempo-valor').innerText = `${Math.floor(tempo / 60)}:${tempo % 60}`;
}, 1000);

// Replay
document.getElementById('replay').addEventListener('click', () => {
    location.reload();
});

loop();