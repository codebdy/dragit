import React, { Fragment } from 'react';
import { FormControlLabel, Switch, Typography } from '@material-ui/core';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';
import { useThemeSettings } from 'store1/helpers1/useAppStore';
import {observer} from "mobx-react-lite";

export const ToolbarSettings = observer(()=>{
  const classes = useRowStyles();

  const toolbarSkin = useThemeSettings().toolbarSkin;

  const handleFloatChange = (floatStyle:boolean)=>{
    toolbarSkin.setFloatStyle(floatStyle);
  }

  const hangdeColorChange = (colored:boolean)=>{
    toolbarSkin.setColored(colored);
  }
  
  return (
    <Fragment>
      <Typography variant="subtitle1" className = {classes.title}>{intl.get('toolbar')}</Typography>
      <div className = {classes.content}>
        <FormControlLabel 
          value="end" 
          control={
            <Switch 
              color="primary"
              checked = {toolbarSkin.floatStyle}
              onChange = {(e)=>{
                handleFloatChange(e.target.checked)
              }} 
            />
          } 
          label={intl.get('float-style')}
        />
      </div>
      <div className = {classes.content}>
        <FormControlLabel 
          value="end" 
          control={
            <Switch 
              color="primary"
              checked = {toolbarSkin.colored}
              onChange = {(e)=>{
                hangdeColorChange(e.target.checked)
              }}  
            />
          } 
          label={intl.get('colored')} 
        />
      </div>
    </Fragment>
  )
})
