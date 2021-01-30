import React, { Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import TopNavHeightPlaceholder from './TopNavHeightPlaceholder';
import { DesignButtons } from 'AppBoard/TopNav/DesignButtons';
import NavButtons from './NavButtons';
import { LeftDrawerWidthPlaceholder } from 'AppBoard/Sidebar/LeftDrawer/LeftDrawerWidthPlaceholder';

import {observer} from "mobx-react";
import { useThemeSettings, useDragItStore } from 'Store/Helpers/useDragItStore';
import { DARK } from 'Store/ThemeSettings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
    },
  }),
);

export const TopNav = observer((props:{onSidebarToggle: any}) => {
  const classes = useStyles();
  const [sticky, setSticky] = React.useState(false);
  const toolbarSkin = useThemeSettings().toolbarSkin;
  const appStore = useDragItStore();  
  
  const handleScroll = function(event:any){
    let topOffset = window.pageYOffset || document.documentElement.offsetTop || 0
    setSticky(topOffset > 10)

  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 清除
      window.removeEventListener('scroll', handleScroll);
    };
  },[]);

 
  const backgroundColor = toolbarSkin.colored ? 'primary' :'inherit';

  let color:string|undefined = toolbarSkin.mode === DARK ? "#FFF" :"#051a0e";
  color = toolbarSkin.colored ? color : undefined;
  //console.log(appStore.toolbarElevate)
  return (
    <Fragment>
      <TopNavHeightPlaceholder />
      <AppBar position="fixed" 
        className={classNames(classes.root)} 
        variant ={toolbarSkin.floatStyle || (sticky&&appStore.toolbarElevate) ? "elevation" :"outlined"}
        elevation = {8}
        color = { backgroundColor}
        style = {{
          transition:'box-shadow 0.3s',
          border:(toolbarSkin.floatStyle || (sticky&&appStore.toolbarElevate) ? 'transparent solid 1px':undefined)
        }}
        //style={{borderColor: (toolbarSkin.outlined ? '': 'transparent') }}
        //style={{ border:(toolbarSkin.floatStyle || sticky ? 'transparent solid 1px':undefined)}}
      >
        <Toolbar>
          <LeftDrawerWidthPlaceholder />
          <DesignButtons color={color}/>
          <NavButtons color={color} onSidebarToggle = {props.onSidebarToggle}/>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
})