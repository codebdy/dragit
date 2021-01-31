import React from 'react';
import { makeStyles, Theme, createStyles, Paper } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portlet: {
      flex:1,
    },
  }),
);

const HoverablePaper = React.forwardRef((
  props:{
    elevation?:number,
    children?:any,
    style?:any,
    className?:any,
  }, 
  ref
)=>{
  const {elevation, children, style, className, ...rest} = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  return (
    <Paper 
      ref={ref}
      {...rest}
      elevation = {elevation}
      variant = {hover? "elevation" :"outlined"}
      className = { classNames(classes.portlet, className) }
      onMouseOver = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)} 
      style={{...style, border:(hover?'transparent solid 1px':undefined)}}
    >
      {children}
    </Paper>
  )
})

export default HoverablePaper;
