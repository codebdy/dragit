import { Action, handleActions } from 'redux-actions';
import {closeAreaSelectAction, openAreaSelectAction, designPageContentAction, cancelPageContentAction } from "./actions";

const initialState:{
  areaSelect:boolean, 
  pageContentDesign:boolean,
  pageId:string,
  pageJson:any,
} = 
  {
    areaSelect: false,
    pageContentDesign: false,
    pageId:'',
    pageJson:undefined,
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
      pageId: action.payload.pageId,
      pageJson: action.payload.pageJson,
    };
  },
  [cancelPageContentAction().type]: (state:State, action:Action<any>) => {
    return {
      ...state,
      pageContentDesign: false,
    };
  },
}

const reducer = handleActions(
  actionMap,
  initialState
)

export default reducer;
