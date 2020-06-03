import { createAction } from 'redux-actions';

const closeAreaSelectAction = createAction('CLOSE_AREA_SELECT');
const openAreaSelectAction = createAction('OPEN_AREA_SELECT');

export {
  closeAreaSelectAction,
  openAreaSelectAction,
};