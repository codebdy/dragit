import React from 'react';
import { makeStyles, Theme, createStyles, Drawer, IconButton, Typography, Divider, FormControlLabel, Radio } from '@material-ui/core';
import Scrollbar from 'admin/common/Scrollbar';
import classNames from 'classnames';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '@material-ui/icons';
import intl from "react-intl-universal";
import useThemeSettings, { DARK, LIGHT, SEMI_DARK } from 'store/theme/useThemeSettings';
import { useDispatch } from 'react-redux';
import { setThemeModeAction } from 'store/theme/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: theme.shadows[20],
      transition: "all 0.3s",
      display:'flex',
      flexFlow:'column',
    },

    openStatus:{
      width:'400px',
    },
    closeStatus:{
      width:'0',
    },
    title: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    content:{
      padding:theme.spacing(1),
    },
    rowContent:{
      padding:theme.spacing(1),
      display:'flex',
      justifyContent:"space-around",
    }
  }),
);

export default function ThemeSettings(
  props:{
    open:boolean,
    onClose:()=>void
  }
){
  const {open, onClose} = props;
  const classes = useStyles();
  const themeSettings = useThemeSettings();
  const dispatch = useDispatch()
  
  return (
    <Drawer
      variant = "permanent"
      anchor="right" 
      open={true}
      elevation = {12}
      classes = {{
        paper: classNames(classes.root, open ? classes.openStatus : classes.closeStatus)
      }}
    >
      <MuiDialogTitle disableTypography className = {classes.title}>
        <Typography variant="h6">{intl.get('theme-settings')}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <Close />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
      <Divider />
      <Scrollbar className={classes.content}>
        <Typography variant="subtitle1">{intl.get('theme-mode')}</Typography>
        <div className = {classes.rowContent}>
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
        <Divider />
      </Scrollbar>
    </Drawer>
  )
}
