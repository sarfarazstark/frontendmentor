document.querySelector('#number').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
});
const mm = document.querySelector('#mm');
const yy = document.querySelector('#yy');
const cvc = document.querySelector('#cvc');

const defaultValue = {
  name: 'Jane Appleseed',
  number: '0000 0000 0000 0000',
  mm: '00',
  yy: '00',
  cvc: '000'
}


const preventText = function (inputs) {
  inputs.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  })
}


document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', function () {
    document.querySelector(`.${this.id}`).innerHTML = this.value;
  })
})

let allFilled = true;
document.querySelector('button').addEventListener('click', function () {
  const thanksAlert = document.querySelector('.thanks-alert');
  if (thanksAlert.style.display === 'flex') {
    thanksAlert.style.display = 'none';
    document.querySelectorAll('.fields').forEach((fieldDiv) => {
      fieldDiv.style.display = 'block';
    });
    return;
  }

  document.querySelectorAll('input').forEach((inputs) => {
    console.log(inputs);
    const fieldDiv = inputs.parentElement;
    let error = fieldDiv.querySelector('span');
    if (!error) {
      error = fieldDiv.appendChild(document.createElement('span'));
    }
    if (inputs.id === 'mm' && inputs.value.trim() === '') {
      inputs.style.borderColor = 'var(--red-input-error)';
      allFilled = false;
      return false;
    } else if (inputs.value.trim() === '') {
      document.querySelector(`.${inputs.id}`).innerHTML = defaultValue[inputs.id];
      inputs.style.borderColor = 'var(--red-input-error)';
      error.style.display = 'inline';
      error.innerHTML = 'This field is required';
      allFilled = false;
    } else {
      inputs.style.borderColor = 'var(--light-grayish-violet)';
      error.remove();
    }
  })

  if (allFilled) {
    document.querySelectorAll('.fields').forEach((fieldDiv) => {
      fieldDiv.style.display = 'none';
    });
    thanksAlert.style.display = 'flex';
    allFilled = false;

    // Clear input fields
    document.querySelectorAll('input').forEach((input) => {
      input.value = '';
    });
    // Reset aside values
    Object.keys(defaultValue).forEach((key) => {
      document.querySelector(`.${key}`).innerHTML = defaultValue[key];
    });
  }
})


// document.querySelectorAll('input').forEach((input) => {
//   input.addEventListener('input', function () {
//     if (this.value.trim() === '') {
//       document.querySelector(`.${this.id}`).innerHTML = defaultValue[this.id];
//     }
//   })
// })


preventText(mm);
preventText(yy);
preventText(cvc);