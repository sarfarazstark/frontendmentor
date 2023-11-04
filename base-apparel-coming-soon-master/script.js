/* eslint-disable semi */
const regex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const text = document.querySelector('.msg');
const btn = document.querySelector('.button');
const errorImg = document.querySelector('.error-img');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  text.style.display = 'block';
  if (input.value === '') {
    text.style.color = 'var(--soft-red)';
    form.style.borderColor = 'var(--soft-red)';
    form.style.borderWidth = '2px';
    errorImg.style.display = 'block';
    form.classList.add('error');
    text.innerHTML = "Email can't be blank";
  } else if (!input.value.match(regex)) {
    form.classList.add('error');
    errorImg.style.display = 'block';
    text.style.color = 'var(--soft-red)';
    text.innerHTML = 'Please provide a valid email';
  } else {
    text.style.color = '#4FC455';
    text.innerHTML = 'Thank You for subscribing';
    input.value = '';
    errorImg.style.display = 'none';
    form.style.borderColor = 'var(--d-red)';
    form.style.borderWidth = '1px';
  }
});
