import { Theme, createStyles } from "@material-ui/core/styles";
import { SideBarSettings } from 'utils'

const sidebarStyle = (theme:Theme) => createStyles(
  {
    drawerPaper:{
      width:"260px",
    },

    drawerPaperBak: {
      border: "none",
      position: "fixed",
      top: "0",
      bottom: "0",
      left: "0",
      zIndex: 1,
    },

    background: {
      position: "absolute",
      zIndex: 1,
      height: "100%",
      width: "100%",
      display: "block",
      top: "0",
      left: "0",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      "&:after": {
        position: "absolute",
        zIndex: "3",
        width: "100%",
        height: "100%",
        content: '""',
        display: "block",
        backgroundImage: "linear-gradient(45deg,#780206,#061161)",      
        fallbacks: {
          backgroundImage: "-webkit-linear-gradient(45deg,#780206,#061161)",
        },
        //background: blackColor,
        opacity: ".8"
      }
    },

    sidebarWrapper: {
      position: "relative",
      height: "calc(100vh - 75px)",
      overflow: "auto",
      width: "260px",
      zIndex: 4,
      overflowScrolling: "touch"
    },

  }
);

export default sidebarStyle;
