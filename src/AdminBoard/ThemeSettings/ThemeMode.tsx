import React, { Fragment } from 'react';
import { FormControlLabel, Radio, Typography } from '@material-ui/core';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';
import { useThemeSettings } from 'store1/helpers1/useAppStore';
import {observer} from "mobx-react-lite";
import { DARK, LIGHT, linearGradient1, linearGradient5 } from 'store1/ThemeSettings';

export const ThemeMode = observer(()=>{
  const classes = useRowStyles();
  const themeSettings = useThemeSettings();

  const sidebarSkin = themeSettings.leftDrawerSkin;

  const handleChangeToLignt = ()=>{
    themeSettings.setThemeMode(LIGHT);
    sidebarSkin.setMode(LIGHT);
    sidebarSkin.setMask(linearGradient1);
  }

  const hangdeChangeToDark = ()=>{
    themeSettings.setThemeMode(DARK);
    sidebarSkin.setMode(DARK);
    sidebarSkin.setMask(linearGradient5);
  }
  
  return (
    <Fragment>
      <Typography variant="subtitle1">{intl.get('theme-mode')}</Typography>
      <div className = {classes.content}>
        <FormControlLabel 
          value="end" 
          control={
            <Radio 
              color="primary"
              checked = {themeSettings.themeMode === LIGHT}
              onChange = {(e)=>{
                e.target.checked && handleChangeToLignt()
              }} 
            />
          } 
          label={intl.get('light')}
        />
        <FormControlLabel 
          value="end" 
          control={
            <Radio 
            color="primary"
            checked = {themeSettings.themeMode === DARK}
            onChange = {(e)=>{
              e.target.checked && hangdeChangeToDark()
            }}  
          />
          } 
          label={intl.get('dark')} 
        />
      </div>
    </Fragment>
  )
})
