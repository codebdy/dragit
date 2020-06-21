import React from 'react';
import { CssBaseline, makeStyles, Theme, createStyles } from '@material-ui/core';
import Sidebar, { createSidebarTheme } from 'components/Sidebar/Sidebar';
import image5 from 'assets/img/sidebar-5.jpg';
import SidebarWidthPlaceholder from 'components/Sidebar/SidebarWidthPlaceholder';
import TopNav from 'components/TopNav/TopNav';
import FixedBar from 'components/FixedBar/FixedBar';
import PageContent from 'components/PageContent/PageContent';
//import Dashboard from 'views/Dashboard/Dashboard';
import { Redirect, Switch, Route } from 'react-router-dom';
import Medias from 'views/Medias/Medias';
import AreaSelect from 'designer/AreaSelect';
import PageContentDesign from 'designer/PageContentDesign';
import PageView from 'views/Page/PageView';
import Dashboard from 'views/Dashboard/Dashboard';

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

const sidebarTheme1 = createSidebarTheme({
  backgroundImage: image5,
  maskLinearGradient: 'linear-gradient(45deg,#780206,#061161)',
})

export default function Layout(){
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />      
      <Sidebar 
        sidebarTheme={sidebarTheme1} 
        mobileOpen={mobileOpen} 
        //size={SidebarSize.large}
        onMobileClose={handleDrawerToggle}
      />
      <TopNav onSidebarToggle = {handleDrawerToggle}/>

      <div className={classes.content}>
        <SidebarWidthPlaceholder />
        <PageContent>
          <Switch>
            <Route path="/admin/module/:moduleId/:pageId?/:dataId?" component={PageView}></Route> 
            <Route path="/admin/page/:pageId/:dataId?" component={PageView}></Route>
            <Route path="/admin/dashboard" component={Dashboard}></Route>
            <Route path="/admin/medias" component={Medias}></Route>
            {//<Redirect to="/admin/module/:moduleId/page/index" from='/admin/module/:moduleId/' />
            } 
            <Redirect to="/admin/page/dashboard" from='/admin' /> 
          </Switch>
        </PageContent>
      </div>
      <AreaSelect></AreaSelect>
      <PageContentDesign></PageContentDesign>
      <FixedBar />
    </div>
  )
}