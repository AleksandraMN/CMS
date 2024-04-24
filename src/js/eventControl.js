
// import {completeCategory} from './createModule';
// import {renderGoods} from './render';
import {getTotalSum} from './calculationsModule';
import './imageModal';
import {toBase64} from './imageModal';
import fetchRequest from './fetchRequest';
import {getModalError} from './modalError';
// import {deleteList} from './simpleModule';
import getModalDelete from './modalDelete';
import createRow from './createModule';

const modalTitle = document.querySelector('.modal__title');
const inputName = document.querySelector('#name');
const inputCategory = document.querySelector('#category');
const description = document.querySelector('#description');
const inputUnits = document.querySelector('#units');
// const inputDiscount = document.querySelector('#discount');
const inputDiscountCount = document.querySelector('.modal__input_discount');
const inputCount = document.querySelector('#count');
const inputPrice = document.querySelector('#price');
const image = document.querySelector('.preview ');
const total = document.querySelector('.modal__total-price');
// const overlay = document.querySelector('.overlay');
const modalForm = document.querySelector('.modal__form');
const pEl = document.querySelector('.wrapper__text');
const vendorCodeId = document.querySelector('.vendor-code__id');
let postfix;
let methed;
let el;


const modalControl =
(btnPanelAddGoods, overlay, vendorCodeId, modalTotalPrice) => {
  // открыть модальное окно
  const openModal = () => {
    overlay.classList.add('active');
  };

  // закрыть модальное окно
  const closeModal = () => {
    overlay.classList.remove('active');
    image.src = '';
    pEl.textContent = '';
    modalTitle.textContent = 'ДОБАВИТЬ ТОВАР';
    modalForm.reset();
    postfix = ``;
    methed = ``;
  };

  // закрытие модального окна
  overlay.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.modal__close') ||
      target === overlay) {
      closeModal();
    }
  });

  btnPanelAddGoods.addEventListener('click', async () => {
    openModal();

    // const id = getRandom(1, 100000); // получение случайного id
    vendorCodeId.textContent = 0; // присвоение id в модальном окне
    modalTotalPrice.textContent = '$' + 0; // обнуление итоговой суммы
  });

  return {
    closeModal,
    openModal,
  };
};


const goodsModal = async (tableBody, data, cmsTotalPrice, count, openModal) => {
  tableBody.addEventListener('click', async e => {
    const target = e.target;
    console.log(target);

    el =
      Number(target.parentElement.parentElement.childNodes[1].dataset.id);
    // console.log(el);

    // загрузка мод.окна изменить товар
    if (target.classList.contains('table__btn_edit')) {
      const change = fetchRequest(`goods/${el}`, {
        callback: false,
      });
      // console.log(change);

      change
          .then(res => {
            // console.log(res);
            openModal();
            modalTitle.textContent = 'ИЗМЕНИТЬ ТОВАР';
            inputName.value = res.title || '';
            inputCategory.value = res.category || '';
            description.value = res.description || '';
            inputUnits.value = res.units || '';
            inputDiscountCount.value = res.discount || '';
            inputCount.value = res.count || '';
            inputPrice.value = res.price || '';
            vendorCodeId.textContent = res.id;
            total.value = '$' + ((res.price - (res.price / 100 *
            res.discount_count || res.discount || 0)) * res.count);
            image.src = `https://festive-pointy-lantana.glitch.me/${res.image}`;
          });
    }
    // загрузка мод.окна подтверждение удалить товар
    if (target.classList.contains('table__btn_del')) {
      const result = getModalDelete();

      result
          .then(res => {
            // console.log(res);
            if (res === true) {
              fetchRequest(`goods/${el}`, {
                method: 'DELETE',
                callback(err, obj) {
                  if (err) {
                    getModalError();
                    console.warn(err, obj);
                    return;
                  }
                  // document.querySelector("tr[id='" + obj.id + "']").remove();
                  target.closest('tr').remove();
                },
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              });

              getTotalSum(data, cmsTotalPrice); // пересчет итог. суммы вверху
            }
          });
    }
  });
};

// валидация формы
const validateForm = (modalInputs, price, countInput, modalInputDiscount) => {
  Array.from(modalInputs).map((element) => {
    element.setAttribute('required', 'true');
  });
  price.setAttribute('type', 'number');
  countInput.setAttribute('type', 'number');
  modalInputDiscount.setAttribute('type', 'number');
};

// отправка формы
const formControl =
(modalForm, vendorCodeId, closeModal, tableBody, data, modalTotalPrice,
    modalInputDiscount, countInput, price, cmsTotalPrice,
    image) => {
  modalForm.addEventListener('submit', async e => {
    e.preventDefault();
    let img;
    console.log(e);

    const formData = new FormData(e.target);
    const newGood = Object.fromEntries(formData);
    newGood.image = await toBase64(newGood.image);
    // console.log(newGood);
    // newGood.id = Number(vendorCodeId.textContent); // id
    // data.push(newGood);

    if (modalTitle.textContent === 'ИЗМЕНИТЬ ТОВАР') {
      postfix = `goods/${el}`;
      methed = 'PATCH';
      img = `image/${el}.jpg`;
    } else {
      postfix = `goods`;
      methed = 'POST';
      img = newGood.image;
    }

    await fetchRequest(postfix, {
      method: methed,
      body: {
        title: inputName.value,
        description: description.value,
        price: inputPrice.value,
        count: inputCount.value,
        units: inputUnits.value,
        discount: inputDiscountCount.value,
        category: inputCategory.value,
        image: img,
      },
      callback(err, obj) {
        if (err) {
          getModalError();
          const modalPEl = document.querySelector('.modal-p');
          modalPEl.textContent = err;
          console.warn(err, obj);
          return;
        }
        // console.log(obj);
        closeModal();
        if (document.querySelector("tr[id='" + obj.id + "']")) {
          document.querySelector("tr[id='" + obj.id + "']").remove();
          tableBody.append(createRow(obj));
        } else {
          tableBody.append(createRow(obj));
        }
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    getTotalSum(data, cmsTotalPrice); // пересчет итог. суммы вверху
  });


  // Итог. стоимость в мод окне
  modalForm.addEventListener('change', () => {
    modalTotalPrice.textContent = '$' +
      ((price.value - (price.value / 100 *
       modalInputDiscount.value)) * countInput.value);
  });


  // В форме если поставить чекбокс должен быть разблокирован input
  modalForm.addEventListener('click', e => {
    const target = e.target;
    if (target.type === 'checkbox') {
      if (target.checked === true) {
        modalInputDiscount.disabled = false;
      } else {
        modalInputDiscount.disabled = true;
      }
    }
  });
};
// открытие окна изображение товара
const openImageModal = (tableBody) => {
  tableBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('[data-pic]')) {
      const url = target.dataset.pic;
      const w = 800;
      const h = 600;

      // на первом экране по центру
      console.log(target.dataset.pic);
      const height = Math.min(h, screen.availHeight);
      const width = Math.min(w, screen.availWidth);
      const left = (screen.width - width) / 2;
      const top = (screen.height - height) / 2;
      const newWin = window.open('', '', `height=${height},` +
      `width=${width},left=${left},top=${top}`);
      return newWin.document.write(`<div style="text-align:center;"><img src=${url} alt="image" style="height:100%;"/></div>`);

      // два экрана - показывает на втором
    /*
      console.log(screen);
      console.log(window.top.outerWidth);
      console.log(window.top.screenY);
      console.log(window.top.screenX);
      const windowName = 2; // два экрана - показывает на втором
      const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2);
      const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
      return window.open(url, windowName, `toolbar=no,location=no,` +
      `directories=no,status=no,resizable=no,` +
      `width=${w},height=${h},top=${y},left=${x}`); */
    }
  });
};

export default {
  modalControl,
  goodsModal,
  validateForm,
  formControl,
  openImageModal,
};
