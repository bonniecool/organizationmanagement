import { startLoading, endLoading } from './actions';
import * as c from './constants';

export const apiInitState = {
  loading: [],
};

export const mapReduce = (actions, initState) => (state = initState, action) => {
  if (actions[action.type]) {
    return actions[action.type](state, action);
  }
  return state;
};

export default {
  [c.GET_LIST]: (state, { key }) => startLoading(state, key),
  [c.GOT_LIST]: (state, { key, data, pager }) => endLoading({
    ...state,
    [key]: {
      list: data || [],
      pager: pager || {},
    },
  }, key),
  [c.GET_ITEM]: (state, { key }) => startLoading(state, key),
  [c.GOT_ITEM]: (state, { key, data }) => endLoading({
    ...state,
    [key]: {
      item: data || [],
    },
  }, key),
  [c.CREATE_ITEM]: (state, { key }) => startLoading(state, key),
  [c.CREATED_ITEM]: (state, { key }) => endLoading(state, key),
  [c.UPDATE_ITEM]: (state, { key }) => startLoading(state, key),
  [c.UPDATED_ITEM]: (state, { key }) => endLoading(state, key),
  [c.UPLOAD_FORM_DATA]: (state, { key }) => startLoading(state, key),
  [c.UPLOADED_FORM_DATA]: (state, { key }) => endLoading(state, key),
  [c.DOWNLOAD]: (state, { key }) => startLoading(state, key),
  [c.DOWNLOADED]: (state, { key }) => endLoading(state, key),
  SIGN_OUT: () => apiInitState,
  ON_ERROR: (state, { key }) => ({
    ...state,
    loading: state.loading.filter(x => x !== key),
  }),
};
