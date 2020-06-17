import { Action, handleActions } from 'redux-actions';
import {closeAreaSelectAction, openAreaSelectAction, designPageContentAction, cancelPageContentAction } from "./actions";

const initialState:{
  areaSelect:boolean, 
  pageContentDesign:boolean,
} = 
  {
    areaSelect: false,
    pageContentDesign: false,
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
}

const reducer = handleActions(
  actionMap,
  initialState
)

export default reducer;
