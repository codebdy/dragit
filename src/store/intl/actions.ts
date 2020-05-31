import { createAction } from 'redux-actions';

const loadingAction = createAction('LOCALE_LANG_LOADING');
const requestFailureAction = createAction('LOCALE_LANG_REQUEST_FAILURE');
const receivedAction = createAction('RECEIVED_LOCALE_LANG');

export {
  loadingAction,
  requestFailureAction,
  receivedAction,
};