import React, { Fragment } from 'react';
import { FormControlLabel, Switch, Typography } from '@material-ui/core';
import { setToolbarSkinAction } from 'store/theme/actions';
import { useDispatch } from 'react-redux';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';
import useToolbarSkin from 'store/theme/useToolbarSkin';

export default function ToolbarSettings(){
  const classes = useRowStyles();
  const dispatch = useDispatch();

  const toolbarSkin = useToolbarSkin();

  const handleFloatChange = (floatStyle:boolean)=>{

    dispatch(setToolbarSkinAction({...toolbarSkin, floatStyle}))
  }

  const hangdeColorChange = (colored:boolean)=>{
    dispatch(setToolbarSkinAction({...toolbarSkin, colored}))
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
}
