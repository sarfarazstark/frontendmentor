/* eslint-disable no-array-constructor */
/* eslint-disable semi */
'use strict'
// let userEx = false;
// const passTest = true;
// if(passTest) userEx = true;
// if(userEx) console.log("its work :D");

// function fruitProcessor(fruitName, fruitQuantity){
//     const juice = `Total juice made of ${fruitName} is ${fruitQuantity * 50}gm`
//     return juice;
// }
// console.log(fruitProcessor("Apple", 5));

// Function Declaration Vs Expression
// Function Declaration (can be call before defined)
// funcOne();
// function funcOne(){
//     console.log("Hello <-");
// }
// Function Expression (cannot call before defined and used as value)
// const calculateAge = function (calculateAge){
//     return 2048 - calculateAge;
// }
// const age = calculateAge(2002);
// console.log(age);

// Arrow Function
// const calcAge = birthyear => 2048 - birthyear;
// const age1 = calcAge(2002);
// console.log(age1);

// function calling function
// function cutFruit (fruit) {
//   return fruit * 4;
// }
// function fruitProcessor (oranges, apples) {
//   const orangesPiece = cutFruit(oranges);
//   const applesPiece = cutFruit(apples);
//   const result = `Total piece of Orange is ${orangesPiece} and Apples is ${applesPiece}`;
//   return result;
// }
// console.log(fruitProcessor(4, 6));

// Re-practise functions Expression
// const /* function Name */funcExp = function (funcExps/* Arguements */) {
// /* function Body */
//   return funcExps + 110;
// }
// const ass = funcExp(30);
// console.log(ass);

// Re-practise function declaration
// const func = fun(19, 'Sarfaraz Stark');
// console.log(func);
// function fun (age, name) {
//   if (age >= 18) {
//     return `Hello ${name}, you are now a adult 🎉`;
//   }
//   return `You have to wait ${18 - age} years to become a adult 🙂`;
// }

// Re-practise Arrow Function
// const functionName = Arguements => {body}
// const arrFunc = (age, name) => {
//   if (age >= 18) {
//     return `Hello ${name}, you are now a adult 🎉`;
//   }
//   return `You have to wait ${18 - age} years to become a adult 🙂`;
// }
// const cll = arrFunc(19, 'Sarfaraz Stark');
// console.log(cll);

// **Coding Challenge #1

// const calcAverage = (st, nd, th) => (st + nd + th) / 3;
// function checkWinner (avgDolphin, avgKoalas) {
//   if (avgDolphin >= avgKoalas * 2) {
//     return `Dolphin win 🏆 (${avgDolphin} vs. ${avgKoalas})`;
//   } else if (avgKoalas >= avgDolphin * 2) {
//     return `Koala win 🏆(${avgKoalas} vs. ${avgDolphin})`;
//   } else {
//     return 'No team wins... 😫';
//   }
// }
// TEST DATA 1
// let scoreDolphin = calcAverage(44, 23, 71);
// let scoreKoala = calcAverage(65, 54, 49);
// console.log(checkWinner(scoreDolphin, scoreKoala));

// TEST DATA 2
// scoreDolphin = calcAverage(85, 54, 71);
// scoreKoala = calcAverage(23, 34, 27);
// console.log(checkWinner(scoreDolphin, scoreKoala));

// Array
const todo = ['Make a roadmap', 'Share smart tricks'];
console.log(todo);
const years = new Array(2002, 2004, 2006, 2008, 2010);
console.log(years);
console.log(todo[0]);
console.log(todo.length)
