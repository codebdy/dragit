import { createAction } from 'redux-actions';

const setThemeModeAction = createAction('SET_THEME_MODE');
const setElevationStrengthAction  = createAction('SET_ELEVATION_STRENGTH');
const setPrimaryColorAction = createAction('SET_PRIMARY_COLOR');
const setSiderbarSkinAction = createAction('SET_SIDEBAR_SKIN');
const setToolbarSkinAction = createAction('SET_TOOLBAR_SKIN');

export {
  setThemeModeAction,
  setElevationStrengthAction,
  setPrimaryColorAction,
  setSiderbarSkinAction,
  setToolbarSkinAction
};