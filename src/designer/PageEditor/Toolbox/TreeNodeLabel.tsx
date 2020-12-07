import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(0.5, 0),
      //margin:theme.spacing(0.5, 0),
    },

    leaf:{
      marginLeft:theme.spacing(-2),
    }

  }),
);

export default function TreeNodeLabel(
  props:{
    children?:any,
    style?:any,
    isLeaf?:boolean,
  }
){
  const {children, style, isLeaf} = props;
  const classes = useStyles();
  return (
    <div className={classNames(classes.root, {[classes.leaf]:isLeaf})} style={style}>
      {children}
    </div>
  )
}
