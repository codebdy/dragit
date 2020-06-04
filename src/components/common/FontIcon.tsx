import React from "react";
import classNames from "classnames";

interface FontIconProps{
  iconClass?:string,
  size?:number,
  color?:string,
  backgroundColor?:string,
  className?:string,
}

export default function FontIcon(props:FontIconProps){
  const {iconClass, size = 24, color, backgroundColor, className} = props
  return (
    <i 
      className={ classNames(iconClass, className)}
      style={{
        fontSize: size + 'px',
        color: color,
        backgroundColor: backgroundColor,
        width: ( size + 'px'),
        height: ( size + 'px'),
        lineHeight: size + 'px',
      }}
    />
  )
}