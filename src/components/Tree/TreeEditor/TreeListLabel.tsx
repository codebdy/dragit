import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemLabel:{
      padding:theme.spacing(1, 0),
    }

  }),
);

export default function TreeListLabel(
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
