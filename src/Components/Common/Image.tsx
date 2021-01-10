import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageRoot: {
      width:'100%',
      paddingBottom:'100%',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center',
      backgroundSize:'cover',
    },

  }),
);

export default function Image(
    props:{src?:string, 
      borderRadius?:string, 
      className?:string,
      children?:any,
      style?:any,
    }
  ){
  const {src, borderRadius = '5px', className, children, style} = props;
  const classes = useStyles();
  return (
    <div className = {classNames(classes.imageRoot, className) }
      style = {{
        backgroundImage:`url(${src})`,
        borderRadius: borderRadius,
        ...style
      }}
    >
      {children}
    </div>
  )
}
