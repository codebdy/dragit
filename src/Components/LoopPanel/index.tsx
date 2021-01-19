import React from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      flex:1,
      display:'flex',
      flexFlow: 'column',
    },

  }),
);

const LoopPanel =(props: {className?:string, children?:any, style?:any}) => {
  const {className, children, ...rest} = props;
  const classes = useStyles();

  return (
    <div
      className={ classNames(classes.root, className)} 
      {...rest}
    >
      {children}
    </div>
  )
};

export default LoopPanel