export const loaderHTML = document.querySelector('#loader');

export const toggleLoader = () => {
  const isHidden = loaderHTML.hasAttribute('hidden');
  if (isHidden) {
    loaderHTML.classList.add('spinner');
  } else {
    loaderHTML.classList.remove('spinner');
  }
};

