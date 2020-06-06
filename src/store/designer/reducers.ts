import { handleAction, Action } from 'redux-actions';
import {closeAreaSelectAction, openAreaSelectAction, designPageContentAction, cancelPageContentAction} from "./actions";

const initialState = {
  areaSelect: false,
  pageContentDesign: false,
  focusedNodeId : undefined,
};

type State = typeof initialState

const closeAreaSelect = handleAction(closeAreaSelectAction, (state, action) => {
  return {
    ...state,
    areaSelect: false,
  };
}, initialState);

const openAreaSelect = handleAction(openAreaSelectAction, (state, action) => {
  return {
    ...state,
    areaSelect: true,
  };
}, initialState);

const openPageContentDesigner = handleAction(designPageContentAction, (state, action) => {
  return {
    ...state,
    pageContentDesign: true,
  };
}, initialState);

const closePageContentDesigner = handleAction(cancelPageContentAction, (state, action) => {
  return {
    ...state,
    pageContentDesign: false,
  };
}, initialState);

function reducer(
  state = initialState,
  action: Action<any>
): State {
  switch(action.type){
    case closeAreaSelectAction().type:
      return closeAreaSelect(state, action);

    case openAreaSelectAction().type:
      return openAreaSelect(state, action);

    case designPageContentAction().type:
      return openPageContentDesigner(state, action);

    case cancelPageContentAction().type:
      return closePageContentDesigner(state, action);
  }

  return state
}

export default reducer;
