import React from 'react';
import { makeStyles, Theme, createStyles, Container } from "@material-ui/core";
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    canvas:{
      flex:1,
      display:'flex',
      flexFlow: 'column',
    },

    editPadding:{
      //padding: theme.spacing(1),
      paddingBottom: theme.spacing(3),
    },
  }),
);

const Canvas = React.forwardRef((props: {className?:string, children?:any, style?:any}, ref:any) => {
  const classes = useStyles();

  return (
    <Container
      ref={ref}
      {...props}
      className={ classNames(classes.canvas, props.className, classes.editPadding) }
    >
      {props.children}
      {!props.children && <span></span>}
    </Container>
  )
});

export default Canvas