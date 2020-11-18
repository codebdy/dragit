import React, { Fragment } from 'react';
import { FormControlLabel, Radio, Typography } from '@material-ui/core';
import { setSiderbarSkinAction, setThemeModeAction } from 'store/theme/actions';
import useThemeSettings, { LIGHT, DARK } from 'store/theme/useThemeSettings';
import { useDispatch } from 'react-redux';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';
import useSidebarSkin from 'store/theme/useSidebarSkin';
import { linearGradient1, linearGradient5 } from 'store/theme/reducers';

export default function ThemeMode(){
  const classes = useRowStyles();
  const themeSettings = useThemeSettings();
  const dispatch = useDispatch();

  const sidebarSkin = useSidebarSkin();

  const handleChangeToLignt = ()=>{
    dispatch(setThemeModeAction(LIGHT))
    dispatch(setSiderbarSkinAction({...sidebarSkin, mode:LIGHT, maskLinearGradient:linearGradient1}))
  }

  const hangdeChangeToDark = ()=>{
    dispatch(setThemeModeAction(DARK));
    dispatch(setSiderbarSkinAction({...sidebarSkin, mode:DARK, maskLinearGradient:linearGradient5}))
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
}
