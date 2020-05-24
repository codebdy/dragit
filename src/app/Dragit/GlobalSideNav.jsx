import React from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
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
    <div className={classes.location}>
      右侧导航菜单
    </div>
  );
}

export default GlobalSideNav;