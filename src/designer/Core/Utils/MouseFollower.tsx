import React, { useEffect } from 'react';
import bus, { DRAGE_NODE, UN_DRAGE_NODE } from '../bus';
import { INode } from '../Node/INode';
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
export default function MouseFollower(){
  const classes = useStyles();
  const [following, setFollowing] = React.useState<INode|null>(null);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const makeFollower = (node:INode)=>{
    setFollowing(node);
  }

  const unFollow = (node:INode)=>{
    setFollowing(null)
  }

  const handleMouseMove = (event:MouseEvent)=>{
    setLeft(event.clientX);
    setTop(event.clientY);
  }

  useEffect(() => {
    bus.on(DRAGE_NODE, makeFollower);
    bus.on(UN_DRAGE_NODE, unFollow);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      bus.off(DRAGE_NODE, makeFollower)
      bus.off(UN_DRAGE_NODE, unFollow)
      document.removeEventListener('mousemove', handleMouseMove)
    };
  });

  return(
    following &&
    <div 
      className={classes.mouseFollower}
      style={{
        left:left + 'px',
        top: top + 'px',
      }}
    >{following.rule.label}</div>
  )
}