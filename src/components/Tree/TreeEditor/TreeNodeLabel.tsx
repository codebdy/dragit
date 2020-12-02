import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemLabel:{
      padding:theme.spacing(1, 0),
      userSelect:'none',
    }

  }),
);

export default function TreeNodeLabel(
  props:{
    children?:any
  }
){
  const {children} = props;
  const classes = useStyles();
  return (
    <div className={classes.itemLabel}>
      {children}
    </div>
  )
}
