import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      position:'fixed',
    },

  }),
);

export default function Label(){
  const classes = useStyles();
  return (
    <div className={classes.label}>
      Label
    </div>
  )
}
