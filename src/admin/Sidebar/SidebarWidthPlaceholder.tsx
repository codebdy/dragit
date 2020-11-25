import React from "react";
import { Hidden } from "@material-ui/core";
import {sideBarSettings} from "utils/sideBarSettings";
import { RootState } from "store";
import { useSelector } from "react-redux";

export default function SidebarWidthPlaceholder(
  props:{children?:any, className?:string, style?:any}
){
  const selectSidebar = (state: RootState) => state.sidebar
  const sidebar = useSelector(selectSidebar)  
  
  const fullWidth = sideBarSettings.sizes[sidebar.size]

  return (
    <Hidden smDown>
      {
        //左边栏占位DIV，APP基于flex布局
      }
      <div style={{
          width: sidebar.compactable ? sideBarSettings.sizes['compact'] : fullWidth + 'px',
          transition: "width 0.3s",
          flexGrow: 0,
          flexShrink: 0,
          ...props.style
        }}
        className = {props.className}
      >
        {props.children}
      </div>
    </Hidden>
)
}