document.addEventListener('DOMContentLoaded', function () {
  // Obtenção dos elementos do DOM
  const gameBoard = document.getElementById('game');
  const cells = document.querySelectorAll('#game li');
  const resetButton = document.getElementById('reset-game');
  const playerVsPlayerButton = document.getElementById('player-vs-player');
  const playerVsCpuButton = document.getElementById('player-vs-cpu');
  const cpuVsCpuButton = document.getElementById('cpu-vs-cpu');
  const showScoreButton = document.getElementById('show-score');
  const gameMessages = document.getElementById('game-messages');
  const whosTurn = document.getElementById('whos-turn');
  const playerOneScore = document.getElementById('player-one-score');
  const playerTwoScore = document.getElementById('player-two-score');
  const botaoSair = document.getElementById('exit-game');

  let currentPlayer = 'X';
  let gameActive = true;
  let isPlayerVsCpu = false;
  let isCpuVsCpu = false;
  let playerOneWins = 0;
  let playerTwoWins = 0;

  // Função para trocar o jogador atual
  function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    whosTurn.className = currentPlayer.toLowerCase();
  }

  // Função para verificar se há um vencedor ou empate
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
      [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
        // Se houver um vencedor, encerra o jogo
        endGame(cells[a].textContent === 'X' ? 'Player 1' : 'Player 2');
        return;
      }
    }

    // Verifica se o jogo é um empate
    const isDraw = Array.from(cells).every(cell => cell.textContent !== '');
    if (isDraw) {
      endGame('Draw');
    }
  }

  // Função para a jogada da CPU
  function makeCpuMove() {
    const availableCells = Array.from(cells).filter(cell => !cell.textContent);
    if (availableCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      const selectedCell = availableCells[randomIndex];
      selectedCell.textContent = currentPlayer;
      checkWinner();
      switchPlayer();
    }
  }

  // Função para reiniciar o jogo
  function resetGame() {
    cells.forEach(cell => {
      cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    whosTurn.className = 'x';
  }

  // Função para atualizar a pontuação
  function updateScore() {
    playerOneScore.textContent = playerOneWins;
    playerTwoScore.textContent = playerTwoWins;
  }

  // Função para encerrar o jogo e exibir mensagens
  function endGame(winner) {
    gameActive = false;

    // Esconde todas as mensagens
    gameMessages.querySelectorAll('.player-x-win, .player-o-win, .draw').forEach(message => {
      message.style.display = 'none';
    });

    // Exibe a mensagem apropriada
    const winnerMessage = gameMessages.querySelector(`.${winner.toLowerCase().replace(' ', '-')}-win`);
    if (winnerMessage) {
      winnerMessage.style.display = 'block';
    }

    // Atualiza o placar de acordo com o vencedor
    if (winner === 'Player 1') {
      playerOneWins++;
      console.log("Player 1 venceu");
    } else if (winner === 'Player 2' && !isPlayerVsCpu) {
      playerTwoWins++;
      console.log("Player 2 venceu");
    }

    // Atualiza a pontuação no HTML
    updateScore();

    // Reinicia o jogo após um breve atraso
    setTimeout(resetGame, 2000);
  }

  // Adiciona eventos de clique às células do jogo
  cells.forEach(cell => {
    cell.addEventListener('click', function () {
      if (gameActive && !this.textContent) {
        this.textContent = currentPlayer;
        checkWinner();
        switchPlayer();
        if (isPlayerVsCpu && gameActive) {
          // Adiciona um atraso de 500ms antes da jogada da CPU
          setTimeout(makeCpuMove, 500);
        }
      }
    });
  });

  // Adiciona eventos de clique aos botões
  resetButton.addEventListener('click', resetGame);

  playerVsPlayerButton.addEventListener('click', function () {
    isPlayerVsCpu = false;
    isCpuVsCpu = false;
    resetGame();
    gameMessages.style.display = 'none';
  });

  playerVsCpuButton.addEventListener('click', function () {
    isPlayerVsCpu = true;
    isCpuVsCpu = false;
    resetGame();
    gameMessages.style.display = 'none';
  });

  cpuVsCpuButton.addEventListener('click', function () {
    isPlayerVsCpu = false;
    isCpuVsCpu = true;
    resetGame();
    gameMessages.style.display = 'none';

    // Lógica da CPU vs CPU (jogadas automáticas)
    function playCpuVsCpu() {
      if (isCpuVsCpu && gameActive) {
        makeCpuMove();
        setTimeout(playCpuVsCpu, 1000); // Ajuste o intervalo conforme necessário
      }
    }
    playCpuVsCpu();
  });

  botaoSair.addEventListener('click', function(){
    console.log("Estou sendo clicado!")
    window.location.href = "https://www.google.com.br";
  });
});
