import * as req from 'api/actions';
import * as c from './constants';

// eslint-disable-next-line import/prefer-default-export
export const getDashboard = (params, callback) => req.list(
  c.GET_DATA,
  '/mng/dashboard/top_attendees',
  params,
  callback,
);
