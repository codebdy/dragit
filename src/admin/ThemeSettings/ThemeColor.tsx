import React, { Fragment } from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

import useThemeSettings from 'store/theme/useThemeSettings';
import { useDispatch } from 'react-redux';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';
import classNames from 'classnames';
import { setPrimaryColorAction } from 'store/theme/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorBlock:{
      width:'30px',
      height:'30px',
      border:'solid 1px',
      borderRadius:'8px',
      cursor:"pointer",
      margin:theme.spacing(1),
    },
    selected:{
      boxShadow: "0 0 0 2px rgba(26, 92,255, 0.4)"
    }
  }),
);

function ColorBlock(
  props:{
    selectedColor:string,
    color:string,
    borderColor?:string,
  }
  
){
  const {selectedColor, color, borderColor} = props;
  const classes = useStyles();
  const dispatch = useDispatch()
  const selected = color === selectedColor;
  
  const handleClick = ()=>{
    dispatch(setPrimaryColorAction(color))
  }
  
  return (
    <div className = {classNames(classes.colorBlock, {[classes.selected]:selected})} 
      style={{
        backgroundColor : color,
        borderColor: borderColor||color
      }}
      onClick={handleClick}
    ></div>
  )
}

export default function ThemeColor(){
  const classes = useRowStyles();
  const themeSettings = useThemeSettings();
 
  return (
    <Fragment>
      <Typography 
        variant="subtitle1"
        className = {classes.title}
      >{intl.get('theme-color')}</Typography>
      <div className = {classes.content}>
        <ColorBlock selectedColor={themeSettings.primary} color="#ffffff" borderColor="#000"/>
        <ColorBlock selectedColor={themeSettings.primary} color="#5d78ff"/>
        <ColorBlock selectedColor={themeSettings.primary} color="#28c76f"/>
        <ColorBlock selectedColor={themeSettings.primary} color="#ea5455"/>
        <ColorBlock selectedColor={themeSettings.primary} color="#ff9f43"/>
        <ColorBlock selectedColor={themeSettings.primary} color="#3dc9b3"/>
        <ColorBlock selectedColor={themeSettings.primary} color="#1e1e1e" borderColor="#fff"/>
      </div>
    </Fragment>
  )
}
