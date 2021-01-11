import React from 'react';
import {makeStyles, Theme, createStyles, Drawer, IconButton, Typography, Divider, createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '@material-ui/icons';
import Scrollbar from 'AdminBoard/Common/Scrollbar';
import { useThemeSettings } from 'Store/Helpers/useAppStore';
import useShadows from 'Utils/useShadows';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: theme.shadows[20],
      transition: "all 0.3s",
      display:'flex',
      flexFlow:'column',
      marginRight:'-1px',
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
  }),
);

export default function PageDrawer(
  props:{
    title?:string,
    open:boolean,
    onClose:()=>void,
    children:any,
    width?:number,
  }
){
  const {title, open, onClose, width = 430, children} = props;
  const classes = useStyles();
  const themeSettings = useThemeSettings();
  
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: themeSettings.themeMode as any,
      primary:{
        main: themeSettings.primary,
      },

    },

    shadows:[...useShadows()] as any
  }));

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        variant = 'temporary'
        anchor="right" 
        open={open}
        elevation = {12}
        onClose = {onClose}
      >
        <MuiDialogTitle disableTypography className = {classes.title}>
          <Typography variant="h6">{title}</Typography>
          {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <Close />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
        <Divider />
        <Scrollbar className={classes.content} >
          <div style={{width:width + 'px', display:'flex', flexFlow:"column", flex:1}}>
            {children}            
          </div>
        </Scrollbar>
      </Drawer>
    </ThemeProvider>
  )
}
