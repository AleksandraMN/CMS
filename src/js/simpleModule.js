
// удаление старых данных
export const deleteList = (a) => {
  while (a.childNodes[0]) {
    a.removeChild(a.childNodes[0]);
  }
};


