import React from 'react';
import { makeStyles, createStyles, Theme, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Sidebar from 'AppBoard/Sidebar';
import {TopNav} from 'AppBoard/TopNav';
import { Workspace } from 'AppBoard/Workspace';
import { LeftDrawerWidthPlaceholder } from './Sidebar/LeftDrawer/LeftDrawerWidthPlaceholder';
import {observer} from 'mobx-react';
import { ThemeSettings } from './ThemeSettings';
import { useLeftDrawer } from 'Store/Helpers/useDragItStore';
import useShadows from 'Utils/useShadows';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight:'100%',
      display:'flex',
      flexFlow:'column',
    },

    content:{
      flex:'1', 
      display:'flex', 
      flexFlow:'row',
      height:'100%',
      width:'100%',
    },
  }),
);


export const AppBoard = observer(()=>{
  const leftDrawer = useLeftDrawer();
  const theme = createMuiTheme({
    palette: {
      type: 'light',
      primary:{
        main: '#5d78ff',
      },

    },

    shadows:[...useShadows()] as any
  });
  
  const handleOpenMobileDrawer = () => {
    leftDrawer.openOnMobile();
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Sidebar />
        <TopNav onSidebarToggle = {handleOpenMobileDrawer}/>

        <div className={classes.content}>
          <LeftDrawerWidthPlaceholder />
          <Workspace />
        </div>
        <ThemeSettings />
      </div>
    </ThemeProvider>
  )
})