import React from "react";
import Drawer, {DrawerProps} from "@material-ui/core/Drawer";
//classnames 跟@types/classnames两个都要安装才行
import classNames from "classnames";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Hidden from '@material-ui/core/Hidden';
import { ModalProps } from '@material-ui/core/Modal';
import { makeStyles} from "@material-ui/core/styles";
import styles from './sidebarStyle';

import Brand from './Brand'
import Switch from '@material-ui/core/Switch';

//import classNames from "classnames";
//import PropTypes from "prop-types";

enum SidebarSize{
  small = "small",
  medium = "medium",
  large = "large"
}

const useStyles = makeStyles(styles);

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
export default function Sidebar( props:SidebarProps = {} ) {
  const {
    dark = true, 
    size = SidebarSize.medium, 
    mobileOpen = false, 
    compact = false,
    onMobileClose, 
    ...drawerProps
  } = props

  const paletteType = dark ? 'dark' : 'light'

  const theme2 = createMuiTheme({
    palette: {
        type: 'dark',
  
    },
  });
  //console.log(theme)

  const classes = useStyles();
  return(
    <ThemeProvider theme={theme2}>
      <Hidden mdUp implementation="css">
        <Drawer
          {...drawerProps}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={onMobileClose}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}          
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Brand></Brand>
          {props.children}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          {...drawerProps}
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper)
          }}          
          open
        >
          <Brand>
            <Switch />
          </Brand>
          {props.children}
        </Drawer>
      </Hidden>
    
    </ThemeProvider>

  ) 
  
}