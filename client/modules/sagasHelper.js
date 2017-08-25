const setItemToLocalStorage = (key, value) => {
  return new Promise(resolve => {
    localStorage.setItem(key, value);
    return resolve();
  });
};

const getItemFromLocalStorage = key => {
  return new Promise(resolve => resolve(localStorage.getItem(key)));
};

export {
  setItemToLocalStorage,
  getItemFromLocalStorage
};
