import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { responsiveFontSizes, createMuiTheme, ThemeProvider } from '@material-ui/core';

import TopNavHeightPlaceholder from 'AdminBoard/TopNav/TopNavHeightPlaceholder';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row',
      height:'100%',
      flex:'1',
    },

    rightArea:{
      flex:1,
      display:'flex',
      flexFlow:'column',
      justifyContent: 'stretch',
      height:'100%',
    },
    designButton:{
      boxShadow: theme.shadows[10],
    },

    designButtonIcon:{
      marginRight: theme.spacing(1),
    },
    pageContentArea:{
      flex:1,
      background: theme.palette.background.default,
      overflow: 'auto',
      display:'flex',
      flexFlow:'column',
    },

    toolboxIcon:{
      marginRight:theme.spacing(2),
    },

    toolbar:{
      background:"#3e3e54",
      //boxShadow: theme.shadows[6],
    },
    cancelButton:{
      marginRight:theme.spacing(1),
    },
    scrollBar:{
      flex:1,
      display:'flex',
      flexFlow: 'column',
    },

    toolbarButton:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      width:'40px',
      height:'40px',
      borderRadius:'3px',
      margin:'1px',
      "&:hover":{
        background:"rgba(255,255,255, 0.1)",
      },
      cursor:"pointer",
    },
    checkedButton:{
      background:"rgba(255,255,255, 0.15)",
      "&:hover":{
        background:"rgba(255,255,255, 0.2)",
      },
    }
  }),
);

const darkTheme = responsiveFontSizes(createMuiTheme({
  palette: {
    type: 'dark',
    primary:{
      main:"#5d78ff",
    },
    //secondary:{
      //main:"#ff9e43",
    //},    
  },
}));

export function ToolbarIcon(props:{checked?:boolean, onClick?:()=>void, children?:any}){
  const{checked, onClick, children} = props;
  const classes = useStyles();

  return (
    <div className={ classNames(classes.toolbarButton, {[classes.checkedButton]:checked}) }
      onClick = {onClick}
    >
      {children}
    </div>
  )
}

export default function DesignerLayout(
  props:{
    leftArea?:any,
    toolbar?:any,
    children?:any
  }
) {
  const{leftArea, toolbar, children} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        {leftArea}
      </ThemeProvider>
      <div 
        className = {classes.rightArea}
      >
        <ThemeProvider theme={darkTheme}>
          <TopNavHeightPlaceholder className={classes.toolbar}>
            {toolbar}
          </TopNavHeightPlaceholder>
        </ThemeProvider>
        <div className={classNames(classes.pageContentArea) }>
          {children}
        </div>
      </div>
    </div>
  );
}