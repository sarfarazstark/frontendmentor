/* eslint-disable semi */
/* eslint-disable eqeqeq */

/// /////////////////////////////////
// Linking a JavaScript File
const js = 'amazing';
console.log(40 + 8 + 23 - 10, js);

/// /////////////////////////////////
// Values and Variables
console.log('Jonas');
console.log(23);

const firstName1 = 'Matilda';

console.log(firstName1);
console.log(firstName1);
console.log(firstName1);

// Variable name conventions
// const jonas_matilda = 'JM';
// const $function = 27;

// const person = 'jonas';
// const PI = 3.1415;

// const myFirstJob = 'Coder';
// const myCurrentJob = 'Teacher';

// const job1 = 'programmer';
// const job2 = 'teacher';

// console.log(myFirstJob);

/// /////////////////////////////////
// Data Types
let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof 'Jonas');

javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);

let year1 = '';
console.log(year1);
console.log(typeof year1);
year1 = 1991;
console.log(typeof year1);
console.log(typeof null);

/// /////////////////////////////////
// let, const and var
// let age0 = 30;
// age0 = 31;

// const birthYear = 1991;
// birthYear = 1990;
// const job;

// let job = 'programmer';
// job = 'teacher';

// lastName = 'Schmedtmann';
// console.log(lastName);

/// /////////////////////////////////
// Basic Operators
// Math operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1
x--;
x--;
console.log(x);

// Comparison operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;
console.log(isFullAge);
console.log(now - 1991 > now - 2018);

/// /////////////////////////////////
// Operator Precedence
const now0 = 2037;
const ageJonas0 = now0 - 1991;
const ageSarah0 = now0 - 2018;

console.log(now0 - 1991 > now0 - 2018);

let y1;
const x1 = y1 = 25 - 10 - 5; // x1 = y1 = 10, x1 = 10
console.log(x1, y1);

const averageAge = (ageJonas0 + ageSarah0) / 2;
console.log(ageJonas0, ageSarah0, averageAge);

/// /////////////////////////////////
// Coding Challenge #1

// Mark and John are trying to compare their BMI(Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height).(mass in kg and height in meter).

// 1. Store Mark 's and John'
// s mass and height in variables
// 2. Calculate both their BMIs using the formula(you can even implement both versions)
// 3. Create a boolean variable 'markHigherBMI'
// containing information about whether Mark has a higher BMI than John.

// TEST DATA 1: Marks weights 78 kg and is 1.69 m tall.John weights 92 kg and is 1.95 m tall.
// TEST DATA 2: Marks weights 95 kg and is 1.88 m tall.John weights 85 kg and is 1.76 m tall.

// GOOD LUCK😀

// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

const massMark1 = 95;
const heightMark1 = 1.88;
const massJohn1 = 85;
const heightJohn1 = 1.76;

const BMIMark1 = massMark1 / heightMark1 ** 2;
const BMIJohn1 = massJohn1 / (heightJohn1 * heightJohn1);
const markHigherBMI1 = BMIMark1 > BMIJohn1;

console.log(BMIMark1, BMIJohn1, markHigherBMI1);

/// /////////////////////////////////
// Strings and Template Literals
const firstName0 = 'Jonas';
const job3 = 'teacher';
const birthYear0 = 1991;
const year = 2037;

const jonas =
  "I'm " + firstName0 + ', a ' + (year - birthYear0) + ' year old ' + job3 + '!';
console.log(jonas);

const jonasNew = `I'm ${firstName0}, a ${year - birthYear0} year old ${job3}!`;
console.log(jonasNew);

console.log('Just a regular string...');

console.log('String with \n multiple \n lines');

console.log(`String
multiple
lines`);

/// /////////////////////////////////
// Taking Decisions: if / else Statements
const age = 15;

if (age >= 18) {
  console.log('Sarah can start driving license 🚗');
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear1 = 2012;

let century;
if (birthYear1 <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

/// /////////////////////////////////
// Coding Challenge #2

// Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

// 1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"

// 2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

// HINT: Use an if/else statement 😉

// GOOD LUCK 😀

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

// const massMark = 95;
// const heightMark = 1.88;
// const massJohn = 85;
// const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

if (BMIMark > BMIJohn) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
} else {
  console.log(`John's BMI (${BMIJohn}) is higher than Marks's (${BMIMark})!`);
}

/// /////////////////////////////////
// Type Conversion and Coercion

// type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number('Jonas'));
console.log(typeof NaN);

console.log(String(23), 23);

// type coercion
console.log('I am ' + 23 + ' years old');
console.log('23' - '10' - 3);
console.log('23' / '2');

let n = '1' + 1; // '11'
n = n - 1;
console.log(n);

/// /////////////////////////////////
// Truthy and Falsy Values

// 5 falsy values: 0, '', undefined, null, NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(''));

const money = 100;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log('You should get a job!');
}

const height = 0;
if (height) {
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED');
}

/// /////////////////////////////////
// Equality Operators: == vs. ===
const age1 = '18';
if (age1 === 18) console.log('You just became an adult :D (strict)');

if (age1 == 18) console.log('You just became an adult :D (loose)');

const favourite = 19;
console.log(favourite);
console.log(typeof favourite);

if (favourite === 23) {
  // 22 === 23 -> FALSE
  console.log('Cool! 23 is an amzaing number!');
} else if (favourite === 7) {
  console.log('7 is also a cool number');
} else if (favourite === 9) {
  console.log('9 is also a cool number');
} else {
  console.log('Number is not 23 or 7 or 9');
}

if (favourite !== 23) console.log('Why not 23?');

const a = 1;
const b = 1;
const c = 1;
if (a & c & b) {
  console.log('Sarfaraz');
}

const hasDriversLicense = true;
const hasGoodVision = true;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasGoodVision);

const shouldDrive = hasDriversLicense && hasGoodVision;

if (shouldDrive) {
  console.log('Sarah is able to drive');
} else {
  console.log('Someone else should drive');
}

const isTired = false;
console.log(hasDriversLicense || hasGoodVision || isTired);
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log('Sarah is able to drive');
} else {
  console.log('Someone else should drive');
}

const day = 'friday';

switch (day) {
  case 'monday': {
    console.log('Its your work day so no netflix 😁');
    console.log('Check you notion to do ✅');
    break;
  }
  case 'tuesday': {
    console.log('Prepare for online meetings');
    break;
  }
  case 'wednesday':
  case 'thursday': {
    console.log('Project works 📑');
    break;
  }
  case 'friday': {
    console.log('Works hard and prepare for netflix 😍');
    break;
  }
  case 'saturday':
  case 'sunday': {
    console.log('Netflix and chill 🥳');
    break;
  }
  default: {
    console.log('Invalid day');
    break;
  }
}

if (day === 'monday') {
  console.log('Its your work day so no netflix 🙁');
  console.log('Check you notion to do ✅');
} else if (day === 'tuesday') {
  console.log('Prepare for online meetings');
} else if (day === 'wednesday' || day === 'thursday') {
  console.log('Project works 📑');
} else if (day === 'friday') {
  console.log('Works hard and prepare for netflix 😍');
} else if (day === 'saturday' || day === 'sunday') {
  console.log('Netflix and chill 🥳');
} else {
  console.log('Invalid day');
}
const word = 'SARFARAZ';
function frontDoorPassword (param) {
  const firstWordCapital = param[0].toUpperCase();
  let lowerCase;
  for (let i = 1; i < param.length; i++) {
    lowerCase = param[i].toLowerCase();
  }
  return firstWordCapital + lowerCase;
}
const pass = frontDoorPassword(word);
console.log(pass);
/* TERNARY OPERATOR */

const age2 = 13;
const isAdult =
  age2 >= 18
    ? 'Iam Old Enough to drink wine 🍷'
    : 'Iam not old enough to drink wine 🍷 so i will drink water 💧'
    ;
console.log(isAdult);
