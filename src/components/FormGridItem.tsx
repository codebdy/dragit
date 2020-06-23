import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formGridItem: {
      flex:1,
    },

  }),
);

export default function FormGridItem(){
  const classes = useStyles();
  return (
    <div className={classes.formGridItem}>
    </div>
  )
}
