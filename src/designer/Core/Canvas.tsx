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

const Canvas = React.forwardRef((props: {className?:string, children?:any, style?:any}, ref:any) => {
  const classes = useStyles();

  return (
    <div
      ref={ref}
      {...props}
      className={ classNames(classes.canvas, props.className, classes.editPadding) }
    >
      {props.children}
    </div>
  )
});

export default Canvas