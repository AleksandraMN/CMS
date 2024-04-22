
export const getModalError = () => {
  const divError = document.createElement('div');
  divError.classList.add('overlay', 'overlay-error');
  divError.innerHTML = `
    <div class="overlay__modal modal-error">
      <button class="modal__close modal_error">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
      </button>

      <div class="modal_error_top">
        <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L92 92" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
          <path d="M2 92L92 2" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="modal__footer-error">
        <p class=" modal-p" >ЧТО-ТО ПОШЛО НЕ ТАК</p>
      </div>
    </div>
   `;

  document.body.append(divError);
  divError.classList.add('active');
  const modalError = document.querySelector('.modal-error');
  modalError.style.width = '350px';
  modalError.style.height = '350px';
  modalError.style.padding = '109px 48px';

  const imgError = document.querySelector('.modal_error_top');
  imgError.style.width = '90px';
  imgError.style.height = '90px';
  imgError.style.padding = '0px 82px 0px 82px';
  imgError.style.alignItems = 'normal';

  const modalPEl = document.querySelector('.modal-p');
  modalPEl.style.fontSize = '18px';
  modalPEl.style.fontWeight = '700';
  modalPEl.style.textContent = 'center';
  modalPEl.style.padding = '0';
  modalPEl.style.boxShadow = '0 0 0 0';

  divError.addEventListener('click', e => { // закрытие модального окна
    const target = e.target;
    if (target.closest('.modal_error') ||
      target === divError) {
      divError.classList.remove('active');
    }
  });
};

