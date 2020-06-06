import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      position:'fixed',
    },

  }),
);

export default function Toolbar(){
  const classes = useStyles();
  return (
    <div className={classes.toolbar}>
      ToolBar
    </div>
  )
}
