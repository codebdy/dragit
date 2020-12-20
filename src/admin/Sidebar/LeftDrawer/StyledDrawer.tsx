import React from 'react';
import { makeStyles, Theme,  DrawerProps, Drawer, useTheme } from '@material-ui/core';

const useStyles = (
  theme:Theme, 
  width:number, 
  elevation:number, 
  showBorder:boolean|undefined,
  backgroundImage:string|undefined,
  backgroundMask:string|undefined,
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
      transition: "all 0.3s",
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
        opacity: ".9"
      }
    },
  })

  return useStyles();
}


export default function StyledDrawer(props:DrawerProps&{
  children:any,
  width:number,
  elevation?:number,
  showBorder?:boolean,
  backgroundImage?:string,
  backgroundMask?:string,
}){
  const {children, width, elevation, showBorder, backgroundImage, backgroundMask, ...rest} = props;
  const theme = useTheme();
  const classes = useStyles(theme, width, elevation||0, showBorder, backgroundImage, backgroundMask);
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
}
