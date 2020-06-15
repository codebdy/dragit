import { Action, handleActions } from 'redux-actions';
import {closeAreaSelectAction, openAreaSelectAction, designPageContentAction, cancelPageContentAction, unActiveNodeAction, activeNodeAction, focusNodeAction, unFocusNodeAction} from "./actions";
import { INode } from 'designer/Core/Node/INode';

const initialState:{
  areaSelect:boolean, 
  pageContentDesign:boolean,
  activedNode:INode | null,
  focusedNode:INode | null,
} = 
  {
    areaSelect: false,
    pageContentDesign: false,
    activedNode: null,
    focusedNode: null,
  };

type State = typeof initialState


const actionMap={
  [openAreaSelectAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      areaSelect: true,
    };
  },
  [closeAreaSelectAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      areaSelect: false,
    };
  },

  [designPageContentAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      pageContentDesign: true,
    };
  },
  [cancelPageContentAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      pageContentDesign: false,
    };
  },

  [focusNodeAction().type] :(state:State, action:Action<any>) => {
    return {
      ...state,
      focusedNode: action.payload,
    };
  },

  [unFocusNodeAction().type] :(state:State, action:Action<any>) => {
    return {
      ...state,
      focusedNode: null,
    };
  },

  [activeNodeAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      activedNode: action.payload,
    };
  },
  [unActiveNodeAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      activedNode: null,
    };
  },

}

const reducer = handleActions(
  actionMap,
  initialState
)

export default reducer;
