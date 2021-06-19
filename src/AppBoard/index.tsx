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
import ModuleSkeleton from './AppBoardSkeleton';
import { SidebarLinks } from './Sidebar/SidebarLinks';
import ListLoadingSkeleton from './Sidebar/ListLoadingSkeleton';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import { useLoginCheck } from 'Store/Helpers/useLoginCheck';
import { IRxApp } from 'Base/Model/IRxApp';
import { useMagicQuery } from 'Data/useMagicQuery';
import { MagicQueryBuilder } from 'Data/MagicQueryBuilder';
import { RxApp } from 'modelConstants';

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
  
  useLoginCheck();
  
  const{ loading, error, data } = useMagicQuery<IRxApp>(
    new MagicQueryBuilder()
      .setModel(RxApp)
      .addCondition('id', parseInt(appId))
      .setGetOne()
  );

  useShowServerError(error);

  useEffect(()=>{
    data?.data && appboardStore.setRxApp(data?.data);
  },[data, appboardStore])
  
  const theme = createMuiTheme({
    palette: {
      type: appboardStore.themeSettings.themeMode,
      primary:{
        main: appboardStore.themeSettings.primary,
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
        <div className={classes.root} style={{backgroundColor:theme.palette.background.default}}>
          <Sidebar>
            {
              loading
              ? <ListLoadingSkeleton/>
              : <SidebarLinks 
                  items = {appboardStore.rxApp?.navigationItems||[]}
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