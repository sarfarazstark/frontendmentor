/* eslint-disable no-unused-vars */
/* eslint-disable semi */

function calculate () {
  const val1 = document.querySelector('.val-1').value;
  const val2 = document.querySelector('.val-2').value;
  const val3 = document.querySelector('.val-3').value;
  const val4 = document.querySelector('.val-4').value;
  const result = document.querySelector('#result');
  const scale = document.querySelector('.scale');
  const higherThan = document.querySelector('.higher-than');

  const total = parseInt(val1) + parseInt(val2) + parseInt(val3) + parseInt(val4);
  const totalMarks = total / 400 * 100;
  console.log(totalMarks);
  result.innerHTML = Math.floor(totalMarks);

  if (totalMarks > 90) {
    scale.innerHTML = 'outstanding';
    higherThan.innerHTML = 'higher than 90%';
  } else if (totalMarks > 80) {
    scale.innerHTML = 'excellent';
    higherThan.innerHTML = 'higher than 80%';
  } else if (totalMarks > 70) {
    scale.innerHTML = 'great';
    higherThan.innerHTML = 'higher than 70%';
  } else if (totalMarks > 60) {
    scale.innerHTML = 'good';
    higherThan.innerHTML = 'higher than 60%';
  } else if (totalMarks > 50) {
    scale.innerHTML = 'passing';
    higherThan.innerHTML = 'higher than 50%';
  } else {
    scale.innerHTML = 'poor';
    higherThan.innerHTML = 'lower than 20%';
  }
}

// 90 100 - outstanding
// 80 90 - excellent
// 70 80 - great
// 60 70 - good
// 50 60 - passing
// 40 50 - poor
