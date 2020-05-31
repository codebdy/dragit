import React, { Fragment, useEffect } from "react";
import { makeStyles, createStyles, Theme, AppBar, Toolbar, Hidden, IconButton } from "@material-ui/core";
import SidebarWidthPlaceholder from "components/Sidebar/SidebarWidthPlaceholder";
import MenuIcon from '@material-ui/icons/Menu';
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background:'transparent',
      boxShadow:'none',
      color:'grey',
      transition: 'all 0.3s',
    },

    sticky:{
      boxShadow:'rgba(25, 42, 70, 0.13) -8px 12px 18px 0px;',
      //boxShadow: theme.shadows[5],
      color:'#fff',
      background:'#7367f0',
    },

    placeholder: {
      background:'transparent',
      boxShadow:'none',
    }

  }),
);

export default function TopNav(props:{onSidebarToggle: any}) {
  const classes = useStyles();
  const [sticky, setSticky] = React.useState(false);
  const handleScroll = function(event:any){
    let topOffset = window.pageYOffset || document.documentElement.offsetTop || 0
    setSticky(topOffset > 80)

  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 清除
      window.removeEventListener('scroll', handleScroll);
    };
  });
  
  return (
    <Fragment>
      <AppBar position="relative" className={classes.placeholder}>
        <Toolbar></Toolbar>
      </AppBar>
      <AppBar position="fixed" className={classNames(classes.root, {[classes.sticky]:sticky},)}>
        <Toolbar>
          <SidebarWidthPlaceholder />
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={props.onSidebarToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
            Responsive drawer
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}