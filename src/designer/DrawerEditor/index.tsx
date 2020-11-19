import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
  }),
);

export default function DrawerEditor(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      dddd
    </div>
  )
}
