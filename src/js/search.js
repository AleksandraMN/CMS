
import fetchRequest from './fetchRequest';
import {renderGoods} from './render';
import {deleteList} from './simpleModule';

const tableBody = document.querySelector('.table__body');
const panelInput = document.querySelector('.panel__input');
// const formPanelSearch = document.querySelector('.panel__search');

function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
};

/*
export const debounce2 = (fn, msec) => {
   let lastCall = 0;
   let lastCallTimer = NaN;

   return (...args) => {
     const previousCall = lastCall;
     lastCall = Date.now();

     if (previousCall && ((lastCall - previousCall) <= msec)) {
       clearTimeout(lastCallTimer);
     }
     lastCallTimer = setTimeout(() => fn(...args), msec);
   };
 };
*/

const search = async () => {
  const query = panelInput.value;

  console.log(query);
  deleteList(tableBody);

  const a = await fetchRequest(`goods/category/${query}`, {
    callback: renderGoods,
  });
  const b = await fetchRequest(`goods?search=${query}`, {
    callback: renderGoods,
  });
};


export const searchInputGoods = () => {
  const textDebounce = debounce(search, 300);
  panelInput.addEventListener('input', textDebounce);
};

