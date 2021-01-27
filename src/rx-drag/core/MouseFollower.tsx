import React, { useEffect } from 'react';

export default function MouseFollower(
  props:{
    label:string,
  }
){
  const {label} = props;
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
      className='rx-mouse-follower'
      style={{
        left:left + 'px',
        top: top + 'px',
      }}
    >{label}</div>
    :
    <span></span>
  )
}