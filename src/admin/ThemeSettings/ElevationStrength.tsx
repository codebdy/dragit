import React, { Fragment } from 'react';
import { Slider, Typography } from '@material-ui/core';

import useThemeSettings from 'store/theme/useThemeSettings';
import { useDispatch } from 'react-redux';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';
import { setElevationStrengthAction } from 'store/theme/actions';


export default function ElevationStrength(){
  const classes = useRowStyles();
  const themeSettings = useThemeSettings();
  const dispatch = useDispatch()
  
  return (
    <Fragment>
      <Typography 
        variant="subtitle1"
        className = {classes.title}
      >{intl.get('elevation-strength')}</Typography>
      <div className = {classes.content}>
        <Slider
          value={themeSettings.elevationStrength}
          max = {10}
          step={1}
          valueLabelDisplay="on"
          onChange = {(e,value)=>dispatch(setElevationStrengthAction(value))}
        />
      </div>
    </Fragment>
  )
}
