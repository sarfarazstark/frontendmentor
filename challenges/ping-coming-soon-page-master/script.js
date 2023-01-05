/* eslint-disable no-useless-escape */
const email = document.getElementById('email')
const btn = document.getElementById('submit')
const error = document.querySelector('.error')

btn.addEventListener('click', (n) => {
  n.preventDefault()
  const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!(reg.test(email.value))) {
    error.style.display = 'block'
    email.style.borderColor = 'var(--light-red)'
    error.innerHTML = 'Please provide a valid email address'
  } else {
    email.style.borderColor = 'var(--pale-blue)'
    error.innerHTML = ''
    email.value = ''
    error.style.display = 'none'
  }
})
