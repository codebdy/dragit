import { Theme, makeStyles } from "@material-ui/core/styles";
import useSidebarSkin from "store/theme/useSidebarSkin";

/**
 * Sidebar theme
 */
export interface SidebarTheme{

  /**
   * 是否暗色主题
   * @default true
   */
  dark?: boolean,

  /**
   * 背景图片
   */
  backgroundImage?: string,

  /**
   * 遮罩背景色，会被遮罩背景图片覆盖
   * 遮罩以半透明的形式浮于背景图上层
   */
  maskBackground?: string,

  /**
   * 建议用linear-gradient
   */
  maskLinearGradient?: string,

}

const useSidebarStyles = (theme:Theme, width:number, fullWidth:number, showBorder:boolean)=> {
  const sidebarSkin = useSidebarSkin()
  const useStyles = makeStyles({
    drawerPaper:{
      width:width + "px",
      
      border: 0,
      position:"fixed",
      overflowX:'hidden',
      display:'flex',
      flexFlow:'column',
      transition: "width 0.3s",
      borderRight: showBorder ? 'solid 1px ' + theme.palette.divider : '0',
    },

    overDrawer:{
      marginTop:'-2px',
      marginLeft:'-1px',
      boxShadow: theme.shadows[20],
      height:"calc(100vh + 2px)",
    },

    drawerPaperMobile:{
      width:fullWidth + "px",
      display:'flex',
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
      backgroundImage:"url(" + sidebarSkin.image + ")",
      "&:after": {
        position: "absolute",
        zIndex: "3",
        width: "100%",
        height: "100%",
        content: '""',
        display: "block",
        backgroundImage: sidebarSkin.maskLinearGradient,      
        fallbacks: {
          maskLinearGradient: "-webkit-" + sidebarSkin.maskLinearGradient,
        },
        //background: sidebarSkin.maskLinearGradient,
        opacity: ".9"
      }
    },
  })

  return useStyles();
}

export default useSidebarStyles;
