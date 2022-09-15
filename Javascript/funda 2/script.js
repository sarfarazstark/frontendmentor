/* eslint-disable dot-notation */
/* eslint-disable quotes */
/* eslint-disable no-array-constructor */
/* eslint-disable semi */
"use strict";
// import prompt from 'prompt';
// let userEx = false;
// const passTest = true;
// if(passTest) userEx = true;
// if(userEx) console.log("its work :D");

function fruitProcessor (fruitName, fruitQuantity) {
  const juice = `Total juice made of ${fruitName} is ${fruitQuantity * 50}gm`
  return juice;
}
console.log(fruitProcessor("Apple", 5));

// Function Declaration Vs Expression
// Function Declaration (can be call before defined)
funcOne();
function funcOne () {
  console.log("Hello <-");
}
// Function Expression (cannot call before defined and used as value)
const calculateAge = function (calculateAge) {
  return 2048 - calculateAge;
}
const age = calculateAge(2002);
console.log(age);

// Arrow Function
const arrCalcAge = birthyear => 2048 - birthyear;
const age1 = arrCalcAge(2002);
console.log(age1);

// function calling function
function cutFruit (fruit) {
  return fruit * 4;
}
function fcfFruitProcessor (oranges, apples) {
  const orangesPiece = cutFruit(oranges);
  const applesPiece = cutFruit(apples);
  const result = `Total piece of Orange is ${orangesPiece} and Apples is ${applesPiece}`;
  return result;
}
console.log(fcfFruitProcessor(4, 6));

// Re-practise functions Expression
const /* function Name */funcExp = function (funcExps/* Arguements */) {
/* function Body */
  return funcExps + 110;
}
const ass = funcExp(30);
console.log(ass);

// Re-practise function declaration
const func = fun(19, 'Sarfaraz Stark');
console.log(func);
function fun (age, name) {
  if (age >= 18) {
    return `Hello ${name}, you are now a adult 🎉`;
  }
  return `You have to wait ${18 - age} years to become a adult 🙂`;
}

// Re-practise Arrow Function
// const functionName = Arguements => { body }
const arrFunc = (age, name) => {
  if (age >= 18) {
    return `Hello ${name}, you are now a adult 🎉`;
  }
  return `You have to wait ${18 - age} years to become a adult 🙂`;
}
const cll = arrFunc(19, 'Sarfaraz Stark');
console.log(cll);

// *#Coding Challenge #1 Check Winner

const calcAverage = (st, nd, th) => (st + nd + th) / 3;
function checkWinner (avgDolphin, avgKoalas) {
  if (avgDolphin >= avgKoalas * 2) {
    return `Dolphin win 🏆 (${avgDolphin} vs. ${avgKoalas})`;
  } else if (avgKoalas >= avgDolphin * 2) {
    return `Koala win 🏆(${avgKoalas} vs. ${avgDolphin})`;
  } else {
    return 'No team wins... 😫';
  }
}
// TEST DATA 1
let scoreDolphin = calcAverage(44, 23, 71);
let scoreKoala = calcAverage(65, 54, 49);
console.log(checkWinner(scoreDolphin, scoreKoala));

// TEST DATA 2
scoreDolphin = calcAverage(85, 54, 71);
scoreKoala = calcAverage(23, 34, 27);
console.log(checkWinner(scoreDolphin, scoreKoala));

// #Array
const myName = "Sarfaraz";
const todo = ["Make a roadmap", "Share smart tricks", 2000];
console.log(todo);
const year = new Array(todo, 2004, 2006, 2008, 2010, myName);
console.log(year);
console.log(todo[0]);
console.log(todo[todo.length - 1]);
//* Array Excercise
const calcAge = function (birthYear) {
  return 2022 - birthYear;
};
const years = [1996, 1998, 2000, 2002, 2004, 2006];
const bYears = [];
for (let i = 0; i < years.length; i++) {
  bYears[i] = calcAge(years[i]);
}
console.log(bYears);

// #Array Method
// *Array push() method  add new element to the end of the array and return the length of the array
years.push(2037);
console.log(years);
// *Array unshift() method add new element to the start of the array and it also return the length of the array
years.unshift(1994);
console.log(years);
// *Array pop() method remove last element from the array and return the removed element
let remElement = years.pop();
console.log(years, remElement);
// *Array shift() method remove first element from the array and it also return the removed element
remElement = years.shift();
console.log(years, remElement);
// *Know the index of an element
console.log(years.indexOf(2002));
console.log(years.indexOf(2012));
// *Know if element is available in the array or not
console.log(years.includes(2002));
console.log(years.includes(2012));
if (years.includes(2002)) {
  console.log("Hello Sarfaraz your birthdate is available in the array");
}
// #Coding Challenge #2 Tip Calculator
const calcTip = function (bill) {
  return bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
};
const bills = [125, 555, 44];
const tips = [];
const total = [];
for (let i = 0; i < bills.length; i++) {
  tips[i] = calcTip(bills[i]);
  total[i] = bills[i] + tips[i];
}
console.log(total);

// #Object
const objProfile = {
  firstName: 'Sarfaraz',
  lastName: 'Stark',
  age: 2022 - 2002,
  job: 'Student',
  friends: ['Farhad', 'Salman', 'Rehan', 'Danish', 'Vicky']
}
//* Retrieve elements from object
console.log(objProfile);
console.log(objProfile.firstName);
console.log(objProfile['lastName']);
const nameKey = 'Name';
console.log(objProfile['first' + nameKey])
// console.log(objProfile.'first' + nameKey);
// eslint-disable-next-line no-undef
const interestedIn = 'job';
if (objProfile[interestedIn]) {
  console.log(objProfile[interestedIn]);
} else {
  console.error(`The property ${interestedIn} didn't exist :( \n  Choose between firstName, lastName, age, job, and friends`);
}
//* Add element to the objects
objProfile.location = 'Kolkata, India';
objProfile['instagram'] = '@sarfarazstark';
console.log(objProfile);
// :Mini coding challenge
const logs = `${objProfile.firstName} has ${objProfile.friends.length} friends, and his best friend is called ${objProfile.friends[0]}`;
console.log(logs);

// #Object Method
const profile = {
  firstName: 'Sarfaraz',
  lastName: 'Stark',
  birthYear: 2002,
  job: 'Student',
  friends: ['Farhad', 'Salman', 'Rehan', 'Danish', 'Vicky'],
  hasDriverLicense: true,
  // calcAge: function (birthYear) {
  //   return 2022 - birthYear;
  // }

  // calcAge: function () {
  //   // console.log(this);
  //   return 2022 - this.birthYear;
  // }

  calcAge: function () {
    this.age = 2022 - this.birthYear;
    return this.age;
  },
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-years old ${this.job} and he has ${this.hasDriverLicense ? "a" : "no"} driver's license.`;
  }
}
// console.log(profile);
console.log(profile.calcAge());
console.log(profile.age);
console.log(profile.age);
console.log(profile.age);
// console.log(profile.calcAge(2007));
// console.log(profile['calcAge'](profile.birthYear));

console.log(profile.getSummary());
// *Coding Challenge #3 BMI Calculator
const mark = {
  fullName: 'Mark Miller',
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
    return this.bmi;
  }
}
const john = {
  fullName: 'John Smith',
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = this.mass / (this.height * this.height);
    return this.bmi;
  }
}
mark.calcBMI();
john.calcBMI();
console.log(mark.bmi, john.bmi);
if (mark.bmi > john.bmi) {
  console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})`)
} else {
  console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})`)
}

// #For loop keep running while condition is 'true'
for (let i = 1; i <= 10; i++) {
  console.log(`Lifting weigth repetition ${i} 🏋️‍♂️`)
}

// :For loop in array
const starkArray = [
  'Sarfaraz',
  'Stark',
  2022 - 2002,
  'Student',
  ['Farhad', 'Salman', 'Danish']
]
const types = [];

for (let i = 0; i < starkArray.length; i++) {
  console.log(starkArray[i], typeof starkArray[i]);
  // types[i] = typeof starkArray[i];
  types.push(typeof starkArray[i]);
}
console.log(types);
const birthYear = [1994, 1996, 1998, 2000, 2002, 2006];
const age2 = [];
for (let i = 0; i < birthYear.length; i++) {
  age2.push(2022 - birthYear[i]);
}
// : Continue
console.log(age);
for (let i = 0; i < starkArray.length; i++) {
  if (typeof starkArray[i] !== 'string') continue;
  console.log(starkArray[i], typeof starkArray[i]);
}
// : Break
console.log('--- Break ---');
for (let i = 0; i < starkArray.length; i++) {
  if (starkArray[i] === 20) break;
  console.log(starkArray[i], typeof starkArray[i]);
}

const stark = [
  'Sarfaraz',
  'Stark',
  2022 - 2002,
  'Student',
  ['Farhad', 'Salman', 'Danish']
]
for (let i = stark.length - 1; i >= 0; i--) {
  console.log(i, stark[i]);
}

for (let excercise = 1; excercise <= 3; excercise++) {
  console.log(`---- Starting Exercise ${excercise} ----`);
  for (let rep = 1; rep <= 5; rep++) {
    console.log(`Lifting weigth repetition ${rep} 🏋️‍♂️`);
  }
}

// #While loop
let i = 0;
while (i <= 10) {
  // console.log(`Lifting weigth repetition ${i} 🏋️‍♂️`);
  i++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);
while (dice !== 6) {
  console.log(`You rolled ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) {
    console.log('Loop is about to end...');
  }
}
// #Coding Challenge #4
const bills2 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips2 = [];
const totals = [];
const calcTip2 = function (bill) {
  return bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
};
for (let i = 0; i < bills2.length; i++) {
  tips2.push(calcTip2(bills2[i]));
  totals.push(bills2[i] + tips2[i]);
}
console.log(bills2);
console.log(tips2);
console.log(totals);
const calcAverage2 = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    // sum = sum + arr[i];
    sum += arr[i];
  }
  return sum / arr.length;
}
console.log(calcAverage2(totals));
console.log(calcAverage2(tips));
