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
import { DARK } from 'Store/ThemeSettings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      height:'100%',
      flexGrow:1,
    },
  }),
);

export const AppStudio = observer(() => {
  const classes = useStyles();
  const [studioStore] = useState(new AppStudioStore());
  const theme = createMuiTheme({
    palette: {
      primary:{
        main:'#5a8dee',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppStudioStoreProvider value = {studioStore}>
        <div className={classes.root} style={{background:theme.palette.background.default}}>
          <VerticalBar />
          <AppBar position="static" color="transparent" variant="outlined">
            <Toolbar variant="dense">
              <div style={{width:studioStore.verticalBarWidth}}></div>
              <IconButton edge="start">
                <MdiIcon iconClass = "mdi-arrow-left" color="#475f7b"/>
              </IconButton>
              <Spacer />
              <Button variant = "contained" color= "primary">
                {intl.get('save')}
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </AppStudioStoreProvider>
    </ThemeProvider>
  );
})
