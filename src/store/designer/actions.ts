import { createAction } from 'redux-actions';

const closeAreaSelectAction = createAction('CLOSE_AREA_SELECT');
const openAreaSelectAction = createAction('OPEN_AREA_SELECT');

const designPageContentAction = createAction('DESIGN_PAGE_CONTENT');
const savePageContentAction = createAction('SAVE_PAGE_CONTENT');
const cancelPageContentAction = createAction('CANCEL_DESIGN_PAGE_CONTENT');


export {
  closeAreaSelectAction,
  openAreaSelectAction,
  designPageContentAction,
  savePageContentAction,
  cancelPageContentAction
};