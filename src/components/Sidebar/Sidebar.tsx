import React from "react";
import Drawer, {DrawerProps} from "@material-ui/core/Drawer";
//import classNames from "classnames";
//import PropTypes from "prop-types";

interface SidebarProps extends DrawerProps {

  /**
   * Dark 暗主题
   * @default true
   */
  dark?: boolean

  /**
   * Light 亮主题
   * @default flase
   */
  light?: boolean
}

/**
 * Sidebar Component, 侧边栏导航组件
 * @version package.json
 * @visibleName Sidebar 组件名称的显示
 * @props
 */
export default function Sidebar(props:SidebarProps = {}) {
  console.log(props)
  const {dark, light, ...drawerProps} = props
  return(
    <Drawer {...drawerProps} >
      {props.children}
    </Drawer>
  ) 
    
  
}