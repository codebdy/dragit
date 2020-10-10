import { handleAction, Action } from 'redux-actions';
import {changeSizeAction, compactableAction} from "./actions";
import { SidebarSize } from 'admin/Sidebar';

const initialState = {
  size: SidebarSize.medium,
  compactable: false,
};

type State = typeof initialState

const changeSize = handleAction(changeSizeAction, (state, action) => {
  return {
    ...state,
    size: action.payload,
  };
}, initialState);

const changeCompactable = handleAction(compactableAction, (state, action) => {
  return {
    ...state,
    compactable: !state.compactable,
  };
}, initialState);

function reducer(
  state = initialState,
  action: Action<any>
): State {
  
  if(action.type === changeSizeAction().type){
    return changeSize(state, action)
  }
  if(action.type === compactableAction().type){
    return changeCompactable(state, action)
  }

  return state
}

export default reducer;
