import React, { Fragment } from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

import useThemeSettings from 'store/theme/useThemeSettings';
import { useDispatch } from 'react-redux';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorBlock:{
      width:'30px',
      height:'30px',
      border:'solid 1px',
      borderRadius:'6px',
      cursor:"pointer",
      margin:theme.spacing(1),
    },
  }),
);

function ColorBlock(
  props:{
    color:string,
    borderColor?:string,
  }
){
  const {color, borderColor} = props;
  const classes = useStyles();
  return (
    <div className = {classes.colorBlock} 
      style={{
        backgroundColor : color,
        borderColor: borderColor||color
      }}
    ></div>
  )
}

export default function SidebarSettings(){
  const classes = useRowStyles();
  const themeSettings = useThemeSettings();
  const dispatch = useDispatch()
  
  return (
    <Fragment>
      <Typography 
        variant="subtitle1"
        className = {classes.title}
      >{intl.get('sidebar')}</Typography>
      <div className = {classes.content}>
        <ColorBlock color="#ffffff" borderColor="#000"/>
        <ColorBlock color="#5d78ff"/>
        <ColorBlock color="#28c76f"/>
        <ColorBlock color="#ea5455"/>
        <ColorBlock color="#ff9f43"/>
        <ColorBlock color="#3dc9b3"/>
        <ColorBlock color="#1e1e1e" borderColor="#fff"/>
      </div>
    </Fragment>
  )
}
