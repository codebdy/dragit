import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color:theme.palette.text.primary,
    },

  }),
);

export default function PrimaryText(props:{children?:any}){
  const classes = useStyles();
  return (
    <span className={classes.root}>
      {props.children}
    </span>
  )
}
