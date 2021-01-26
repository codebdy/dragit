import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { VerticalBar } from './VerticalBar';
import { AppBar, Toolbar, IconButton, Button, ThemeProvider, createMuiTheme } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import { useState } from 'react';
import { AppStudioStore, AppStudioStoreProvider } from './AppStudioStore';
import Spacer from 'Components/Common/Spacer';
import intl from 'react-intl-universal';
import { useHistory, useRouteMatch } from 'react-router';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_RX_APP } from 'Base/GraphQL/GQLs';
import { useEffect } from 'react';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import AppSkeleton from './AppSkeleton';
import { WorkSpace } from './WorkSpace';
import { DARK } from 'Store/ThemeSettings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      height:'100%',
      flex:1,
      display:'flex',
      flexFlow:'column',
    },
    content:{
      display:'flex',
      flex:1,
      height:'0',
    },
    workspace:{
      display:'flex',
      flex:1,
    }
  }),
);

export const AppStudio = observer(() => {
  const classes = useStyles();
  const [studioStore] = useState(new AppStudioStore());
  const history = useHistory();
  const match = useRouteMatch();
  const{id} = match.params as any;

  const theme = createMuiTheme({
    palette: {
      type:studioStore?.themeMode,
      primary:{
        main:'#5a8dee',
      },
      text:{
        //primary:studioStore?.themeMode === DARK ? '#909eaf' :'#8494a7',
      },
      background:{
        default: studioStore?.themeMode === DARK ? '#1a233a' : '#f2f4f4',
        paper: studioStore?.themeMode === DARK ? '#272e48' : '#FFF',
      }
    },
  });
  const appbarTheme = createMuiTheme({
    palette: {
      type:studioStore?.themeMode,
      primary:{
        main:'#5a8dee',
      },
      background:{
        default: studioStore?.themeMode === DARK ? '#1a233a' : '#FFF',
        paper: studioStore?.themeMode === DARK ? '#1a233a' : '#FFF',
      }
    },
  });
  const [excuteQuery, { loading, error, data }] = useLazyQuery(GET_RX_APP,{
    notifyOnNetworkStatusChange: true
  });

  useEffect(()=>{
    if(id){
      excuteQuery({variables:{id}});
    }
  },[id, excuteQuery]);

  useEffect(()=>{
    studioStore.setRxApp(data?.rxApp);
  },[data, studioStore])

  useShowAppoloError(error)

  const handleBack = ()=>{
    history.goBack();
  }


  return (
    <ThemeProvider theme={theme}>
      <AppStudioStoreProvider value = {studioStore}>
        <div className={classes.root} style={{background:theme.palette.background.default}}>
          <VerticalBar />
          <ThemeProvider theme={appbarTheme}>
            <AppBar position="static" color="inherit" variant="outlined">
              <Toolbar variant="dense">
                <div style={{width:'50px'}}></div>
                <IconButton edge="start" onClick={handleBack}>
                  <MdiIcon iconClass = "mdi-arrow-left" color={appbarTheme.palette.type === DARK ? '#8a99b5' : "#475f7b"}/>
                </IconButton>
                <Spacer />
                <Button variant = "contained" color= "primary">
                  {intl.get('save')}
                </Button>
              </Toolbar>
            </AppBar>
          </ThemeProvider>
          <div className={classes.content}>
            <div style={{width:studioStore.verticalBarWidth}}></div>
            <div className={classes.workspace}>
              {
                loading 
                ? <AppSkeleton />
                : <WorkSpace />
              }
            </div>
          </div>
        </div>
      </AppStudioStoreProvider>
    </ThemeProvider>
  );
})
