import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formGrid: {
      flex:1,
    },

  }),
);

export default function FormGrid(){
  const classes = useStyles();
  return (
    <div className={classes.formGrid}>
    </div>
  )
}
