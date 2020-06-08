import { createAction } from 'redux-actions';

const closeAreaSelectAction = createAction('CLOSE_AREA_SELECT');
const openAreaSelectAction = createAction('OPEN_AREA_SELECT');

const designPageContentAction = createAction('DESIGN_PAGE_CONTENT');
const savePageContentAction = createAction('SAVE_PAGE_CONTENT');
const cancelPageContentAction = createAction('CANCEL_DESIGN_PAGE_CONTENT');

const activeNodeAction = createAction('ACTIVE_NODE');
const unActiveNodeAction = createAction('UN_ACTIVE_NODE');
const focusNodeAction = createAction('FOCUS_NODE');
const unFocusNodeAction = createAction('UN_FOCUS_NODE');


export {
  closeAreaSelectAction,
  openAreaSelectAction,
  designPageContentAction,
  savePageContentAction,
  cancelPageContentAction,
  activeNodeAction,
  unActiveNodeAction,
  focusNodeAction,
  unFocusNodeAction
};