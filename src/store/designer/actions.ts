import { createAction } from 'redux-actions';

const closeAreaSelectAction = createAction('CLOSE_AREA_SELECT');
const openAreaSelectAction = createAction('OPEN_AREA_SELECT');

const designPageContentAction = createAction('DESIGN_PAGE_CONTENT');
const savePageContentAction = createAction('SAVE_PAGE_CONTENT');
const cancelPageContentAction = createAction('CANCEL_DESIGN_PAGE_CONTENT');

const showOutlineActon = createAction('SHOW_OUT_LINE');
const showPaddingXActon = createAction('SHOW_PADDING_X');
const showPaddingYActon = createAction('SHOW_PADDING_Y');

export {
  closeAreaSelectAction,
  openAreaSelectAction,
  designPageContentAction,
  savePageContentAction,
  cancelPageContentAction,
  showOutlineActon,
  showPaddingXActon,
  showPaddingYActon
};