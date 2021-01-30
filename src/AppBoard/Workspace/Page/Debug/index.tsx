import React from 'react';
import { makeStyles, createStyles, Theme, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import MdiIcon from 'Components/Common/MdiIcon';
import intl from 'react-intl-universal';
import { SpeedDialIcon } from '@material-ui/lab';
import GraphQLDebug from './DebugGraphQL';
import { useLeftDrawer } from 'Store/Helpers/useDragItStore';
import { useThemeSettings } from "AppBoard/store/useThemeSettings";
import {observer} from 'mobx-react';
import { DARK } from 'AppBoard/store/ThemeSettings';
import { DebugModelTree } from './DebugModelTree';
import { Hidden } from '@material-ui/core';
import { DebugStore, DebugStoreProvider } from './DebugStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: 'fixed',
      bottom: 0,
      transition: 'left 0.3s',
    },
  }),
);

export const Debug = observer(()=>{
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [gqlOpen, setGqlOpen] = React.useState(false);
  const [treeOpen, setTreeOpen] = React.useState(false);
  const leftDrawer = useLeftDrawer();
  const fabLeft = leftDrawer.isMini ? leftDrawer.compactWidth : leftDrawer.fullWidth;
  const themeSettings = useThemeSettings();
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: DARK,
      primary:{
        main:themeSettings.primary,
      },
      background:{
        paper:'#212121',
      }
    },
    
  }));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = ()=>{
    setOpen(false);
  }

  const handleOpentree = () => {
    setOpen(false);
    setTreeOpen(true);
  };

  const handleCloseTree = ()=>{
    setTreeOpen(false);
  }

  const handleOpenGql = ()=>{
    setOpen(false);
    setGqlOpen(true);
  }
  
  return (
    <Hidden smDown>
      <DebugStoreProvider value = {new DebugStore()}>
        <SpeedDial
          ariaLabel="Debug SpeedDial"
          className={classes.speedDial}
          icon={
            <SpeedDialIcon 
              icon={<MdiIcon iconClass = "mdi-android-debug-bridge"/>}
              openIcon={<MdiIcon iconClass = "mdi-close"/>}
            />
          }
          hidden = {treeOpen || gqlOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction='up'
          style={{left:(fabLeft) + 'px'}}
        >
          <SpeedDialAction
            icon={<MdiIcon iconClass = "mdi-graphql" />}
            tooltipTitle={'GraphQL ' + intl.get('debug')}
            tooltipPlacement = "right"
            onClick={(handleOpenGql)}
          />
          <SpeedDialAction
            icon={<MdiIcon iconClass = "mdi-file-tree" />}
            tooltipTitle={'Model Tree ' + intl.get('debug')}
            tooltipPlacement = "right"
            onClick={handleOpentree}
          />
        </SpeedDial>
        <ThemeProvider theme={theme}>
          <GraphQLDebug open={gqlOpen} onClose = {()=>setGqlOpen(false)} />
          <DebugModelTree open={treeOpen} onClose = {handleCloseTree} />
        </ThemeProvider>
        </DebugStoreProvider>
    </Hidden>
  );
})
