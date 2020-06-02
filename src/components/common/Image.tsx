import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
    },

  }),
);

export default function Image(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
    </div>
  )
}
