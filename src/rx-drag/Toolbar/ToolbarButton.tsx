import classNames from "classnames";
import React from "react"

export const ToolbarButton = (
  props:{
    className?:string,
    svgIcon:string,
    checked?:boolean,
    disabled?:boolean,
    onClick?:()=>void,
  }
)=>{
  const {className, svgIcon, checked, disabled, onClick} = props;
  return (
    <div 
      className = {
        classNames(
          'rx-toolbar-button',
          {
            'checked':checked,
            'disabled':disabled,
          },
          className
        )
      }
      dangerouslySetInnerHTML = {{__html:svgIcon}}
      onClick = {disabled ? undefined : onClick}
    >
    </div>
  )
}