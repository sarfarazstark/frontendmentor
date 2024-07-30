const customInputCheck = function (e) {
	const input = e.querySelector('input[type="radio"]');
	input.checked = true;
	console.log(e.querySelector('input[type="radio"]'));
	e.querySelector('input[type="number"]').addEventListener(
		'input',
		function () {
			input.checked = e.querySelector('input[type="number"]').value;
		}
	);
};

// -------------------Input--------------------
const billAmount = document.querySelector('input[name="bill"]');
const tipLabel = document.querySelector('.tip-label');
const people = document.querySelector('input[name="people"]');
// -------------------Output--------------------
const outputTip = document.querySelector('#tip-output');
const perPersonOutput = document.querySelector('#per-person-output');

// calculating tip function
const calculateTipAndAmount = function (bill, tip, people) {
	// precise math ceil
	const tipAmount = parseFloat((bill * tip) / people);
	const perPerson = bill / people + tipAmount;

	return [tipAmount.toFixed(2), perPerson.toFixed(2)];
};

tipLabel.addEventListener('click', function (e) {
	if (billAmount.value === '') {
		alert('Please enter the bill amount');
		e.target.closest('.hidden').checked = false;
	}
});

// //  Returning the tip amount
// const getTip = function (tipNode) {
// 	let selectedValue = null;
// 	tipNode.forEach((element) => {
// 		if (element.checked) {
// 			selectedValue = element.dataset.value;
// 		}
// 	});

// 	if (selectedValue) {
// 		return selectedValue;
// 	}
// 	throw new Error('Please select a tip');
// };

// people.addEventListener('keydown', function (event) {
// 	if (event.key == 'Enter' && parseInt(event.target.value) > 0) {
// 		try {
// 			console.log('Enter key pressed');
// 			const tipAmount = getTip(tip);
// 		} catch (e) {
// 			alert(e);
// 		}
// 	}
// });
