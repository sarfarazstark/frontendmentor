const newsletter = document.querySelector("main");
const popUp = document.getElementById("success-pop");
function validate() {
  const error = document.getElementById("error");
  const sentTo = document.getElementById("usermail");
  const userMail = document.getElementById("email");
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (userMail.value.match(mailformat)) {
    newsletter.style.display = "none";
    popUp.style.display = "flex";
    sentTo.innerHTML = userMail.value;

    userMail.style.borderColor = "var(--grey)";
    userMail.style.borderWidth = "1px";
    userMail.style.backgroundColor = "white";
    userMail.style.color = "var(--dark-slate-gray)";
    error.style.display = "none";
  } else if (userMail.value === "") {
    userMail.style.borderColor = "var(--tomato)";
    userMail.style.borderWidth = "2px";
    userMail.style.backgroundColor = "hsla(4, 100%, 67%, 0.518)";
    userMail.style.color = "var(--tomato)";
    error.style.display = "block";
    error.innerHTML = "Email required";
  } else {
    userMail.style.borderColor = "var(--tomato)";
    userMail.style.borderWidth = "2px";
    userMail.style.backgroundColor = "hsla(4, 100%, 67%, 0.518)";
    userMail.style.color = "var(--tomato)";
    error.style.display = "block";
    error.innerHTML = "Valid email required";
  }
}
function closePopUp() {
  document.getElementById("email").value = "";
  popUp.style.display = "none";
  newsletter.style.display = "flex";
}
