import React from 'react';
import { makeStyles, createStyles, Theme, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import MdiIcon from 'Components/common/MdiIcon';
import { useLeftDrawer } from 'Store/Helpers/useDragItStore';
import { useThemeSettings } from "AppBoard/store/useThemeSettings";
import {observer} from 'mobx-react';
import { DARK } from 'AppBoard/store/ThemeSettings';
import { DebugModelTree } from './DebugModelTree';
import { Fab, Hidden } from '@material-ui/core';
import { DebugStore, DebugStoreProvider } from './DebugStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    debugButton: {
      position: 'fixed',
      bottom: '4px',
      transition: 'left 0.3s',
      width:'40px',
      height:'40px',
    },
    menuItem:{
      padding:theme.spacing(1, 3),
    },
  }),
);

export const Debug = observer(()=>{
  const classes = useStyles();
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


  const handleOpentree = () => {
    setTreeOpen(true);
  };

  const handleCloseTree = ()=>{
    setTreeOpen(false);
  }

  return (
    <Hidden smDown>
      <DebugStoreProvider value = {new DebugStore()}>
        <Fab 
          className = {classes.debugButton} 
          style={{left:(fabLeft + 4) + 'px'}}
          color = "primary"
          onClick={handleOpentree}
        >
          <MdiIcon iconClass = "mdi-android-debug-bridge" size={20}/>
        </Fab>
        <ThemeProvider theme={theme}>
          {
            treeOpen &&
            <DebugModelTree open={treeOpen} onClose = {handleCloseTree} />
          }          
        </ThemeProvider>
        </DebugStoreProvider>
    </Hidden>
  );
})
