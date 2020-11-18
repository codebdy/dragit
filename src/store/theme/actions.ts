import { createAction } from 'redux-actions';

const setThemeModeAction = createAction('SET_THEME_MODE');
const setElevationStrengthAction  = createAction('SET_ELEVATION_STRENGTH');
const setPrimaryColorAction = createAction('SET_PRIMARY_COLOR');

export {
  setThemeModeAction,
  setElevationStrengthAction,
  setPrimaryColorAction
};