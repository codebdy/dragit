import React from "react";
import Drawer from "@material-ui/core/Drawer";
//classnames 跟@types/classnames两个都要安装才行
import classNames from "classnames";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Hidden from '@material-ui/core/Hidden';
import { ModalProps } from '@material-ui/core/Modal';
import styles, {SidebarTheme} from './sidebarStyle';

import Brand from './SidebarBrand'
import Switch from '@material-ui/core/Switch';
import ListNav from "./SidebarLinks"

import {sideBarSettings} from "utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { compactableAction } from "store/sidebar/actions";
//import { connect, ConnectedProps } from 'react-redux'

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
//interface RootState {
//  menu:any,
//}

//const mapStateToProps = (state: RootState) => {
//  return {
//    items: state.menu.menuItems
//  }
//}

//const mapDispatchToProps = () => {
//  return {

//  }
//}


//const connector = connect(mapStateToProps, mapDispatchToProps)

//type PropsFromRedux = ConnectedProps<typeof connector>
type SidebarProps = /*PropsFromRedux &*/ {
  /**
   * if is it dark theme
   * @default true
   */
  dark?: boolean,

  /**
   * Drawer size in open state
   * @default medium
   */
  //size?: SidebarSize,


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

  /**
   * 菜单项，树形结构
   */
  items?:Array<Object>,
}


/**
 * Sidebar Component, 侧边栏导航组件
 * @version package.json
 * @visibleName Sidebar 组件名称
 * @props
 */
const Sidebar = function( props:SidebarProps ) {
  const {
    dark = true, 
    //size = SidebarSize.medium, 
    mobileOpen = false, 
    onMobileClose,
    sidebarTheme,
    //items = []
  } = props
  //const [compactable, setCompactable] = React.useState(false);
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

  const selectSidebar = (state: RootState) => state.sidebar
  const sidebar = useSelector(selectSidebar)  
  const compactable = sidebar.compactable
  
  const fullWidth = sideBarSettings.sizes[sidebar.size]

   const width = compactable && !full ? sideBarSettings.sizes['compact'] : fullWidth;

  const useStyles = styles(theme, width, fullWidth, sidebarTheme)
  const classes = useStyles();
  const dispatch = useDispatch()
  const handleToggle = ()=>{
    dispatch(compactableAction())
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
          
          <ListNav 
            mini ={false} fullWidth={fullWidth}
          />  
        </Drawer>
      </Hidden>
      
      <Hidden smDown>
        <Drawer
          variant = "permanent"
          classes = {{
            paper: classNames(classes.drawerPaper, {[classes.boxShadow]:compactable})
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
          <ListNav 
            mini ={compactable && !full} fullWidth={fullWidth}
          />
        </Drawer>
        </Hidden>
    
    </ThemeProvider>

  ) 
  
}

export default Sidebar
//export default connector(Sidebar)
