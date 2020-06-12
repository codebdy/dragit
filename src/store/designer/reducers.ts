import { handleAction, Action } from 'redux-actions';
import {closeAreaSelectAction, openAreaSelectAction, designPageContentAction, cancelPageContentAction, unActiveNodeAction, activeNodeAction, focusNodeAction, unFocusNodeAction} from "./actions";
import { IContext } from 'designer/Core/Node/IContext';

const initialState:{
  areaSelect:boolean, 
  pageContentDesign:boolean,
  activedNode:IContext | null,
  focusedNode:IContext | null,
} = 
  {
    areaSelect: false,
    pageContentDesign: false,
    activedNode: null,
    focusedNode: null,
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

const activeNode = handleAction(activeNodeAction, (state, action) => {
  return {
    ...state,
    activedNode: action.payload,
  };
}, initialState);
const unActiveNode = handleAction(unActiveNodeAction, (state, action) => {
  return {
    ...state,
    activedNode: null,
  };
}, initialState);

const focusNode = handleAction(focusNodeAction, (state, action) => {
  return {
    ...state,
    focusedNode: action.payload,
  };
}, initialState);
const unFocusNode = handleAction(unFocusNodeAction, (state, action) => {
  return {
    ...state,
    focusedNode: null,
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

    case activeNodeAction().type:
    return activeNode(state, action);

    case unActiveNodeAction().type:
    return unActiveNode(state, action);
    
    case focusNodeAction().type:
    return focusNode(state, action);

    case unFocusNodeAction().type:
    return unFocusNode(state, action);
  }

  return state
}

export default reducer;
