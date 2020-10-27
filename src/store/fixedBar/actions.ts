import { createAction } from 'redux-actions';

const closeFixedBarAction = createAction('CLOSE_FIXED_BAR');
const openFixedBarAction = createAction('OPEN_FIXED_BAR');

export {
  closeFixedBarAction,
  openFixedBarAction,
};