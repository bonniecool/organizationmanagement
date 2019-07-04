import _ from 'lodash';

export const loadingInitState = {
  loading: [],
};

export default {
  'COMMON/set_loading': (state, action) => _.assign({}, state, {
    loading: state.loading.concat([action.key]),
  }),
  'COMMON/done_loading': (state, action) => _.assign({}, state, {
    loading: state.loading.filter(type => !(action.key === type)),
  }),
  'COMMON/clear_loading': state => _.assign({}, state, {
    loading: [],
  }),
};
