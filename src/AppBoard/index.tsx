import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Sidebar from 'AppBoard/Sidebar';
import {TopNav} from 'AppBoard/TopNav';
import { Workspace } from 'AppBoard/Workspace';
import { LeftDrawerWidthPlaceholder } from './Sidebar/LeftDrawer/LeftDrawerWidthPlaceholder';
import {observer} from 'mobx-react';
import { ThemeSettings } from './ThemeSettings';
import { useLeftDrawer } from 'Store/Helpers/useDragItStore';

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


export const AdminBoard = observer(()=>{
  const leftDrawer = useLeftDrawer();
  const handleOpenMobileDrawer = () => {
    leftDrawer.openOnMobile();
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <TopNav onSidebarToggle = {handleOpenMobileDrawer}/>

      <div className={classes.content}>
        <LeftDrawerWidthPlaceholder />
        <Workspace />
      </div>
      <ThemeSettings />
    </div>
  )
})