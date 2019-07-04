import _ from 'lodash';
import * as c from './constant';

export const authInitState = {
  profileType: '',
  profile: {},
  isAuthenticated: false,
  formData: c.FORM_DATA,
};

export default {
  [c.GOT_AUTH]: (state, action) => ({
    ...state,
    ...action.data,
  }),
  [c.SET_FORM_DATA]: (state, { args }) => ({
    ...state,
    formData: _.assign({}, state.formData, args),
  }),
  [c.CLEAR_FORM_DATA]: state => ({
    ...state,
    formData: c.FORM_DATA,
  }),
};
