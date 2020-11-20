import { createAction } from 'redux-actions';

const closeAreaSelectAction = createAction('CLOSE_AREA_SELECT');
const openAreaSelectAction = createAction('OPEN_AREA_SELECT');

const openDesignerAction = createAction('OPEN_DESIGNER');
const setDesingerPageAction = createAction('SET_DESIGNER_PAGE');
const cancelPageContentAction = createAction('CANCEL_DESIGN_PAGE_CONTENT');

const showOutlineActon = createAction('SHOW_OUT_LINE');
const showPaddingXActon = createAction('SHOW_PADDING_X');
const showPaddingYActon = createAction('SHOW_PADDING_Y');

export {
  closeAreaSelectAction,
  openAreaSelectAction,
  openDesignerAction,
  setDesingerPageAction,
  cancelPageContentAction,
  showOutlineActon,
  showPaddingXActon,
  showPaddingYActon
};