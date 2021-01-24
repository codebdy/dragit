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
    },
    workspace:{
      display:'flex',
      flex:1,
    }
  }),
);

const theme = createMuiTheme({
  palette: {
    primary:{
      main:'#5a8dee',
    },
  },
});

export const AppStudio = observer(() => {
  const classes = useStyles();
  const [studioStore] = useState(new AppStudioStore());
  const history = useHistory();
  const match = useRouteMatch();
  const{id} = match.params as any;

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
          <AppBar position="static" color="transparent" variant="outlined">
            <Toolbar variant="dense">
              <div style={{width:studioStore.verticalBarWidth}}></div>
              <IconButton edge="start" onClick={handleBack}>
                <MdiIcon iconClass = "mdi-arrow-left" color="#475f7b"/>
              </IconButton>
              <Spacer />
              <Button variant = "contained" color= "primary">
                {intl.get('save')}
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <div style={{width:studioStore.verticalBarWidth}}></div>
            <div className={classes.workspace}>
              {
                loading 
                ? <AppSkeleton />
                : 'ddd'
              }
            </div>
          </div>
        </div>
      </AppStudioStoreProvider>
    </ThemeProvider>
  );
})
