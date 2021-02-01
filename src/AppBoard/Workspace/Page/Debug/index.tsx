import React from 'react';
import { makeStyles, createStyles, Theme, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import MdiIcon from 'Components/common/MdiIcon';
import intl from 'react-intl-universal';
import GraphQLDebug from './DebugGraphQL';
import { useLeftDrawer } from 'Store/Helpers/useDragItStore';
import { useThemeSettings } from "AppBoard/store/useThemeSettings";
import {observer} from 'mobx-react';
import { DARK } from 'AppBoard/store/ThemeSettings';
import { DebugModelTree } from './DebugModelTree';
import { Fab, Hidden,  Menu, MenuItem } from '@material-ui/core';
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [gqlOpen, setGqlOpen] = React.useState(false);
  const [treeOpen, setTreeOpen] = React.useState(false);
  const leftDrawer = useLeftDrawer();
  const fabLeft = leftDrawer.isMini ? leftDrawer.compactWidth : leftDrawer.fullWidth;
  const themeSettings = useThemeSettings();
  const isMenuOpen = Boolean(anchorEl);

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

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = ()=>{
    setAnchorEl(null);
  }

  const handleOpentree = () => {
    setAnchorEl(null);
    setTreeOpen(true);
  };

  const handleCloseTree = ()=>{
    setTreeOpen(false);
  }

  const handleOpenGql = ()=>{
    setAnchorEl(null);
    setGqlOpen(true);
  }
  
  return (
    <Hidden smDown>
      <DebugStoreProvider value = {new DebugStore()}>
        <Fab 
          className = {classes.debugButton} 
          style={{left:(fabLeft + 4) + 'px'}}
          color = "primary"
          onClick = {handleOpen}
        >
          <MdiIcon iconClass = "mdi-android-debug-bridge" size={20}/>
        </Fab>
        <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isMenuOpen}
          onClose={handleClose}
          
        >
          <MenuItem onClick={handleOpenGql} className = {classes.menuItem}>
            {'GraphQL ' + intl.get('debug')} 
          </MenuItem>
          <MenuItem onClick={handleOpentree} className = {classes.menuItem}>
            {'Model Tree ' + intl.get('debug')} 
          </MenuItem>
        </Menu>
        <ThemeProvider theme={theme}>
          {
            //防止右侧滑出页面抖动，临时解决
            gqlOpen &&
            <GraphQLDebug open={gqlOpen} onClose = {()=>setGqlOpen(false)} />
          }
          {
            treeOpen &&
            <DebugModelTree open={treeOpen} onClose = {handleCloseTree} />
          }          
        </ThemeProvider>
        </DebugStoreProvider>
    </Hidden>
  );
})
