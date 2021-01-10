import React from 'react';
import { makeStyles, Theme,  DrawerProps, Drawer, useTheme } from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import { useThemeSettings } from 'store1/helpers1/useAppStore';

const useStyles = (
  theme:Theme, 
  width:number, 
  elevation:number, 
  showBorder:boolean|undefined,
  backgroundImage:string|undefined,
  backgroundMask:string|undefined,
  maskOpacity?:number,
)=> {
  //const sidebarSkin = useSidebarSkin()
  const useStyles = makeStyles({
    drawerPaper:{
      width:width + "px",
      border: 0,
      position:"fixed",
      overflowX:'hidden',
      display:'flex',
      flexFlow:'column',
      transition: "width 0.3s, box-shadow 0.3s",
      boxShadow: theme.shadows[elevation],
      borderRight: showBorder ? 'solid 1px ' + theme.palette.divider : '0',
    },

    background: {
      position: "absolute",
      zIndex: -1,
      height: "100%",
      width: "100%",
      display: "block",
      top: "0",
      left: "0",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundImage:"url(" + backgroundImage + ")",
      "&:after": {
        position: "absolute",
        zIndex: "3",
        width: "100%",
        height: "100%",
        content: '""',
        display: "block",
        backgroundImage: backgroundMask,      
        //fallbacks: {
        //  maskLinearGradient: "-webkit-" + sidebarSkin.maskLinearGradient,
        //},
        //background: sidebarSkin.maskLinearGradient,
        opacity: maskOpacity
      }
    },
  })

  return useStyles();
}


export const StyledDrawer=observer((props:DrawerProps&{
  children:any,
  width:number,
  elevation?:number,
  showBorder?:boolean,
})=>{
  const {children, width, elevation, showBorder,...rest} = props;
  const theme = useTheme();
  const leftDrawerSkin = useThemeSettings().leftDrawerSkin;
  const classes = useStyles(theme, width, elevation||0, showBorder, leftDrawerSkin.image, leftDrawerSkin.mask, leftDrawerSkin.maskOpacity);
  return (
    <Drawer
    classes={{
      paper: classes.drawerPaper
    }}    
    {...rest}
  >
    <div className={classes.background}>
    </div>
    
    {children}
  </Drawer>
  )
})
