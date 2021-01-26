import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Sidebar from 'AdminBoard/Sidebar';
import {TopNav} from 'AdminBoard/TopNav';
import { Workspace } from 'AdminBoard/Workspace';
import { LeftDrawerWidthPlaceholder } from './Sidebar/LeftDrawer/LeftDrawerWidthPlaceholder';
import { AreaSelect } from 'Design/AreaSelect';
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
      <AreaSelect></AreaSelect>
      <ThemeSettings />
    </div>
  )
})