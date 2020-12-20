import React from "react";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ListNav from "./SidebarLinks"
import useThemeSettings from "store/theme/useThemeSettings";
import LeftDrawer from "./LeftDrawer";
import {observer} from "mobx-react-lite";
import { useLeftDrawer } from "store/helpers/useAppStore";

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
  onMobileClose?: ()=>void,
}


/**
 * Sidebar Component, 侧边栏导航组件
 * @version package.json
 * @visibleName Sidebar 组件名称
 * @props
 */
const Sidebar = observer((props:SidebarProps) => {
  const {
    mobileOpen = false, 
    onMobileClose,
  } = props
  const leftDrawer = useLeftDrawer();
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
  }));

  return(
    <ThemeProvider theme={theme}>
      <LeftDrawer mobileOpen = {mobileOpen} onMobileClose = {onMobileClose}>
        <ListNav 
          mini ={leftDrawer.isMini}
          fullWidth = {leftDrawer.fullWidth}
        />  
      </LeftDrawer>
    </ThemeProvider>

  ) 
  
})

export default Sidebar

