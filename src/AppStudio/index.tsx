import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { VerticalBar } from './VerticalBar';
import { AppBar, Toolbar, IconButton, ThemeProvider, createMuiTheme } from '@material-ui/core';
import MdiIcon from 'Components/common/MdiIcon';
import { useState } from 'react';
import { AppStudioStore, AppStudioStoreProvider } from './AppStudioStore';
import Spacer from 'Components/common/Spacer';
import { useHistory, useRouteMatch } from 'react-router';
import { useEffect } from 'react';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import AppSkeleton from './AppSkeleton';
import { WorkSpace } from './WorkSpace';
import { DARK } from 'AppBoard/store/ThemeSettings';
import { SavePageButton } from './RxPageEditor/SavePageButton';
import intl from 'react-intl-universal';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { SaveNavigationButton } from './RxNavigationEditor/SaveNavigationButton';
import { INDEX_URL } from 'Utils/consts';
import { useLoginCheck } from 'Store/Helpers/useLoginCheck';
import { API_MAGIC_QUERY } from 'APIs/magic';
import { useMagicQuery } from 'Data/useMagicQuery';
import { MagicQueryBuilder } from 'Data/MagicQueryBuilder';
import { RxApp } from 'MainBoard/constants';
import { IRxApp } from 'Base/Model/IRxApp';

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
      //backgroundColor: theme.palette.background.default,
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
  const dragItStore = useDragItStore();
  const history = useHistory();
  const match = useRouteMatch();
  const{appId} = match.params as any;
  
  useLoginCheck();

  const theme = createMuiTheme({
    palette: {
      type:studioStore?.themeMode,
      primary:{
        main:'#5a8dee',
      },
      text:{
        primary:studioStore?.themeMode === DARK ? '#909eaf' :'#8494a7',
      },
      background:{
        default: studioStore?.themeMode === DARK ? '#272e48' : '#FFF',
        paper: studioStore?.themeMode === DARK ? '#1a233a' : '#f2f4f4',
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
        paper: studioStore?.themeMode === DARK ? '#272e48' : '#FFF',
      }
    },
  });
  const { loading, error, data } = useMagicQuery<IRxApp>(
    new MagicQueryBuilder()
      .setModel(RxApp)
      .addCondition('id', appId)
      .addRelation('auths')
      .addRelation('pages')
      .addRelation('entryPage')
      .setGetOne()
  );

  /*useEffect(()=>{
    if(appId){
      excuteQuery({variables:{id: appId}});
    }
  },[appId, excuteQuery]);*/

  useEffect(()=>{
    //console.log(data);
    data?.data && studioStore.setRxApp(data?.data);
  },[data, studioStore])

  useShowServerError(error)

  const handleBack = ()=>{
    if(studioStore?.pageEditor?.isDirty || studioStore?.navigationEditor?.isDirty){
      dragItStore?.confirmAction(intl.get('changing-not-save-message'),()=>{
        history.push(INDEX_URL);
      })       
    }
    else{
      history.push(INDEX_URL);
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <AppStudioStoreProvider value = {studioStore}>
        <div className={classes.root} style={{background:theme.palette.background.default}}>
          <VerticalBar />
          <ThemeProvider theme={appbarTheme}>
            <AppBar position="static" color="inherit" variant = 'outlined'>
              <Toolbar variant="dense">
                <div style={{width:'50px'}}></div>
                <IconButton edge="start" onClick={handleBack}>
                  <MdiIcon iconClass = "mdi-arrow-left" color={appbarTheme.palette.type === DARK ? '#8a99b5' : "#475f7b"}/>
                </IconButton>
                <Spacer />
                {
                  studioStore?.pageEditor &&
                  <SavePageButton />
                }
                {
                  studioStore?.navigationEditor &&
                  <SaveNavigationButton />
                }        
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
