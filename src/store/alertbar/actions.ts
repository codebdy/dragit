import { createAction } from 'redux-actions';

const openSuccessAlertAction = createAction('OPEN_SUCCESS_ALERT');
const closeSuccessAlertAction = createAction('CLOSE_SUCCESS_ALERT');

export {
  openSuccessAlertAction,
  closeSuccessAlertAction,
};