import alert from 'react-s-alert';
import * as helper from 'helper';

export const loading = (key, set = true) => {
  if (!key) {
    return { type: 'COMMON/clear_loading' };
  }

  if (set) {
    return { type: 'COMMON/set_loading', key };
  }

  return { type: 'COMMON/done_loading', key };
};

export default null;


export const apiError = (response) => {
  if (!response) {
    alert.error('Whoops, looks like something went wrong.');
    return false;
  }

  if (!response.status) {
    alert.error('Response status not found, Please check your connection.');
    return true;
  }

  if (response.status === 422) {
    const errors = (response.data) ? response.data.errors : response.errors;

    alert.error((typeof errors === 'string') ? errors : helper.getFirstMessage(errors));
    return true;
  }

  if (response.status === 400) {
    alert.error(response.data ? response.data.message : response.message);
    return true;
  }

  if (response.status === 404) {
    // do nothing...
    return true;
  }

  if (response.status === 401) {
    localStorage.clear();
    window.location.reload();
  }

  if (response.status === 403) {
    const msg = response.message;
    alert.error(msg);

    switch (msg) {
      case 'Token Expired':
      case 'Invalid Token':
        localStorage.clear();
        window.location.reload();
        // console.log(history);
        // history.push('/');
        return true;
      default:
        return true;
    }
  }

  if (response.status !== 200) {
    alert.error(
      `Unregistered status "${response.status}", ${response.message}`,
    );
  }

  return false;
};
