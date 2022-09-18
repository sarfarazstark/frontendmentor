/* eslint-disable no-multiple-empty-lines */
/* eslint-disable semi */
'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;

document.querySelector('.guess').value = 20;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
// document.querySelector('.number').textContent = secretNumber;


document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // document.querySelector('.message').textContent = '🎉 Correct Number';
  console.log(guess, typeof guess);


  // when there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '❌No number!';
    // when player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    // checking if current score is higher than preveous highscore
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // when player input higher number than secretNumber
  } else if (guess !== secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      score--;
      document.querySelector('.score').textContent = score;
      // if score is 0
    } else {
      document.querySelector('.message').textContent = '💥 You lose the game!'
      document.querySelector('.score').textContent = 0;
    }
  }
  // } else if (guess > secretNumber) {
  //   // check if score is above 1
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📈 Too high!'
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //     // if score is 0
  //   } else {
  //     document.querySelector('.message').textContent = '💥 You lose the game!'
  //     document.querySelector('.score').textContent = 0;
  //   }


  //   // when player input lower number than secretNumber
  // } else if (guess < secretNumber) {
  //   // check if score is above 1
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 Too low!'
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //     // if score is 0
  //   } else {
  //     document.querySelector('.message').textContent = '💥 You lose the game!'
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

// Play again implemention
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  document.querySelector('.score').textContent = score;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
})
