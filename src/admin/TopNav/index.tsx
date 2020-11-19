import React, { Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SidebarWidthPlaceholder from 'admin/Sidebar/SidebarWidthPlaceholder';
import classNames from 'classnames';
import TopNavHeightPlaceholder from './TopNavHeightPlaceholder';
import DesignButtons from 'admin/TopNav/DesignButtons';
import useToolbarSkin from 'store/theme/useToolbarSkin';
import NavButtons from './NavButtons';
import { DARK } from 'store/theme/useThemeSettings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
    },
  }),
);

export default function TopNav(props:{onSidebarToggle: any}) {
  const classes = useStyles();
  const [sticky, setSticky] = React.useState(false);
  const toolbarSkin = useToolbarSkin();
  
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
  });

 
  const backgroundColor = toolbarSkin.colored ? 'primary' :'inherit';

  let color:string|undefined = toolbarSkin.mode === DARK ? "#FFF" :"#051a0e";
  color = toolbarSkin.colored ? color : undefined;

  return (
    <Fragment>
      <TopNavHeightPlaceholder />
      <AppBar position="fixed" 
        className={classNames(classes.root)} 
        variant ={toolbarSkin.floatStyle || sticky ? "elevation" :"outlined"}
        elevation = {12}
        color = { backgroundColor}
        style = {{
          transition:'box-shadow 0.3s',
          border:(toolbarSkin.floatStyle || sticky ? 'transparent solid 1px':undefined)
        }}
        //style={{borderColor: (toolbarSkin.outlined ? '': 'transparent') }}
        //style={{ border:(toolbarSkin.floatStyle || sticky ? 'transparent solid 1px':undefined)}}
      >
        <Toolbar>
          <SidebarWidthPlaceholder />
          <DesignButtons color={color}/>
          <NavButtons color={color} onSidebarToggle = {props.onSidebarToggle}/>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}