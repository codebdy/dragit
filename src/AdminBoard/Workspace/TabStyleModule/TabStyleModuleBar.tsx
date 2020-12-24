import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles, Toolbar} from '@material-ui/core';
import { LeftDrawerWidthPlaceholder } from 'AdminBoard/Sidebar/LeftDrawer/LeftDrawerWidthPlaceholder';
import { Fragment } from 'react';
import classNames from 'classnames';
import { useAppStore } from 'store/helpers/useAppStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar:{
      position:'fixed',
      top:'0',
      left:'0',
      width:'100%',
      borderBottom:theme.palette.divider + ' solid 1px',
      borderRight:theme.palette.divider + ' solid 1px',
      zIndex:theme.zIndex.appBar - 1,
      background:theme.palette.background.paper,
    },
    toolbar:{
      alignItems:'flex-end',
    },
    sticky:{
      boxShadow:theme.shadows[8],
      //borderBottom:'0',
    }
  }),
);

export const TabStyleModuleBar = (
  props:{children:any}
)=>{
  const {children} = props;
  const classes = useStyles();
  const [sticky, setSticky] = React.useState(false);
  const appStore = useAppStore();  
  const [toolbarElevate, setToolbarElevate] = React.useState(appStore.toolbarElevate);

  const handleScroll = function(event:any){
    let topOffset = window.pageYOffset || document.documentElement.offsetTop || 0
    setSticky(topOffset > 10)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setToolbarElevate(appStore.toolbarElevate);
    appStore.setToolbarElevate(false);
    return () => {
      // 清除
      appStore.setToolbarElevate(toolbarElevate);
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Fragment>
      <Toolbar></Toolbar>
      <div 
        className = {classNames(classes.appbar, {[classes.sticky]:sticky})}
      >
        <Toolbar></Toolbar>
        <Toolbar className = {classes.toolbar}>
          <LeftDrawerWidthPlaceholder />
          {children}
        </Toolbar>
      </div>
    </Fragment>
  )
}
