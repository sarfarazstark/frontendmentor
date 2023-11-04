/* eslint-disable no-unused-vars */
/* eslint-disable semi */
'use strict';

function calculateAge () {
  // Variable declaration
  // Getting the values from the input fields for error handling
  const error = document.querySelectorAll('.error');
  const label = document.querySelectorAll('.label');

  // Getting the values from the input fields
  const birthDate = document.querySelectorAll('.date');
  const birthDateUsingBackticks = `${birthDate[2].value}-${birthDate[1].value}-${birthDate[0].value}`;

  // Creating a new date object
  const birthDateObject = new Date(birthDateUsingBackticks);

  // Getting the output elements
  const outputElements = document.querySelectorAll('.result');

  // Function declaration for changing the color of the input field and showing the error message
  function changeElementColor (n, msg) {
    error[n].innerHTML = msg;
    error[n].style.visibility = 'visible';
    label[n].style.color = '#FF0000';
    birthDate[n].style.borderColor = '#FF0000';
  }

  // Function declaration for resetting the color of the input field and hiding the error message
  function reset (n) {
    error[n].style.visibility = 'hidden';
    label[n].style.color = 'var(--smoke-gray)';
    birthDate[n].style.borderColor = 'var(--light-gray)';
  }
  // reset the output elements
  function resetOutput () {
    outputElements[0].innerHTML = '- -';
    outputElements[1].innerHTML = '- -';
    outputElements[2].innerHTML = '- -';
  }

  // Getting the current date
  const today = new Date();
  // Checking if element is empty
  if (birthDate[0].value === '') {
    changeElementColor(0, 'This field is required');
    resetOutput();
    if (birthDate[1].value === '') {
      changeElementColor(1, 'This field is required');
      resetOutput();
    }
    if (birthDate[2].value === '') {
      changeElementColor(2, 'This field is required');
      resetOutput();
    }
    return 0;
  } else {
    reset(0);
    reset(1);
    reset(2);
  }

  const inputDate = new Date(birthDate[2].value, birthDate[1].value - 1, birthDate[0].value);
  // Validating the date input
  if (birthDate[2].value >= today.getFullYear()) {
    changeElementColor(2, 'Must be in the past');
    resetOutput();
    if (birthDate[1].value > 12) {
      changeElementColor(1, 'Must be a valid month');
      resetOutput();
    }
    if (birthDate[0].value > 31) {
      changeElementColor(0, 'Must be a valid day');
      resetOutput();
    }
    return 0;
  } else if (birthDate[0].value > 31) {
    changeElementColor(0, 'Must be a valid day');
    resetOutput();
  } else if (birthDate[1].value > 12) {
    changeElementColor(1, 'Must be a valid month');
    resetOutput();
  } else if (birthDate[1].value !== (inputDate.getMonth() + 1).toString()) {
    // error message
    error[0].innerHTML = 'Must be a valid date';
    error[0].style.visibility = 'visible';

    // first element
    label[0].style.color = '#FF0000';
    birthDate[0].style.borderColor = '#FF0000';

    // second element
    label[1].style.color = '#FF0000';
    birthDate[1].style.borderColor = '#FF0000';

    // third element
    label[2].style.color = '#FF0000';
    birthDate[2].style.borderColor = '#FF0000';
    resetOutput();
    return 0;
  } else {
    reset(0);
    reset(1);
    reset(2);
  }

  // Calculate the difference between the two dates in milliseconds
  const diffInMs = today.getTime() - birthDateObject.getTime();

  // Convert the difference to days
  let days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Calculate the years and months
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);

  // Calculate the remaining days
  days = days - (years * 365) - (months * 30);

  // Showing the result using DOM manipulation
  outputElements[2].innerHTML = days;
  outputElements[1].innerHTML = months;
  outputElements[0].innerHTML = years;
}
