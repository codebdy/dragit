import React from "react";

interface SidebarProps{
  children?: any,
}

export default function Sidebar(
  props:SidebarProps = {}
) {
  const {children} = props
  return(
    <div>
      Brand
      {children}
    </div>
  )
}