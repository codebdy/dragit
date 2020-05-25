import React from "react";
//import classNames from "classnames";
//import PropTypes from "prop-types";

interface IProps {
  /**
   * 年龄
   */
  age?: number
  /**
   * 工作
   * @default doctor
   */
  work?: string
  /**
   * 修改名字
   * @param name
   */
  changeName?: (name: string) => void
}

/**
 * Sidebar Component, 侧边栏导航组件
 * @version package.json
 * @visibleName Sidebar 组件名称的显示
 * @props
 */
export default function Sidebar(props:IProps = {}) {
  console.log(props)
  return(
    <div>SideBar</div>
  ) 
    
  
}