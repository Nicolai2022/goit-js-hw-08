import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);

let formData = {};

function onFormData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmitForm(e) {
  console.log(formData);
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(formData);
}

(function dataFromLocalStorage() {

  try {
   const load = localStorage.getItem('feedback-form-state');
   if (!load) return
   formData = JSON.parse(load);
   const formKeys = Object.entries(formData);
   formKeys.forEach(([name, value]) => {
   form[name].value = value;
    });
  } catch (error) {
   console.error('Get state error: ', error.message);
  }
  
  })(); 


