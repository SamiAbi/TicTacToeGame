var playerTurn = 'X';
var xMoves = [];
var oMoves = [];
const winMoves = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
var aiOptinalMoves = [];
var is1VsAI = false;
var xScore = [-1, -1, -1, -1, -1];
var oScore = [-1, -1, -1, -1, -1];
var round = 0;

loadStyle();
navBar();
mainScreen();

function loadStyle() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'style.css';
  document.head.appendChild(link);
}
function navBar() {
  const element = document.createElement('nav');
  element.classList.add('navbar', 'navbar-expand-lg', 'navbar-dark', 'bg-dark');
  element.innerHTML = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a class="navbar-brand" href="#">X/O Tic Toc Game</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                              <span class="navbar-toggler-icon"></span>
                            </button>
                              <ul class="navbar-nav mr-auto">
                                <li class="nav-item active">
                                  <a class="nav-link" id='home' href="#">Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link" id='newGame' href="#">New Game 1 vs 1</a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link" id='newGameVsPc' href="#">New Game 1 vs PC</a>
                                </li>
                              </ul>
                          </nav>`
  document.body.appendChild(element);
  document.querySelector('#newGame').addEventListener('click', () => { is1VsAI = false; startNewGame(); });
  document.querySelector('#newGameVsPc').addEventListener('click', () => { is1VsAI = true; startNewGame(); });
  document.querySelector('#home').addEventListener('click', mainScreen);
}

function mainScreen() {
  !!document.querySelector('#boardGame') && document.querySelector('#boardGame').remove();
  !!document.querySelector('#mainCard') && document.querySelector('#mainCard').remove();
  const element = document.createElement('div');
  element.classList.add('card', 'board', 'mx-auto', 'mt-5');
  element.setAttribute('id', 'mainCard');
  element.innerHTML = `<div class="card-header">
        Welcome to tic toc Game
        </div>
        <div class="card-body">
        <h5 class="card-title">Tic toc Game made by Sami Abishai</h5>
        <p class="card-text">To start the game press the start button below and enjoy</p>
        <a  class="btn btn-dark text-white m-1" id='startGame'><i class="fas fa-dice"></i>  Start The Game 1 vs 1</a>
        <a  class="btn btn-dark text-white m-1" id='startGameVsPc'><i class="fas fa-robot"></i>  Start The Game 1 vs PC</a>
        </div>`
  document.body.appendChild(element);
  document.querySelector('#startGame').addEventListener('click', () => { is1VsAI = false; startNewGame(); });
  document.querySelector('#startGameVsPc').addEventListener('click', () => { is1VsAI = true; startNewGame(); });

}
function startNewGame() {
  if (!!document.querySelector('#mainCard')) {
    xScore = [-1, -1, -1, -1, -1];
    oScore = [-1, -1, -1, -1, -1];
    round = 0;
    document.querySelector('#mainCard').remove();
    boardGame();
    scoreBoard();

  }
  else {
    resetGame();
  }
}
function getPlayerScoreTable(score) {
  var scoreTable = ''
  score.forEach((round) => {
    if (round == -1)
      return scoreTable += '<td></td>';
    else if (round == 1)
      return scoreTable += '<td><i class="fas fa-check text-success"></i></td>';
    else
      return scoreTable += '<td><i class="fas fa-times text-danger"></i></td>';
  })
  return scoreTable;
}
function scoreBoard() {
  const element = document.createElement('div');
  element.classList.add('card', 'board', 'mx-auto', 'mt-5');
  element.setAttribute('id', 'scoreBoard');
  element.innerHTML = `<div class="card-header">
  <h3 class="mx-auto mt-3 float-left" id="statusScore">Score:</h3><button id="resetButton" type="button" class="float-right mt-3 btn btn-dark m-1 float-right"><i class="fas fa-redo-alt"></i> reset</button></div>
  <div class="card-body">
  <table class="table table-bordered text-center">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">1</th>
      <th scope="col">2</th>
      <th scope="col">3</th>
      <th scope="col">4</th>
      <th scope="col">5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">X</th>
      ${getPlayerScoreTable(xScore)}
    </tr>
    <tr>
      <th scope="row">O</th>
      ${getPlayerScoreTable(oScore)}
    </tr>
  </tbody>
</table>
  </div>`
  document.body.appendChild(element);
  document.querySelector('#resetButton').addEventListener('click', resetGame);

}
function boardGame() {
  playerTurn = 'X';
  xMoves = [];
  oMoves = [];
  const element = document.createElement('div');
  element.classList.add('container', 'text-center', 'mt-5', 'bg-dark');
  element.setAttribute('id', 'boardGame');
  element.innerHTML = `<div class="row text-white"><h3 class="mx-auto mt-3" id="status">X Turn</h3><button id="nextRound" type="button" class="collapse btn btn-light m-1 float-right"><i class="fas fa-arrow-right"></i> Next Round</button></div>
                        <div class="row">
                            <div class="col xoBox" value='1'>
                            </div>
                            <div class=" col xoBox" value='2'>
                            </div>
                            <div class=" col xoBox" value='3'>
                            </div>
                        </div>
                        <div class="row">
                            <div class=" col xoBox" value='4'>
                            </div>
                            <div class=" col xoBox" value='5'>
                            </div>
                            <div class=" col xoBox" value='6'>
                            </div>
                        </div>
                        <div class="row">
                            <div class=" col xoBox" value='7'>
                            </div>
                            <div class=" col xoBox" value='8'>
                            </div>
                            <div class=" col xoBox" value='9'>
                            </div>
                        </div>`
  document.body.appendChild(element);
  document.querySelectorAll('.xoBox').forEach((item) => item.addEventListener('click', setXOHandler));
  document.querySelector('#nextRound').addEventListener('click', nextRound);
}
function getScore() {
  var x = 0, o = 0;
  x = xScore.reduce((sum, score) => sum + score);
  o = oScore.reduce((sum, score) => sum + score);
  if (x > o) {
    return `X win ${x} - ${o}`;
  }
  else if (o > x) {
    return `O win ${o} - ${x}`;
  }
  else {
    return `Draw ${x} - ${x}`;
  }

}
function checkIfLastRoundAndUpdate() {
  if (round == 4) {
    !!document.querySelector('#scoreBoard') && document.body.removeChild(document.querySelector('#scoreBoard'));
    scoreBoard();
    !!document.querySelector('#boardGame') && document.body.removeChild(document.querySelector('#boardGame'));
    document.querySelector('#statusScore').innerText = getScore();
  }
}
function nextRound() {
  !!document.querySelector('#boardGame') && document.body.removeChild(document.querySelector('#boardGame'));
  !!document.querySelector('#scoreBoard') && document.body.removeChild(document.querySelector('#scoreBoard'));
  boardGame();
  scoreBoard();
  document.querySelector('#nextRound').classList.add('collapse');
  round++;
}
function resetGame() {
  xScore = [-1, -1, -1, -1, -1];
  oScore = [-1, -1, -1, -1, -1];
  round = 0;
  !!document.querySelector('#boardGame') && document.body.removeChild(document.querySelector('#boardGame'));
  !!document.querySelector('#scoreBoard') && document.body.removeChild(document.querySelector('#scoreBoard'));
  boardGame();
  scoreBoard();
}
function setXOHandler(event) {
  var element = event.target;
  setXO(element);
}
function setXO(element) {
  if (!!element) {
    var boxNum = parseInt(element.getAttribute('value'));

    element.innerText = playerTurn;
    element.classList.add(playerTurn + 'BoxSelected');
    element.classList.remove('xoBox');
    if (playerTurn == 'X') {
      xMoves.push(boxNum);
      playerTurn = 'O';
    }
    else {
      oMoves.push(boxNum);
      playerTurn = 'X';
    }
    document.querySelector('#status').innerText = playerTurn + ' Turn';
    element.removeEventListener('click', setXOHandler);
    if (checkIfSomeoneWin()) {
      if (playerTurn == 'X') {
        document.querySelector('#status').innerText = 'O Win';
        oScore[round] = 1;
        xScore[round] = 0;
      }
      else {
        document.querySelector('#status').innerText = 'X Win';
        xScore[round] = 1;
        oScore[round] = 0;
      }
      document.querySelector('#status').parentNode.classList.add('xoBoxWin')
      document.querySelectorAll('.xoBox').forEach((item) => {
        item.removeEventListener('click', setXOHandler)
        item.classList.add('xoBoxEnd');
        item.classList.remove('xoBox');
      });
      document.querySelector('#nextRound').classList.remove('collapse');
      checkIfLastRoundAndUpdate();
    }
    else if (xMoves.length == 5) {
      document.querySelector('#status').innerText = 'Draw'
      document.querySelector('#status').parentNode.classList.add('xoBoxWin')
      xScore[round] = 0;
      oScore[round] = 0;
      document.querySelector('#nextRound').classList.remove('collapse');
      checkIfLastRoundAndUpdate();

    }
    else if (is1VsAI && playerTurn == 'O') {
      setAiMove();
    }
  }
}
function CheckIfArrayInclude(array, check) {

  var found = [];
  for (var i = 0; i < array.length; i++) {
    if (!check.includes(array[i])) {
      return false;
    }
  }
  return true;
}
function checkIfSomeoneWin() {
  for (var i = 0; i < winMoves.length; i++) {
    if (CheckIfArrayInclude(winMoves[i], xMoves) || CheckIfArrayInclude(winMoves[i], oMoves)) {
      document.querySelectorAll('.col').forEach((item) => {
        if (winMoves[i].includes(parseInt(item.getAttribute('value')))) {
          item.classList.add('xoBoxWin');
        }
      });
      return true;
    }
  }
  return false;
}
//functions for 1 vs pc game
function checkIfPlayerCanWin(moves1, moves2) {
  aiOptinalMoves = [];
  for (var i = 0; i < winMoves.length; i++) {
    var arr = winMoves[i];
    arr = arr.filter((move) => !moves1.includes(move));

    if (arr.length == 1 && !moves2.includes(arr[0])) {
      aiOptinalMoves.push(arr.pop());
      return true;
    }
  }
  return false;
}
function calculateMovesRatio() {
  aiOptinalMoves = [];
  var allmoves = [];
  for (var i = 0; i < winMoves.length; i++) {
    var arr = winMoves[i];
    arr = arr.filter((move) => !xMoves.includes(move));
    arr = arr.filter((move) => !oMoves.includes(move));
    !!arr.length && allmoves.push({ 'count': (3 - arr.length), 'moves': arr });
  }
  allmoves.sort((move1, move2) => move2.count - move1.count);
  aiOptinalMoves = allmoves[0].moves;
}
function setAiMove() {
  var element;
  if (oMoves.length > 2 && checkIfPlayerCanWin(oMoves, xMoves)) {
    element = document.querySelectorAll('.col')[aiOptinalMoves.pop() - 1]
  }
  else {
    if (checkIfPlayerCanWin(xMoves, oMoves)) {
      element = document.querySelectorAll('.col')[aiOptinalMoves.pop() - 1]
    }
    else {
      calculateMovesRatio();
      var index = Math.floor(Math.random() * aiOptinalMoves.length);
      element = document.querySelectorAll('.col')[aiOptinalMoves[index] - 1]

    }
  }
  setXO(element);
}

