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
    children?:any;
  }, 
  ref
)=>{
  const classes = useStyles();
  const {elevation, children, ...rest} = props;
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
    >
      {children}
    </Paper>
  )
})

export default HoverablePaper;
