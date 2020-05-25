import React from "react";
import Drawer, {DrawerProps} from "@material-ui/core/Drawer";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Hidden from '@material-ui/core/Hidden';
import { ModalProps } from '@material-ui/core/Modal';
//import classNames from "classnames";
//import PropTypes from "prop-types";

enum SidebarSize{
  small,
  medium,
  large
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
   * Compact 
   * @default false
   */
  compact?: boolean,

  /**
   * 是否显示
   * @default false
   */
  mobileOpen?: boolean,

  /**
   * 移动设备，隐藏事件
   */
  onMobileClose?: ModalProps['onClose']
}

/**
 * Sidebar Component, 侧边栏导航组件
 * @version package.json
 * @visibleName Sidebar 组件名称
 * @props
 */
export default function Sidebar(
    props:SidebarProps = {
      dark:false, 
      size:SidebarSize.medium,
      compact:false,
      mobileOpen:false,
    }
  ) {
  const {dark, size, mobileOpen, compact, onMobileClose, ...drawerProps} = props
  const theme = createMuiTheme({
    palette: {
      type: dark ? 'dark' : 'light',
    },
  });
  return(
    <ThemeProvider theme={theme}>
      <Hidden mdUp implementation="css">
        <Drawer
          {...drawerProps}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {props.children}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          {...drawerProps}
          variant="permanent"
          open
        >
          {props.children}
        </Drawer>
      </Hidden>
    
    </ThemeProvider>

  ) 
  
}