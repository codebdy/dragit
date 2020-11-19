import React from 'react';
import { makeStyles, Theme, createStyles, Paper } from '@material-ui/core';

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
  }, 
  ref
)=>{
  const {elevation, children, style, ...rest} = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  return (
    <Paper 
      ref={ref}
      {...rest}
      elevation = {elevation}
      variant = {hover? "elevation" :"outlined"}
      className = { classes.portlet }
      onMouseOver = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)} 
      style={{...style, border:(hover?'transparent solid 1px':undefined)}}
    >
      {children}
    </Paper>
  )
})

export default HoverablePaper;
