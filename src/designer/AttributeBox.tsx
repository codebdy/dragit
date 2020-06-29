import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },

  }),
);

export default function AttributeBox(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>外边距：</div>
      <div>内边距：</div>      
      <div>绑定字段：</div>
    </div>
  )
}