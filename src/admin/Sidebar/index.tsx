import React from "react";
import Drawer from "@material-ui/core/Drawer";
//classnames 跟@types/classnames两个都要安装才行
import classNames from "classnames";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Hidden from '@material-ui/core/Hidden';
import { ModalProps } from '@material-ui/core/Modal';
import Brand from './SidebarBrand'
import Switch from '@material-ui/core/Switch';
import ListNav from "./SidebarLinks"

import {sideBarSettings} from "utils/sideBarSettings";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { compactableAction } from "store/sidebar/actions";
import useThemeSettings from "store/theme/useThemeSettings";
import useSidebarStyles from "./useSidebarStyles";

export enum SidebarSize{
  small = "small",
  medium = "medium",
  large = "large"
}

type SidebarProps = /*PropsFromRedux &*/ {

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
    mobileOpen = false, 
    onMobileClose,
  } = props
  const [full, setFull] = React.useState(true);
  const themeSettings = useThemeSettings();
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: themeSettings.siderbarSkin.mode as any,
      primary:{
        main:themeSettings.primary,
      },
    },
    
    typography: {

      body1: {
        fontFamily:'Roboto, Noto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '0.9rem',
        letterSpacing:'0.05rem',
      },

    },

    //shadows:[...useShadows()] as any
  }));

  const selectSidebar = (state: RootState) => state.sidebar
  const sidebar = useSelector(selectSidebar)  
  const compactable = sidebar.compactable
  
  const fullWidth = sideBarSettings.sizes[sidebar.size]
  const width = compactable && !full ? sideBarSettings.sizes['compact'] : fullWidth;

  //const useStyles = createStyles(theme, width, fullWidth)
  const classes = useSidebarStyles(theme, width, fullWidth, !(compactable && full));
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
            paper: classNames(classes.drawerPaper, {[classes.overDrawer]:compactable && full})
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
              color = "primary"
              checked={!compactable}
              onClick = {handleToggle} 
              size = "small"
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
