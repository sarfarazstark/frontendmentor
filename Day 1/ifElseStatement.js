const currentAge = 16 ;
const legalAge = 18;
const name = "Sarfaraz Strark";
// if (isLegal) {
//     console.log("Sarfaraz Stark is old enough for driving license 🚗");
// };
if (legalAge < currentAge) {
    console.log(`${name} is old enough for driving license 🚗`);
} else if (17 == currentAge) {
    console.log(`${name} is not old for driver license for 1 year 💞`);
} else {
    console.log(`${name} is not old for driver license for ${(legalAge - currentAge)} year 💞`);
};