import React from "react";

interface FontIconProps{
  iconClass?:string,
  size?:number,
  color?:string,
  backgroundColor?:string,
}

export default function FontIcon(props:FontIconProps){
  const {iconClass, size = 24, color, backgroundColor} = props
  return (
    <i 
      className={iconClass}
      style={{
        fontSize: size + 'px',
        color: color,
        backgroundColor: backgroundColor,
      }}
    />
  )
}