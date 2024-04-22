
const getModalDelete = () => {
  const divDelete = document.createElement('div');
  divDelete.classList.add('overlay_confirm');

  const divDeleteModal = document.createElement('div');
  divDeleteModal.classList.add('modal-delete');

  const h2ElDelete = document.createElement('h2');
  h2ElDelete.classList.add('modal__title');
  h2ElDelete.textContent = 'ПОДТВЕРДИТЕ УДАЛЕНИЕ ТОВАРА';

  const divDeleteBtn = document.createElement('div');
  divDeleteBtn.classList.add('modal__button');

  const Btn1 = document.createElement('button');
  Btn1.classList.add('modal__btn', 'modal__btn_confirm');
  Btn1.textContent = 'ДА';

  const Btn2 = document.createElement('button');
  Btn2.classList.add('modal__btn', 'modal__btn_edit');
  Btn2.textContent = 'НЕТ';

  divDeleteBtn.append(Btn1, Btn2);
  divDeleteModal.append(h2ElDelete, divDeleteBtn);
  divDelete.append(divDeleteModal);

  document.body.append(divDelete);

  return new Promise(resolve => {
    Btn2.addEventListener('click', () => {
      divDelete.remove();
      resolve(false);
    });
    Btn1.addEventListener('click', () => {
      divDelete.remove();
      resolve(true);
    });
  });
};

export default getModalDelete;
