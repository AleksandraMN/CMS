
import createRow from './createModule';


export const renderGoods = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  const {goods} = data;
  const tableBody = document.querySelector('.table__body');

  const tableList = goods.map(createRow);
  tableBody.append(...tableList);
  return {
    tableBody,
    data,
  };
};

