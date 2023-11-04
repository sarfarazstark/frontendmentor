document.querySelector('#number').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
});
const date = document.querySelectorAll('#date');
const cvc = document.querySelector('#cvc');

const preventText = function (input) {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  })
}

let dateArr = [];
document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', function(){
      document.querySelector(`.${this.id}`).innerHTML = this.value;
  })
})
console.log(dateArr);
preventText(date[0]);
preventText(date[1]);
preventText(cvc);