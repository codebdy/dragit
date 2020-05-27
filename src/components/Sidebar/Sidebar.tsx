import React from "react";
import Drawer, {DrawerProps} from "@material-ui/core/Drawer";
//classnames 跟@types/classnames两个都要安装才行
import classNames from "classnames";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Hidden from '@material-ui/core/Hidden';
import { ModalProps } from '@material-ui/core/Modal';
import styles, {SidebarTheme} from './sidebarStyle';

import Brand from './SidebarBrand'
import Switch from '@material-ui/core/Switch';
import ListNav from "./SidebarListNav"

import {sideBarSettings} from "utils";

export enum SidebarSize{
  small = "small",
  medium = "medium",
  large = "large"
}

/**
 * 侧边栏主题创建函数
 * @param settings 
 */
export function createSidebarTheme(settings = {}) : SidebarTheme{
  return { dark: true, ...settings }
}

interface SidebarProps extends DrawerProps {

  /**
   * if is it dark theme
   * @default true
   */
  dark?: boolean,

  /**
   * Drawer size in open state
   * @default medium
   */
  size?: SidebarSize,


  /**
   * 是否显示
   * @default false
   */
  mobileOpen?: boolean,

  /**
   * 移动设备，隐藏事件
   */
  onMobileClose?: ModalProps['onClose'],

  /**
   * 侧边栏主题
   */
  sidebarTheme?: SidebarTheme,
  
}


/**
 * Sidebar Component, 侧边栏导航组件
 * @version package.json
 * @visibleName Sidebar 组件名称
 * @props
 */
const Sidebar = function( props:SidebarProps = {} ) {
  const {
    dark = true, 
    size = SidebarSize.medium, 
    mobileOpen = false, 
    onMobileClose,
    sidebarTheme,
    ...drawerProps
  } = props
  const [compactable, setCompactable] = React.useState(false);
  const [full, setFull] = React.useState(true);
 
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: dark ? 'dark' : 'light',
    },
    typography: {

      body1: {
        fontFamily:'Roboto, Noto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '0.9rem',
        letterSpacing:'0.05rem',
      },

    },
  }));

  

  const fullWidth = sideBarSettings.sizes[size]

  const width = compactable && !full ? sideBarSettings.sizes['compact'] : fullWidth;

  const useStyles = styles(theme, width, fullWidth, sidebarTheme)
  const classes = useStyles();

  const handleToggle = ()=>{
    setCompactable(!compactable)
  }

  const handleMouseEnter = ()=>{
    compactable && setFull(true)
  }

  const handleMouseLeave = ()=>{
    compactable && setFull(false)
  }

  return(
    <ThemeProvider theme={theme}>
      <Hidden mdUp>
        <Drawer
          {...drawerProps}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={onMobileClose}
          classes={{
            paper: classNames(classes.drawerPaper, classes.drawerPaperMobile)
          }}          
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div 
            className={classes.background}
          >
          </div>
          <Brand fullWidth={fullWidth}></Brand>
          <ListNav isMini ={false} fullWidth={fullWidth} />  
        </Drawer>
      </Hidden>
      <Hidden smDown>
        {
          //左边栏占位DIV，APP基于flex布局
        }
        <div style={{
          width: compactable ? sideBarSettings.sizes['compact'] : fullWidth + 'px',
          transition:"width 0.3s",
        }}>
        </div>
        <Drawer
          {...drawerProps}
          variant = "permanent"
          classes = {{
            paper: classNames(classes.drawerPaper)
          }}       
          open
          onMouseEnter = { handleMouseEnter }
          onMouseLeave = { handleMouseLeave }
        >
          <div 
            className={classes.background}
            style={{width:fullWidth+'px'}}
          ></div>
          <Brand fullWidth={fullWidth}>
            <Switch 
              checked={!compactable}
              onClick = {handleToggle} 
            />
          </Brand>
          <ListNav isMini ={compactable && !full} fullWidth={fullWidth} />
        </Drawer>
      </Hidden>
    
    </ThemeProvider>

  ) 
  
}

export default Sidebar;