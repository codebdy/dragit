import { createAction } from 'redux-actions';

const changeSizeAction = createAction('CHANGE_SIDEBAR_SIZE');
const compactableAction = createAction('COMPACTABLE_SIDEBAR');

export {
  changeSizeAction,
  compactableAction,
};