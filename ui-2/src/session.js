const sessionId = () => {
  try {
    return {
      auth_code: sessionStorage.getItem('token'),
    };
  } catch (error) {
    console.log(error); // eslint-disable-line
    return {};
  }
};

const clear = () => sessionStorage.clear();

const set = (key, value) => sessionStorage.setItem(key, value);

const clearAll = () => sessionStorage.clear();

const removeItem = item => sessionStorage.removeItem(item);

export {
  sessionId,
  clear,
  set,
  clearAll,
  removeItem,
};
