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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      height:'100%',
      flex:1,
      display:'flex',
      flexFlow:'column',
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
          <div className={classes.workspace}>
            <div style={{width:studioStore.verticalBarWidth}}></div>
            <div>ddd</div>
          </div>
        </div>
      </AppStudioStoreProvider>
    </ThemeProvider>
  );
})
