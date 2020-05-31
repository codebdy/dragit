import React from "react";
import { makeStyles, createStyles, Theme, Paper, AppBar, Toolbar, Hidden, IconButton } from "@material-ui/core";
import SidebarWidthPlaceholder from "components/Sidebar/SidebarWidthPlaceholder";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      position: 'absolute',
      left:'0',
      bottom:'0',
      width:'100%',
      minHeight: '50px',
    },

  }),
);

export default function TopNav(props:{onSidebarToggle: any}) {
  const classes = useStyles();
  return (
    <AppBar position="fixed">
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
  )
}