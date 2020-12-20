import React from 'react';
import {makeStyles, Theme, createStyles, Drawer, IconButton, Typography, Divider, createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core';
import Scrollbar from 'admin/common/Scrollbar';
import classNames from 'classnames';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '@material-ui/icons';
import intl from "react-intl-universal";
import useShadows from 'utils/useShadows';
import { useThemeSettings } from 'store/helpers/useAppStore';
import { ThemeMode } from './ThemeMode';
import { ThemeColor } from './ThemeColor';
import { ToolbarSettings } from './ToolbarSettings';
import { ElevationStrength } from './ElevationStrength';
import { SidebarSettings } from './SidebarSettings';

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

export default function ThemeSettings(
  props:{
    open:boolean,
    onClose:()=>void
  }
){
  const {open, onClose} = props;
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
          <ThemeMode />
          <Divider />
          <ThemeColor />
          <Divider />
          <SidebarSettings/>
          <Divider />
          <ToolbarSettings />
          <Divider />
          <ElevationStrength />
        </Scrollbar>
      </Drawer>
    </ThemeProvider>
  )
}
