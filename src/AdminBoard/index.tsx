import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Sidebar from 'AdminBoard/Sidebar';
import {TopNav} from 'AdminBoard/TopNav';
import { Workspace } from 'AdminBoard/Workspace';
import { useLoginCheck } from 'store/helpers/useLoginCheck';
import { LeftDrawerWidthPlaceholder } from './Sidebar/LeftDrawer/LeftDrawerWidthPlaceholder';
import { AreaSelect } from 'design/AreaSelect';
import { useLeftDrawer } from 'store/helpers/useAppStore';
import {observer} from 'mobx-react-lite';

const useStyles = makeStyles(() =>
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
  useLoginCheck();

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
        <Workspace>
          {/*<Switch>
            <Route path="/admin/module/:moduleSlug/:pageSlug?/:id?" component={PageView}></Route> 
            <Route path="/admin/error-404" component={Page404}></Route>
            {//<Redirect to="/admin/module/:moduleId/page/index" from='/admin/module/:moduleId/' />
            } 
            <Redirect to="/admin/page/dashboard" from='/admin' /> 
          </Switch>*/}
        </Workspace>
      </div>
      <AreaSelect></AreaSelect>
    </div>
  )
})