import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mouseFollower: {
      position:'fixed',
      background:'#5d78ff',
      color:'#fff',
      padding:' 5px 10px',
      fontSize:'0.8rem',
      userSelect:'none',
      cursor: 'default',
      pointerEvents:'none',
      borderRadius:'3px',
      zIndex:theme.zIndex.drawer + 3,
    },

  }),
);
export default function MouseFollower(
  props:{
    label:string,
  }
){
  const {label} = props;
  const classes = useStyles();
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const handleMouseMove = (event:MouseEvent)=>{
    setLeft(event.clientX);
    setTop(event.clientY);
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    };
  });

  return(
    left !== 0 && top !== 0 ?
    <div 
      className={classes.mouseFollower}
      style={{
        left:left + 'px',
        top: top + 'px',
      }}
    >{label}</div>
    :
    <span></span>
  )
}