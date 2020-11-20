import { createAction } from 'redux-actions';

const setModelLoadingAction = createAction('LOADING_PAGE_DATA');
const setModelAction = createAction('RECEIVED_PAGE_DATA');
export {
  setModelLoadingAction ,
  setModelAction,
};