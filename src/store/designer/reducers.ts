import { Action, handleActions } from 'redux-actions';
import {closeAreaSelectAction, openAreaSelectAction, openDesignerAction, cancelPageContentAction, showOutlineActon, showPaddingXActon, showPaddingYActon, setDesingerPageAction } from "./actions";

const initialState:{
  areaSelect:boolean, 
  opened:boolean,
  pageSlug:string,
  showOutline:boolean,
  showPaddingX:boolean,
  showPaddingY:boolean,
} = 
  {
    areaSelect: false,
    opened: false,
    pageSlug:'',
    showOutline:true,
    showPaddingX:true,
    showPaddingY:true,  
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

  [openDesignerAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      opened: true,
    };
  },
  [setDesingerPageAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      pageSlug: action.payload,
    };
  },

  
  [cancelPageContentAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      opened: false,
    };
  },

  [showOutlineActon().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      showOutline: action.payload,
    };
  },
  [showPaddingXActon().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      showPaddingX: action.payload,
    };
  },
  [showPaddingYActon().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      showPaddingY: action.payload,
    };
  },

}

const reducer = handleActions(
  actionMap,
  initialState
)

export default reducer;
