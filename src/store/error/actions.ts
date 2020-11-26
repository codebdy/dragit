import { createAction } from 'redux-actions';

const openErrorDialogAction = createAction('OPEN_ERROR_DIALOG');
const closeErrorDialogAction = createAction('CLOSE_ERROR_DIALOG');

export {
  openErrorDialogAction,
  closeErrorDialogAction,
};