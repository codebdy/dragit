import React from "react"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MdiIcon from 'Components/common/MdiIcon';
import { Avatar, Link } from '@material-ui/core';
import Spacer from 'Components/common/Spacer';
import { AccountAvatar } from 'AppBoard/TopNav/AccountAvatar';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { AppManager } from "./AppManager";
import { TemplateManager } from "./TemplateManager";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logoIcon: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      letterSpacing:'1px',
      fontWeight:'bold',
      fontSize:'20px',
    },
    githubLink:{
      color: theme.palette.text.secondary,
      marginRight:theme.spacing(1),
    },

    navLink:{
      textDecoration:'none',
      color:theme.palette.text.primary,
      padding:theme.spacing(1, 2),
      borderRadius:'5px',
      fontSize:'0.9rem',
      '&:hover':{
        textDecoration:'none',
        background:'rgba(0,0,0, 0.05)',
      }
    },

    activeLink:{
      color:theme.palette.primary.main,
    }
  }),
);

export const MainBoard = observer(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar 
        position="static" 
        color = "transparent"
        variant = "outlined"
      >
        <Toolbar>
          <Avatar
            variant="rounded"
            className={classes.logoIcon}
          >
            <MdiIcon iconClass = "mdi-feather" />
          </Avatar>
          <NavLink
            className = {classes.navLink}
            activeClassName = {classes.activeLink}
            to="/main-board/apps"
          >
            {intl.get('applications')}
          </NavLink>

          <NavLink
            className = {classes.navLink}
            activeClassName = {classes.activeLink}
            to="/main-board/templates"
          >
            {intl.get('templates')}
          </NavLink>

          <Link
            className = {classes.navLink}
            target = "_blank"
            href= "https://document.rxdrag.com"
          >
            {intl.get('document')}
          </Link>
          <Link
            className = {classes.navLink}
            target = "_blank"
            href= "https://github.com/rxwater/dragit/issues"
          >
            {intl.get('report-bug')}
          </Link>

          <Spacer />
          <a href="https://github.com/rxwater/rxdrag" className={classes.githubLink} target="_blank" rel="noopener noreferrer">
            <MdiIcon iconClass = "mdi-github" />
          </a>
          <AccountAvatar />
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/main-board/apps" component={AppManager}></Route> 
        <Route path="/main-board/templates" component={TemplateManager}></Route>
        <Redirect to={`/main-board/apps`} from='/main-board' /> 
      </Switch>

    </div>
  );
})
