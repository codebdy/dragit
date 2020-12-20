import React from 'react';
import { CssBaseline, makeStyles, createStyles } from '@material-ui/core';
import Sidebar from 'admin/Sidebar';
import TopNav from 'admin/TopNav';
import PageContent from 'admin/PageContent';
import { Redirect, Switch, Route } from 'react-router-dom';
import AreaSelect from 'designer/AreaSelect';
import PageView from 'admin/views/Page/PageView';
import { useLoginCheck } from 'base/Hooks/useLoginCheck';
import Page404 from './views/Page404';
import { LeftDrawerWidthPlaceholder } from './Sidebar/LeftDrawer/LeftDrawerWidthPlaceholder';

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

export default function Layout(){
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  useLoginCheck();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />      
      <Sidebar 
        mobileOpen={mobileOpen} 
        onMobileClose={handleDrawerToggle}
      />
      <TopNav onSidebarToggle = {handleDrawerToggle}/>

      <div className={classes.content}>
        <LeftDrawerWidthPlaceholder />
        <PageContent>
          <Switch>
            <Route path="/admin/module/:moduleSlug/:pageSlug?/:id?" component={PageView}></Route> 
            <Route path="/admin/error-404" component={Page404}></Route>
            {//<Redirect to="/admin/module/:moduleId/page/index" from='/admin/module/:moduleId/' />
            } 
            <Redirect to="/admin/page/dashboard" from='/admin' /> 
          </Switch>
        </PageContent>
      </div>
      <AreaSelect></AreaSelect>
    </div>
  )
}