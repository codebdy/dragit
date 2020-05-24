import React from 'react';
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
// @material-ui/core components
import { IconButton, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import styles from "./globalSideNavStyles";

const useStyles = makeStyles(styles);

const GlobalSideNav = ()=>{
  const classes = useStyles();
  //const cardAvatarClasses = classNames({
  //  [classes.location]: true,
  //});
  return (
    <div className={classNames(classes.location, classes.appearance)}>
      <Icon>add_circle</Icon>
      <Icon color="primary">add_circle</Icon>
      <Icon color="secondary">add_circle</Icon>
      <IconButton size="small" aria-label="delete">
        <Icon color="primary">comments</Icon>
      </IconButton>
    </div>
  );
}

export default GlobalSideNav;