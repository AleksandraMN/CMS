
import {renderGoods} from './js/render';
import eventControl from './js/eventControl';
import {getTotalSum} from './js/calculationsModule';
import {createImageModal, completeCategory} from './js/createModule';
import fetchRequest from './js/fetchRequest';
import './js/imageModal';
import {toggleLoader} from './js/loading';
import {searchInputGoods} from './js/search';
import {deleteList} from './js/simpleModule';

import './css/index.css';

const {
  modalControl,
  goodsModal,
  validateForm,
  formControl,
  openImageModal,
} = eventControl;


{
  const init = async () => {
    const overlay = document.querySelector('.overlay');
    const modalForm = document.querySelector('.modal__form');
    const modalInputDiscount = document.querySelector('.modal__input_discount');
    const btnPanelAddGoods = document.querySelector('.panel__add-goods');
    const modalInputs = document.querySelectorAll('.modal__input');
    const price = document.querySelector('#price');
    const countInput = document.querySelector('#count');
    const vendorCodeId = document.querySelector('.vendor-code__id');
    const modalTotalPrice = document.querySelector('.modal__total-price');
    const cmsTotalPrice = document.querySelector('.cms__total-price');
    const tableBody = document.querySelector('.table__body');


    const {closeModal, openModal} =
    modalControl(btnPanelAddGoods, overlay, vendorCodeId, modalTotalPrice);
    closeModal();
    toggleLoader();

    deleteList(tableBody);
    const {
      data,
    } = await fetchRequest('goods', {
      callback: renderGoods,
    });
    await fetchRequest('categories', {
      callback: completeCategory,
    });

    // console.log(data);

    validateForm(modalInputs, price, countInput, modalInputDiscount);

    goodsModal(tableBody, data, cmsTotalPrice, modalForm, openModal);
    openImageModal(tableBody);


    formControl(modalForm, vendorCodeId, closeModal, tableBody,
        data, modalTotalPrice,
        modalInputDiscount, countInput, price, cmsTotalPrice);
    createImageModal();

    searchInputGoods();
    getTotalSum(cmsTotalPrice);
  };

  window.goodsInit = init;
}


