import React, { Fragment } from 'react';
import { FormControlLabel, Radio, Typography } from '@material-ui/core';
import { setThemeModeAction } from 'store/theme/actions';
import useThemeSettings, { LIGHT, DARK, SEMI_DARK } from 'store/theme/useThemeSettings';
import { useDispatch } from 'react-redux';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';

export default function ThemeMode(){
  const classes = useRowStyles();
  const themeSettings = useThemeSettings();
  const dispatch = useDispatch()
  
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
                e.target.checked && dispatch(setThemeModeAction(LIGHT))
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
              e.target.checked && dispatch(setThemeModeAction(DARK))
            }}  
          />
          } 
          label={intl.get('dark')} 
        />
        <FormControlLabel 
          value="end" 
          control={
            <Radio 
            color="primary"
            checked = {themeSettings.themeMode === SEMI_DARK}
            onChange = {(e)=>{
              e.target.checked && dispatch(setThemeModeAction(SEMI_DARK))
            }}  
          />
          } 
          label={intl.get('semi-dark')} 
        />
      </div>
    </Fragment>
  )
}
