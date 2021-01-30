import React from "react";
import { makeStyles, createStyles, Theme, AppBar, Toolbar } from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background:'transparent',
      boxShadow:'none',
    },
  })

);

export default function TopNavHeightPlaceholder(
  props:{children?:any, className?:string, style?:any}
){
  const classes = useStyles();

  return (
    <AppBar 
      position="relative" 
      className={classNames(classes.root, props.className)}
      style={{...props.style}}
    >
        <Toolbar>
          {props.children}
        </Toolbar>
    </AppBar>
  )
}