import React, { Fragment } from 'react';
import { createStyles, Divider, makeStyles, Theme, Typography } from '@material-ui/core';

import useThemeSettings from 'store/theme/useThemeSettings';
import { useDispatch } from 'react-redux';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorBlock:{
      width:'50px',
      height:'80px',
      border:'solid 1px',
      borderRadius:'10px',
      cursor:"pointer",
      margin:theme.spacing(1),
    },
  }),
);

function MaskBlock(
  props:{
    mask:string,
    borderColor?:string,
  }
){
  const {mask, borderColor} = props;
  const classes = useStyles();
  return (
    <div className = {classes.colorBlock} 
      style={{
        backgroundImage : mask,
        borderColor: borderColor||'transparent',
        opacity: ".9",
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
      >{intl.get('sidebar-color')}</Typography>
      <div className = {classes.content}>
        <MaskBlock mask="linear-gradient(45deg,#ffffff,#ffffff)" borderColor="#000"/>
        <MaskBlock mask="linear-gradient(45deg,#780206,#061161)"/>
        <MaskBlock mask="linear-gradient(45deg,#33001b,#ff0084)"/>
        <MaskBlock mask="linear-gradient(45deg,#360033,#0b8793)"/>
        <MaskBlock mask="linear-gradient(45deg,#000000,#000000)" borderColor="#fff"/>
      </div>
      <Divider />
      <Typography 
        variant="subtitle1"
        className = {classes.title}
      >{intl.get('sidebar-image')}</Typography>
      <div className = {classes.content}>
        
      </div>
    </Fragment>
  )
}
