import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    insertCursor: {
      position:"fixed",
    },
  }),
);

export default function InsertCursor(
  props:{
    
  }
){
  const classes = useStyles();
  return (
    <div className={classes.insertCursor}>
    </div>
  )
}
