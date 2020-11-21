import React from 'react';
import { makeStyles, Theme, createStyles, Divider } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(1, 0),
    },

  }),
);

export default function MenuDivider(
  props:{
    className:any,
    onClick?:()=>void,
  }
)
  {
  const classes = useStyles();
  return (
    <div 
      className = {classNames(classes.root, props.className)} 
      onClick = {props.onClick}
    >
      <Divider />      
    </div>

  )
}
