import React, { useEffect } from 'react';
import bus, { DRAGE_NODE, UN_DRAGE_NODE } from '../bus';
import { IContext } from '../Node/IContext';
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
    },

  }),
);
export default function MouseFollower(){
  const classes = useStyles();
  const [following, setFollowing] = React.useState<IContext|null>(null);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const makeFollower = (node:IContext)=>{
    console.log('makeFollower')
    setFollowing(node);
  }

  //const doFollow = (node:IContext)=>{
  //  let domElement = node.view.dom()
  //}


  //const follow = (node:IContext)=>{
  //  setFollowing(node);
  //  doFollow(node);
  //}

  const unFollow = (node:IContext)=>{
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