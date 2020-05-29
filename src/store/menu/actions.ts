import { createAction } from 'redux-actions';

const getMenuItemsRequestAction = createAction('GET_MENU_ITEMS_REQUEST');
const getMenuItemsFailureAction = createAction('GET_MENU_ITEMS_FAILURE');
const getMenuItemsSuccessAction = createAction('GET_MENU_ITEMS_SUCCESS');

export {
  getMenuItemsRequestAction,
  getMenuItemsFailureAction,
  getMenuItemsSuccessAction,
};