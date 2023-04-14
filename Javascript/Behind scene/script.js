/* eslint-disable quotes */
/* eslint-disable semi */
'use strict';

function fun(birthYear) {
  const age = 2023 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millennials = true;
      const firstName = "Stark";
      const str = `Oh, and you're a millenial, ${firstName}`
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      output = "NEW OUTPUT"
    }
    // console.log(str);
    console.log(millennials);
    // console.log(add(9, 2));
    console.log(output);
  }
  printAge();
  return age;
}
const firstName = "Sarfaraz";
console.log(fun(1985));
// console.log(age);
// printAge();

// *Variable environment Hoisting and The TDZ
// Variables
console.log(me);
// console.log(job);
// console.log(year);

var me = "Sarfaraz";
const job = "Student";
const year = "2002";

// Functions
console.log(addDecl(2, 3));
console.log(addArrow);
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
}

var addArrow = (a, b) => a + b;

// Example
console.log(numProd);
if (!numProd) deleteShoppingCart();
var numProd = 10;

function deleteShoppingCart () {
  console.log("All products deleted.");
}

var x = 1;
let y = 2;
const z = 3;
console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
