import * as req from 'api/actions';
import * as c from './constants';

// eslint-disable-next-line import/prefer-default-export
export const getBranches = (params, callback) => req.list(
  c.GET_LIST,
  '/mng/branch',
  params,
  callback,
);

export const getRegions = (params, callback) => req.list(
  c.GET_REGIONS,
  '/common/regions',
  params,
  callback,
);

export const getDetails = (id, callback) => req.item(
  c.GET_DETAILS,
  `/mng/branch/${id}`,
  callback,
);

export const create = (args, callback) => req.create(
  c.CREATE,
  'mng/branch',
  args,
  callback,
);
