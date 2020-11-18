import { Action } from 'redux-actions';
import {setElevationStrengthAction, setPrimaryColorAction, setSiderbarSkinAction, setThemeModeAction} from "./actions";
import sidebarImg1 from 'assets/img/sidebar-1.jpg';
import sidebarImg2 from 'assets/img/sidebar-2.jpg';
import sidebarImg3 from 'assets/img/sidebar-3.jpg';
import sidebarImg4 from 'assets/img/sidebar-4.jpg';
import sidebarImg5 from 'assets/img/sidebar-5.jpg';
import { DARK } from './useThemeSettings';

const initialState = {
  themeMode: 'light',
  elevationStrength: 4,
  primary:'#5d78ff',
  siderbarSkin:{
    image:sidebarImg5,
    maskLinearGradient:'linear-gradient(45deg,#780206,#061161)',
    mode:DARK,
  },
};

type State = typeof initialState


function reducer(
  state = initialState,
  action: Action<any>
): State {
  if(action.type === setThemeModeAction().type){
    return {
      ...state,
      themeMode: action.payload,
    };
  }

  if(action.type === setElevationStrengthAction().type){
    return {
      ...state,
      elevationStrength: action.payload,
    };
  }
  
  if(action.type === setPrimaryColorAction().type){
    return {
      ...state,
      primary: action.payload,
    };
  }

  if(action.type === setSiderbarSkinAction().type){
    return {
      ...state,
      siderbarSkin: action.payload,
    };
  }
  return state
}

export default reducer;
export {sidebarImg1, sidebarImg2, sidebarImg3, sidebarImg4, sidebarImg5}
