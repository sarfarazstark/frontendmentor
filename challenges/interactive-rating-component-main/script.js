const thankSection = document.querySelector('.thank-box')
const ratingSection = document.querySelector('.rating')

// eslint-disable-next-line no-unused-vars
function thankYou () {
  const radio = document.getElementsByName('rate')

  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      document.getElementById('rated-number').innerHTML = radio[i].value
      ratingSection.classList.add('hidden')
      thankSection.classList.remove('hidden')
    }
  }
}
