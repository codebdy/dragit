import { Action, handleActions } from 'redux-actions';
import {closeAreaSelectAction, openAreaSelectAction, designPageContentAction, cancelPageContentAction, showOutlineActon, showPaddingXActon, showPaddingYActon } from "./actions";

const initialState:{
  areaSelect:boolean, 
  opened:boolean,
  pageId:string,
  pageJson:any,
  showOutline:boolean,
  showPaddingX:boolean,
  showPaddingY:boolean,
} = 
  {
    areaSelect: false,
    opened: false,
    pageId:'',
    pageJson:undefined,
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

  [designPageContentAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      opened: true,
      pageId: action.payload.pageId,
      pageJson: action.payload.pageJson,
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
