import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1',
    },

  }),
);

export default function PageContent() {
  const classes = useStyles();
  return (
    <div className = {classNames( 
      classes.root,
    )}>
        <div style={{height:'1000px', width:'100%'}}>xxxx</div>
    </div>
  )
}