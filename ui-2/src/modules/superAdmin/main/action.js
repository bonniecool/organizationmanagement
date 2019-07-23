import * as req from 'api/actions';
// import * as c from './constants';

// eslint-disable-next-line import/prefer-default-export
export const logout = () => req.create(
  'AUTH/LOGOUT',
  'mng/logout',
  {},
  {},
);
