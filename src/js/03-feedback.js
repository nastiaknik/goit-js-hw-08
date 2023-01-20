// 1) Відстежуй на формі подію input, і записуй у локальне сховище об'єкт з полями
// email і message, у яких зберігай поточні знач полів форми.
// 2) Нехай ключем для сховища буде рядок "feedback-form-state".
// 3) Під час завант стори перевіряй стан сховища, і якщо там є збережені дані,
//  заповнюй ними поля форми або порожні.
// 4) Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт
// з полями email, message та їхніми поточними значеннями.
// 5) сховище оновлювалось не частіше, ніж раз на 500 мілісек lodash.throttle;

import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');

const KEY_FORM_DATA = 'feedback-form-state';

// emailEl.removeAttribute('autofocus');

const data = {
  email: '',
  message: '',
};

checkStorage();

formEl.addEventListener('input', onInputChange);
formEl.addEventListener('submit', onFormSubmit);

function onInputChange(event) {
  const value = event.target.value;
  const name = event.target.name;
  data[name] = value;
  throttle(saveData(data), 500);
}

function saveData(data) {
  localStorage.setItem(KEY_FORM_DATA, JSON.stringify(data));
}

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(formEl);
  // console.log(formData); // FormData { email → "y", message → "" }
  // <entries> 0: email → "t" 1: message → ""
  formData.forEach((value, name) => (data[name] = value));

  console.log(data);

  localStorage.removeItem(KEY_FORM_DATA);

  formEl.reset();
}

function checkStorage() {
  const parsedFormData = JSON.parse(localStorage.getItem(KEY_FORM_DATA));

  if (parsedFormData) {
    messageEl.value = parsedFormData.message;
    emailEl.value = parsedFormData.email;
    return parsedFormData;
  }
}
