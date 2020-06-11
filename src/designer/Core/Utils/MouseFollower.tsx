import React, { useEffect } from 'react';
import bus, { DRAGE_NODE, UN_DRAGE_NODE } from '../bus';
import { IContext } from '../Node/IContext';

export default function MouseFollower(){
  const [following, setFollowing] = React.useState<IContext|null>(null);

  const makeFollower = ()=>{

  }

  const doFollow = (node:IContext)=>{
    let domElement = node.view.dom()
  }


  const follow = (node:IContext)=>{
    setFollowing(node);
    doFollow(node);
  }

  const unFollow = (node:IContext)=>{
    setFollowing(null)
  }

  const handleMouseMove = (event:MouseEvent)=>{

  }

  useEffect(() => {
    bus.on(DRAGE_NODE, makeFollower);
    bus.on(UN_DRAGE_NODE, unFollow);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      bus.off(DRAGE_NODE, follow)
      bus.off(UN_DRAGE_NODE, makeFollower)
      document.removeEventListener('mousemove', handleMouseMove)
    };
  });

  return(
    following &&
    <div>MouseFollower</div>
  )
}