const nextButtons = document.querySelectorAll("#next");
const prevButtons = document.querySelectorAll("#prev");
const radioInputs = document.querySelectorAll(
  "section div ul li input[type='radio']"
);

for (const next of nextButtons) {
  next.addEventListener("click", (e) => {
    e.preventDefault();

    const section = e.target.parentElement.parentElement;

    const allInputs = section.querySelectorAll("div ul li input");

    console.log(allInputs);

    for (const input of allInputs) {
      switch (input.type) {
        case "text":
          if (input.value === "") {
            input.style.borderColor = "red";
            return;
          } else {
            input.style.borderColor = "var(--light-gray)";
          }
          break;
        case "email":
          const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (input.value === "" || !regex.test(input.value)) {
            input.style.borderColor = "red";
            return;
          } else {
            input.style.borderColor = "var(--light-gray)";
          }
          break;
        case "radio":
          const radioButtons = section.querySelectorAll("div ul li input");
          let isChecked = false;

          for (const radio of radioButtons) {
            if (radio.checked) {
              isChecked = true;
              break;
            }
          }

          if (!isChecked) {
            radioButtons[0].nextElementSibling.style.borderColor = "red";
            return;
          } else {
            radioButtons[0].nextElementSibling.style.outline = "none";
          }
          break;
        case "checkbox":
          const checkBoxes = section.querySelectorAll("input[type='checkbox']");
          let isBoxChecked = false;

          for (const box of checkBoxes) {
            if (box.checked) {
              isBoxChecked = true;
              break;
            }
          }

          if (!isBoxChecked) {
            checkBoxes[0].style.outline = "1px solid red";
            return;
          } else {
            checkBoxes[0].style.outline = "none";
          }
          break;
        case "tel":
          const regexTel =
            /^\+\d{1,4}[\s\-]?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
          if (input.value === "" || !regexTel.test(input.value)) {
            input.style.borderColor = "red";
            return;
          } else {
            input.style.borderColor = "var(--light-gray)";
          }
          break;
        default:
          break;
      }
    }

    const nextSection = section.nextElementSibling;

    section.classList.remove("show");
    nextSection.classList.add("show");
  });
}

prevButtons.forEach((prev) => {
  prev.addEventListener("click", (e) => {
    e.preventDefault();

    const section = e.target.parentElement.parentElement;
    const previous = section.previousElementSibling;

    section.classList.remove("show");
    previous.classList.add("show");
  });
});

radioInputs.forEach((radio) => {
  radio.addEventListener("click", (e) => {
    const radioButtons = e.target.parentElement.parentElement.querySelectorAll(
      "input[type='radio']"
    );

    console.log(radioButtons);

    for (const button of radioButtons) {
      button.nextElementSibling.style.borderColor = "none";
    }

    e.target.nextElementSibling.style.borderColor = "none";
  });
});
