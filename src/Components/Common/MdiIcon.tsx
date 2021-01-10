import React from "react";
import classNames from "classnames";

interface MdiIconProps{
  iconClass?:string,
  size?:number|string,
  color?:string,
  backgroundColor?:string,
  className?:string,
}

export default function MdiIcon(props:MdiIconProps){
  const {iconClass, size = 24, color, backgroundColor, className} = props
  return (
    <i 
      className={ classNames('mdi', iconClass, className)}
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