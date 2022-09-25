/* eslint-disable no-multiple-empty-lines */
/* eslint semi: [2] */
'use strict';
/*
const diceImg = ['dice-1.png', 'dice-2.png', 'dice-3.png', 'dice-4.png', 'dice-5.png', 'dice-6.png'];
let score = 0;
const btnDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore = document.querySelector('.current-score');

btnDice.addEventListener('click', function () {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  console.log(randomNumber);
  score += randomNumber;
  currentScore.textContent = score;
  btnHold.addEventListener('click', function () {
    score0El.textContent = score;
    currentScore.textContent = 0;
  });
  if (randomNumber === 1) {
    currentScore.textContent = 0;
  };
}); */
// Adding name
// document.getElementById('name--0').textContent = prompt('Please Enter First Player Name');
// document.getElementById('name--1').textContent = prompt('Please Second First Player Name');

// selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting condition
const score = [0, 0];
score1El.textContent = 0;
score0El.textContent = 0;
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // :1 Generating a randon number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // :2 Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // :3 Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // Show current score
    } else {
      switchPlayer();
    }
  }
});

// Hold the current score so you dont loose score again
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer]; // show current player main score
    // check if players score is >= 100
    if (score[activePlayer] >= 20) {
      playing = false;
      // finish game
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`score--${activePlayer}`).textContent =
        score[activePlayer];
      document.querySelector(`#name--${activePlayer}`).textContent =
        activePlayer === 0 ? 'Player 1 🎉' : 'Player 2 🎉';
    } else {
      switchPlayer();
    }
  }
});

// Reset the game
btnNew.addEventListener('click', function () {
  score[0] = 0;
  score[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  score1El.textContent = 0;
  score0El.textContent = 0;
  playing = true;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document.querySelector(`#name--${activePlayer}`).textContent =
    activePlayer === 0 ? 'Player 1' : 'Player 2';
});
