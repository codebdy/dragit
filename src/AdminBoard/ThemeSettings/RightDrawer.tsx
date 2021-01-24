import React from 'react';
import {makeStyles, Theme, createStyles, Drawer, IconButton, Typography, Divider, createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core';
import classNames from 'classnames';
import DialogTitle from '@material-ui/core/DialogTitle';
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
  }),
);

export default function RightDrawer(
  props:{
    title?:string,
    open:boolean,
    onClose:()=>void,
    children:any,
  }
){
  const {title, open, onClose, children} = props;
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
        variant = 'permanent'
        anchor="right" 
        open={open}
        elevation = {12}
        classes = {{
          paper: classNames(classes.root, open ? classes.openStatus : classes.closeStatus)
        }}
        onClose = {onClose}
      >
        <DialogTitle disableTypography className = {classes.title}>
          <Typography variant="h6">{title}</Typography>
          {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <Close />
            </IconButton>
          ) : null}
        </DialogTitle>
        <Divider />
        <Scrollbar className={classes.content}>
          {children}
        </Scrollbar>
      </Drawer>
    </ThemeProvider>
  )
}
