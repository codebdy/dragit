import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(0.5, 0),
    },
  }),
);

export default function TreeNodeLabel(
  props:{
    children?:any,
    style?:any,
    onMouseDown?:()=>void
  }
){
  const {children, style, onMouseDown} = props;
  const classes = useStyles();

  return (
    <div 
      className={classes.root} 
      style={style}
      onMouseDown = {onMouseDown}
    >
      {children}
    </div>
  )
}
