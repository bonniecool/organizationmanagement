import _ from 'lodash';
import {
  post,
} from 'services';

export const transform = (object) => {
  const arr = [];
  /* eslint-disable no-restricted-syntax, guard-for-in, no-prototype-builtins */
  for (const p in object) {
    if (object.hasOwnProperty(p) && !Array.isArray(object[p])) {
      arr.push(`${encodeURIComponent(p)}=${encodeURIComponent(object[p])}`);
    }

    if (Array.isArray(object[p])) {
      object[p].forEach((item, key) => {
        arr.push(`${encodeURIComponent(`${p}[${key}]`)} = ${encodeURIComponent(item)}`);
      });
    }
  }
  return arr.join('&');
};

export const has = (message, contains) => message.indexOf(contains) > -1;

export const delay = ms => new Promise(res => setTimeout(res, ms));

export const replaceParam = (match, obj) => {
  let newUrl = match.path;
  const { params } = match;
  _.forOwn(params, (v, k) => {
    newUrl = newUrl.replace(`:${k}?`, obj[k] || params[k]);
    newUrl = newUrl.replace(`:${k}`, obj[k] || params[k]);
  });
  return newUrl;
};

export const parseMessage = (msg) => {
  try {
    return JSON.parse(msg);
  } catch (err) {
    return {};
  }
};

export const loadAPI = (doc, type, id, src, onLoad) => {
  // eslint-disable-next-line
  let js, fjs = doc.getElementsByTagName(type)[0];
  if (doc.getElementById(id)) {
    onLoad();
    return;
  }
  // eslint-disable-next-line
  js = doc.createElement(type); js.id = id;
  js.src = src;
  js.onload = onLoad;
  fjs.parentNode.insertBefore(js, fjs);
};

const formatRecursive = (prefix, array) => {
  let payload = {};

  array.forEach((object, index) => {
    for (const key in object) {
      if (object.hasOwnProperty(key) && !Array.isArray(object[key])) {
        payload[`${prefix}[${index}][${key}]`] = object[key];
      }

      if (Array.isArray(object[key])) {
        payload = _.assign({}, payload, formatRecursive(`${prefix}[${index}][${key}]`, object[key]));
      }
    }
  });
  return payload;
};

export const transformPayload = (object) => {
  let payload = {};

  for (const key in object) {
    if (object.hasOwnProperty(key) && !Array.isArray(object[key])) {
      payload[key] = object[key];
    }

    if (Array.isArray(object[key])) {
      payload = _.assign({}, payload, formatRecursive(`${key}`, object[key]));
    }
  }

  return payload;
};

export const deepCleanObjForNull = (obj) => {
  if (Array.isArray(obj)) {
    // eslint-disable-next-line no-alert
    alert('You are using an array on "deepCleanObjForNull". Returing the object without cleaning...');
    return obj;
  }

  const newObj = {};

  for (const key in obj) {
    const val = obj[key];
    if (_.isNil(val)) {
      newObj[key] = '';
      continue; // eslint-disable-line no-continue
    }
    if (val === 'null') {
      newObj[key] = '';
      continue; // eslint-disable-line no-continue
    }
    if (typeof val === 'number') {
      newObj[key] = val;
      continue; // eslint-disable-line no-continue
    }
    if (typeof val === 'object' && !Array.isArray(val)) {
      newObj[key] = deepCleanObjForNull(val);
      continue; // eslint-disable-line no-continue
    }
    if (typeof val === 'object' && Array.isArray(val)) {
      newObj[key] = val.map((item) => {
        if (typeof item === 'object' && !Array.isArray(item)) {
          return deepCleanObjForNull(item);
        }
        if (_.isNil(item)) {
          return '';
        }
        return item;
      });
      continue; // eslint-disable-line no-continue
    }
    newObj[key] = val;
  }
  return newObj;
};

export const metafyUrl = url => new Promise((resolve, reject) => {
  try {
    post('/sys/chat/parse_url')({ url }).then((res) => {
      try {
        const { status } = res;
        if (status === 200) {
          resolve(res.data);
        }
        reject();
      } catch (err) {
        reject();
      }
    }).catch(() => {
      reject();
    });
  } catch (err) {
    reject();
  }
});

export const stringToObj = (data) => {
  if (data) {
    const parseData = args => JSON.parse(
      `{"${decodeURI(args)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`,
    );
    if (data.indexOf('?') === 0) {
      const newData = data.replace('?', '');
      return parseData(newData);
    }
    return parseData(data);
  }
  return {};
};

export const omitEmptyArgs = (args) => {
  const newArgs = {};
  _.forEach(args, (value, key) => {
    if (!_.isEmpty(`${value}`) && !_.isNull(value)) {
      newArgs[key] = value;
      return newArgs;
    }
    return newArgs;
  });

  return newArgs;
};

export const isNumber = (number) => {
  if (_.isEmpty(`${number}`)) return true;
  const regexp = /^[0-9]+([,.][0-9]+)?$/g;
  return regexp.test(number);
};

export const getEllipsis = (str, count) => (str.length > count ? `${str.substring(0, count)}...` : str);

export const getFirstMessage = (data) => {
  let firstMessage = '';
  let x = 0;

  Object.keys(data).map((i) => {
    if (x === 0) {
      firstMessage = data[i];
    }
    // eslint-disable-next-line no-return-assign
    return x += 1;
  });
  return firstMessage;
};

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const formatedSelectOption = (list = [], value = 'id', label = 'name', isToUpperCase = true) => {
  const newData = [];
  list.forEach((item) => {
    newData.push({
      value: _.get(item, `${value}`),
      label: isToUpperCase ? _.get(item, `${label}`).toUpperCase() : _.get(item, `${label}`),
    });
  });
  return newData;
};
