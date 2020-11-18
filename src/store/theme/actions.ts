import { createAction } from 'redux-actions';

const setThemeModeAction = createAction('SET_THEME_MODE');
const setElevationStrengthAction  = createAction('SET_ELEVATION_STRENGTH');

export {
  setThemeModeAction,
  setElevationStrengthAction
};