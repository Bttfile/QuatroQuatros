const cards = document.querySelectorAll('.card');  // Seleciona todas as cartas
let hasFlippedCard = false;  // Flag para saber se uma carta foi virada
let firstCard, secondCard;   // Referências para as duas cartas viradas
let lockBoard = false;       // Impede que mais de duas cartas sejam viradas ao mesmo tempo
let matchedPairs = 0;        // Contador de pares encontrados

// Função para virar as cartas
function flipCard() {
    if (lockBoard) return;  // Bloqueia o tabuleiro se houver um par em processo
    if (this === firstCard) return;  // Impede que a mesma carta seja virada duas vezes

    this.classList.add('flip');  // Aplica a classe 'flip' na carta para virar

    if (!hasFlippedCard) {
        // Se não há nenhuma carta virada, a atual será a primeira
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Se já houver uma carta virada, a atual será a segunda
    secondCard = this;

    // Verifica se as cartas viradas são um par
    checkForMatch();
}

// Função para checar se as cartas são um par
function checkForMatch() {
    // Verifica se as cartas têm o mesmo valor
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();  // Desativa as cartas para que não possam ser viradas de novo
        matchedPairs++;   // Incrementa o contador de pares encontrados
        checkVictory();   // Verifica se o jogo foi vencido
        return;
    }

    unflipCards();  // Se não forem um par, vira as cartas de volta
}

// Função para desabilitar cartas combinadas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();  // Reseta o estado do tabuleiro para permitir novas viradas
}

// Função para virar as cartas de volta
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();  // Reseta o estado do tabuleiro
    }, 1000);
}

// Função para resetar o estado do tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Função para verificar se todos os pares foram encontrados
function checkVictory() {
    if (matchedPairs === cards.length / 2) {
        setTimeout(() => {
            showVictoryMessage();  // Chama a função para exibir a mensagem de vitória
        }, 500);
    }
}

// Função para exibir a mensagem de vitória
function showVictoryMessage() {
    const victoryMessage = document.getElementById('victory-message');
    victoryMessage.style.display = 'block';  // Exibe a mensagem de vitória
}

// Adiciona o evento de clique para cada carta
cards.forEach(card => card.addEventListener('click', flipCard));

// Embaralha as cartas ao carregar o jogo
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;  // Atribui uma posição aleatória para cada carta
    });
})();
