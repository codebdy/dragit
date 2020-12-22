import React from "react";
import { createStyles, Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import MdiIcon from "components/common/MdiIcon";

interface BrandProps{
  fullWidth?: number,
  floatUp?: boolean,
  children?: any,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 17px',
      paddingRight: '10px',
      height:'65px',
    },
    logo:{
      display:'flex',
      flexFlow:'row',
      alignItems: 'center',
    },
    img: {
      width: "35px",
      top: "22px",
      verticalAlign: "middle",
      border: "0",
      transition: "all 0.3s",
    },
    logoText: {
      marginLeft:'20px',
      fontSize:"1.4rem",
      letterSpacing:"0.15rem",
    },
    
    //floatUpImg:{
    //  marginLeft: "3px",
    //  width: "31px",
    //}
  }),
);

export default function Brand(
  props:BrandProps = {}
) {
  const {fullWidth = 260, children} = props
  const classes = useStyles();
  const theme = useTheme()
  return(
    <div className={classes.root} style={{width:fullWidth + 'px'}}>
      <div className={classes.logo}>
        {
        //<img className={classNames(classes.img)} src={logo} alt="logo" />
        }
        <MdiIcon iconClass = "mdi-feather" color = {theme.palette.text.primary} size={36} />
        <div className={classes.logoText}>RxDrag</div>
      </div>
      {children}
    </div>
  )
}