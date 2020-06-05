import React from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    canvas:{
      flex:1,
      display:'flex',
      flexFlow: 'column',
    },

    editPadding:{
      padding: theme.spacing(1),
    },
  }),
);


export default function Canvas(props: {className?:string, children?:any, style?:any}){
  const classes = useStyles();

  return (
    <div 
      className={ classNames(classes.canvas, props.className, classes.editPadding) }
      style={props.style}
    >
      {props.children}
    </div>
  )
}