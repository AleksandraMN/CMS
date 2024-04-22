import {createImageModal} from './createModule';

const modalFieldset = document.querySelector('.modal__fieldset');
const wrapperEl = createImageModal();
modalFieldset.after(wrapperEl);
// modalFieldset.append(wrapperEl);

const file = document.querySelector('.modal__file');
export const image = document.querySelector('.preview');
// const modalLabel = document.querySelector('.modal__label');

const pEl = document.createElement('p');
pEl.classList.add('wrapper__text');
pEl.style.color = 'red';
modalFieldset.append(pEl);


export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', err => {
    reject(err);
  });
  reader.readAsDataURL(file);
});

file.addEventListener('change', () => {
  pEl.textContent = '';
  if (file.files[0].size === '') return;
  if ((file.files.length > 0) && (file.files[0].size <= 1000000)) {
    pEl.textContent = '';
    const url = URL.createObjectURL(file.files[0]);
    image.src = url;
  } else {
    pEl.textContent = 'Изображение не должно превышать размер 1 Мб';
    pEl.style.fontSize = '14px';
    pEl.style.fontWeight = '700';
    image.src = '';
  }
});


