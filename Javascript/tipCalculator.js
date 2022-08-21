const data1 = 275;
const data2 = 40;
const data3 = 430;
// Bill For Data 1
const tip = data1 <= 300 && data1 >= 50 ? data1 * 0.15 :  data1 * 0.2;
console.log(`The bill was ${data1}, the tip was ${tip}, and the total value ${data1 + tip}.`);
// Bill For Data 2
const tip2 = data2 <= 300 && data2 >= 50 ? data2 * 0.15 :  data2 * 0.2;
console.log(`The bill was ${data2}, the tip was ${tip2}, and the total value ${data2 + tip2}.`);
// Bill For Data 3
const tip3 = data3 <= 300 && data3 >= 50 ? data3 * 0.15 :  data3 * 0.2;
console.log(`The bill was ${data3}, the tip was ${tip3}, and the total value ${data3 + tip3}.`);