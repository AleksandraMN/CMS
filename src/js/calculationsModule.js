import fetchRequest from './fetchRequest';

export const getTotalSum = (cmsTotalPrice) => {
  const result = fetchRequest(`goods`, {
    callback: false,
  });
  result.then(res => {
    const {goods} = res;
    const totalSum = goods.reduce((acc, item, arr) =>
      acc + ((item.price - (item.price / 100 *
      item.discount_count || item.discount || 0)) * item.count), 0);
    return cmsTotalPrice.textContent = '$' + totalSum;
  });
};

export const getRandom = (min, max) => {
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  return number;
};

