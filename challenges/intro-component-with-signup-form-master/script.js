/* eslint-disable quotes */
/* eslint-disable semi */
'use strict';
const textInput = document.querySelectorAll(".input");
const btn = document.querySelector("#submit");
const errorImg = document.querySelectorAll(".error-img");
const errorTxt = document.querySelectorAll(".error-msg");

// Email validation variables
const regex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const emailErrorTxt = document.querySelector(".email-error");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  emailErrorTxt.style.display = "block";
  const size = textInput.length;

  for (let i = 0; i < size; i++) {
    const txtValue = textInput[i];
    const errorvalue = errorTxt[i];
    const errorImgCheck = errorImg[i];

    if (txtValue.value === "") {
      txtValue.style.borderColor = "var(--red)";
      errorImgCheck.style.display = "block";
      errorvalue.innerHTML = `${txtValue.name} can't be blank`;
    }

    if (txtValue.value !== "") {
      if (txtValue.type === "password") {
        if (txtValue.value.length < 8) {
          errorImgCheck.style.display = "block";
          errorvalue.innerHTML = '8 characters minimum';
        }
      } else if (txtValue.type === "email") {
        if (!(txtValue.value.match(regex))) {
          txtValue.style.borderColor = "var(--red)";
          errorImgCheck.style.display = "block";
          emailErrorTxt.style.display = "block";
          emailErrorTxt.innerHTML = "Please provide a valid email";
        }
      } else {
        errorvalue.style.display = "none";
        errorImgCheck.style.display = "none";
        txtValue.style.borderColor = "var(--gray-blue)";
      }
    }
  }
  // clean code
});
