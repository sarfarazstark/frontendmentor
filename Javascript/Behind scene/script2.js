/* eslint-disable semi */
'use strict';
// console.log(this);

const calcAge = function (birthYear) {
  console.log(2023 - birthYear);
  // console.log(this);
}
calcAge(2002);

const calcAgeArrow = birthYear => {
  console.log(2023 - birthYear);
  // console.log(this);
}

calcAgeArrow(2001);
const sarfaraz = {
  year: 2002,
  job: 'student',
  calcAge: function () {
    console.log(this);
    console.log(2023 - this.year);
  }
}
sarfaraz.calcAge();
const iqra = {
  year: 2004
}
iqra.calcAge = sarfaraz.calcAge;
iqra.calcAge();
