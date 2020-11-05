import React, { Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SidebarWidthPlaceholder from 'admin/Sidebar/SidebarWidthPlaceholder';
import { Hidden, Link } from '@material-ui/core';
import classNames from 'classnames';
import MdiIcon from 'components/common/MdiIcon';
import TopNavHeightPlaceholder from './TopNavHeightPlaceholder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //background: theme.palette.background.default,
      background:'#5d78ff',
      //boxShadow:'none',
      boxShadow: theme.shadows[10],
      color:'#fff',
      transition: 'all 0.3s',
    },

    sticky:{
      //boxShadow:'rgba(25, 42, 70, 0.13) 0px 12px 18px 0px;',
      boxShadow: theme.shadows[10],
      //color:'#fff',
      //background:'#7367f0',
      //background:'#fff',
    },

    grow: {
      flexGrow: 1,
    },

  }),
);

export default function TopNav(props:{onSidebarToggle: any}) {
  const classes = useStyles();
  const [sticky, setSticky] = React.useState(false);
  const handleScroll = function(event:any){
    let topOffset = window.pageYOffset || document.documentElement.offsetTop || 0
    setSticky(topOffset > 30)

  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 清除
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  
  return (
    <Fragment>
      <TopNavHeightPlaceholder />
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
            <Typography variant="h6" noWrap>
              DragRX
            </Typography>          
          </Hidden>
          <div className={classes.grow} />
          
          <a href="https://github.com/rxwater/dragit" target="_blank" rel="noopener noreferrer">
            <MdiIcon iconClass = "mdi-github" color="#fff"/>
          </a>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
            <MdiIcon iconClass = "mdi-bell-outline"/>
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Fragment>
  )
}