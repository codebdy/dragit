import { createAction } from 'redux-actions';

const requestFailureAction = createAction('LOCALE_LANG_REQUEST_FAILURE');
const receivedAction = createAction('RECEIVED_LOCALE_LANG');

export {
  requestFailureAction,
  receivedAction,
};