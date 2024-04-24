import {loaderHTML} from './loading';
import imageC from '../img/ic.svg';

const datalistCategory = document.querySelector('#category-list');

export const completeCategory = (err, arr) => {
  if (err) {
    console.warn(err, arr);
    return;
  }
  const options = arr.map(category => {
    const option = document.createElement('option');
    option.value;
    option.value = category;
    option.textContent = option.value;
    return option;
  });

  return datalistCategory.append(...options);
};

const createRow = (obj) => {
  const trEl = document.createElement('tr');
  trEl.setAttribute('id', obj.id);
  const td1 = document.createElement('td');
  td1.className = 'table__cell';
  td1.textContent = obj.id;
  trEl.appendChild(td1);

  const td2 = document.createElement('td');
  td2.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
  td2.setAttribute('data-id', obj.id);
  td2.textContent = obj.title || obj.name;
  const span = document.createElement('span');
  span.classList.add('table__cell-id');

  td2.prepend(span);
  trEl.appendChild(td2);

  const td3 = document.createElement('td');
  td3.classList.add('table__cell', 'table__cell_left');
  td3.textContent = obj.category;
  trEl.appendChild(td3);

  const td4 = document.createElement('td');
  td4.classList.add('table__cell');
  td4.textContent = obj.units;
  trEl.appendChild(td4);

  const td5 = document.createElement('td');
  td5.classList.add('table__cell');
  td5.textContent = obj.count;
  trEl.appendChild(td5);

  const td6 = document.createElement('td');
  td6.classList.add('table__cell');
  td6.textContent = '$' + (obj.price -
    (obj.price / 100 * obj.discount_count || obj.discount || 0));
  trEl.appendChild(td6);

  const td7 = document.createElement('td');
  td7.classList.add('table__cell');
  td7.textContent = '$' + ((obj.price -
    (obj.price / 100 * obj.discount_count || obj.discount || 0)) * obj.count);
  trEl.appendChild(td7);

  const td8 = document.createElement('td');
  td8.classList.add('table__cell', 'table__cell_btn-wrapper');
  const btn1 = document.createElement('button');
  btn1.classList.add('table__btn', 'table__btn_pic');
  const a = `https://festive-pointy-lantana.glitch.me/${obj.image}`;
  btn1.setAttribute('data-pic', a);
  td8.append(btn1);
  const btn2 = document.createElement('button');
  btn2.classList.add('table__btn', 'table__btn_edit');
  td8.append(btn2);
  const btn3 = document.createElement('button');
  btn3.classList.add('table__btn', 'table__btn_del');
  td8.append(btn3);
  trEl.appendChild(td8);

  loaderHTML.classList.remove('spinner');
  return trEl;
};

export const createImageModal = () => {
  const pic = document.createElement('div');
  pic.style.display = 'flex';
  pic.style.justifyContent = 'center';
  pic.style.marginBottom = '30px';

  const wrapper = document.createElement('div');
  wrapper.classList.add('featuredItem');
  wrapper.style.maxWidth = '200px';
  wrapper.style.maxHeight = '200px';

  const wrapperEl = document.createElement('div');
  wrapperEl.classList.add('wrapper', 'featuredImgWrap');

  const div = document.createElement('div');
  div.classList.add('featuredImgDark');

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add('addToCart');

  const img = document.createElement('img');
  img.classList.add('items__img_hover');
  img.style.maxWidth = '40px';
  img.style.maxHeight = '40px';
  img.setAttribute('src', '');
  img.src = imageC;

  const image = document.createElement('img');
  image.classList.add('preview', 'items__img');
  image.setAttribute('src', '');
  image.style.maxWidth = '200px';
  image.style.maxHeight = '200px';

  div.append(button);
  button.append(img);

  wrapperEl.append(image, div);
  wrapper.append(wrapperEl);
  pic.append(wrapper);

  button.addEventListener('click', () => {
    image.src = '';
  });

  return pic;
};

export default createRow;
