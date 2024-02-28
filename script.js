document.addEventListener('DOMContentLoaded', function () {
  
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

  
  function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    whosTurn.className = currentPlayer.toLowerCase();
  }

function pintarPattern(){
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
  ];


  if(winPatterns){
    winPatterns.style.background= 'blue';
    console.log("eu deveria ter mudado!")
  }
  return
}
  
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

    
    const isDraw = Array.from(cells).every(cell => cell.textContent !== '');
    if (isDraw) {
      endGame('Draw');
    }
  }

  
  function makeCpuMove() {
    const availableCells = Array.from(cells).filter(cell => !cell.textContent);
    if (availableCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      const selectedCell = availableCells[randomIndex];
      selectedCell.textContent = currentPlayer;
      pintarPattern();
      checkWinner();
      switchPlayer();
      
    }
  }

  
  function resetGame() {
    cells.forEach(cell => {
      cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    whosTurn.className = 'x';
  }

  
  function updateScore() {
    playerOneScore.textContent = playerOneWins;
    playerTwoScore.textContent = playerTwoWins;
  }

  
  function endGame(winner) {
    gameActive = false;

  
    gameMessages.querySelectorAll('.player-x-win, .player-o-win, .draw').forEach(message => {
      message.style.display = 'none';
    });

    
    const winnerMessage = gameMessages.querySelector(`.${winner.toLowerCase().replace(' ', '-')}-win`);
    if (winnerMessage) {
      winnerMessage.style.display = 'block';
    }

    
    if (winner === 'Player 1') {
      playerOneWins++;
      console.log("Player 1 venceu");
    } else if (winner === 'Player 2' && !isPlayerVsCpu) {
      playerTwoWins++;
      console.log("Player 2 venceu");
    }

    
    updateScore();

    
    setTimeout(resetGame, 2000);
  }

  
  cells.forEach(cell => {
    cell.addEventListener('click', function () {
      if (gameActive && !this.textContent) {
        this.textContent = currentPlayer;
        checkWinner();
        switchPlayer();
        if (isPlayerVsCpu && gameActive) {
        
          setTimeout(makeCpuMove, 500);
        }
      }
    });
  });


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


    function playCpuVsCpu() {
      if (isCpuVsCpu && gameActive) {
        makeCpuMove();
        setTimeout(playCpuVsCpu, 1000); 
      }
    }
    playCpuVsCpu();
  });

  botaoSair.addEventListener('click', function(){
    console.log("Estou sendo clicado!")
    window.location.href = "https://www.google.com.br";
  });
});
