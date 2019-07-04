export const modalInitState = {
  isOpen: false,
  content: null,
  title: 'Modal Title',
  modalSize: 'modal-md',
  hideHeader: false,
};

export default {
  SET_MODAL: (state, { data }) => ({
    ...state,
    ...data,
  }),
};
