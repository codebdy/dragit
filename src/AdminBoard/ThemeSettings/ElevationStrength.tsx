import React, { Fragment } from 'react';
import { Slider, Typography } from '@material-ui/core';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';
import {observer} from 'mobx-react';
import { useThemeSettings } from 'Store/Helpers/useAppStore';

export const ElevationStrength = observer(()=>{
  const classes = useRowStyles();
  const themeSettings = useThemeSettings();
  
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
          onChange = {(e,value)=>{themeSettings.setSlevationStrength(value as any)}}
        />
      </div>
    </Fragment>
  )
})
