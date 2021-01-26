import classNames from "classnames";
import React from "react"

export const ToolbarButton = (
  props:{
    svgIcon:string,
    checked?:boolean,
    disabled?:boolean,
    onClick?:()=>void,
  }
)=>{
  const {svgIcon, checked, disabled, onClick} = props;
  return (
    <div 
      className = {
        classNames(
          'rx-toolbar-button',
          {
            'checked':checked,
            'disabled':disabled,
          }
        )
      }
      dangerouslySetInnerHTML = {{__html:svgIcon}}
      onClick = {disabled ? undefined : onClick}
    >
    </div>
  )
}