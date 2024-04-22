
import createRow from './createModule.js';


export const renderGoods = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const tableBody = document.querySelector('.table__body');

  const tableList = data.goods.map(createRow);
  tableBody.append(...tableList);
  return {
    tableBody,
    data,
  };
};

