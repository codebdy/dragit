import React from 'react';
import { CssBaseline, makeStyles, Theme, createStyles } from '@material-ui/core';
import Sidebar, { createSidebarTheme } from 'admin/Sidebar';
import image5 from 'assets/img/sidebar-5.jpg';
import SidebarWidthPlaceholder from 'admin/Sidebar/SidebarWidthPlaceholder';
import TopNav from 'admin/TopNav/TopNav';
import FixedBar from 'admin/FixedBar';
import PageContent from 'admin/PageContent';
//import Dashboard from 'views/Dashboard/Dashboard';
import { Redirect, Switch, Route } from 'react-router-dom';
import Medias from 'components/Medias/Medias';
import AreaSelect from 'designer/PageEditor/AreaSelect';
import PageView from 'admin/views/Page/PageView';
import Dashboard from 'admin/views/Dashboard/Dashboard';
import SuccessAlertBar from './SuccessAlertBar';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import PageEditor from 'designer/PageEditor';

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
  const selectMyStore = (state: RootState) => state.designer
  const myStore = useSelector(selectMyStore)

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
      {myStore.pageContentDesign && <PageEditor></PageEditor>}
      {<FixedBar />}
      <SuccessAlertBar />
    </div>
  )
}