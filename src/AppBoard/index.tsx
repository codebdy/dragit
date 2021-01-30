import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme, createMuiTheme, ThemeProvider, Container } from '@material-ui/core';
import Sidebar from 'AppBoard/Sidebar';
import {TopNav} from 'AppBoard/TopNav';
import { Workspace } from 'AppBoard/Workspace';
import { LeftDrawerWidthPlaceholder } from './Sidebar/LeftDrawer/LeftDrawerWidthPlaceholder';
import {observer} from 'mobx-react';
import { ThemeSettings } from './ThemeSettings';
import { useLeftDrawer } from 'Store/Helpers/useDragItStore';
import useShadows from 'Utils/useShadows';
import { AppBoardStore, AppBoardStoreProvider } from './store/AppBoardStore';
import { useRouteMatch } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_RX_APP } from 'Base/GraphQL/GQLs';
import ModuleSkeleton from './Workspace/Common/ModuleSkeleton';
import { SidebarLinks } from './Sidebar/SidebarLinks';
import SiderBarLoadingSkeleton from './Sidebar/LoadingSkeleton';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';

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
  const classes = useStyles();  
  const leftDrawer = useLeftDrawer();
  const [appboardStore] = useState(new AppBoardStore());
  const match = useRouteMatch();
  const{appId} = match.params as any;
  
  const [excuteQuery, { loading, error, data }] = useLazyQuery(GET_RX_APP,{
    notifyOnNetworkStatusChange: true
  });

  useShowAppoloError(error);

  useEffect(()=>{
    if(appId){
      excuteQuery({variables:{id:appId}});
    }
  },[appId, excuteQuery]);

  useEffect(()=>{
    appboardStore.setRxApp(data?.rxApp);
  },[data, appboardStore])
  
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


  return (
    <AppBoardStoreProvider value = {appboardStore}>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Sidebar>
            {
              loading
              ? <SiderBarLoadingSkeleton/>
              : <SidebarLinks 
                  mini ={leftDrawer.isMini}
                  fullWidth = {leftDrawer.fullWidth}
                  items = {appboardStore.rxApp?.navigation_items}
                />  
            }            
          </Sidebar>
          <TopNav onSidebarToggle = {handleOpenMobileDrawer}/>

          <div className={classes.content}>
            <LeftDrawerWidthPlaceholder />
            {
              loading
              ? <Container><ModuleSkeleton /></Container>
              : (appboardStore?.rxApp && <Workspace />)
            }
            
          </div>
          <ThemeSettings />
        </div>
      </ThemeProvider>
    </AppBoardStoreProvider>
  )
})