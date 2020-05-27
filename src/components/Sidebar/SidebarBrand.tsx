import React from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import logo from "assets/img/logo-256-o.png"

interface BrandProps{
  fullWidth: number,
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
      border: "0"
    },
    logoText: {
      marginLeft:'1.2rem',
      fontSize:"1.4rem",
      letterSpacing:"0.15rem",
    },    
  }),
);

export default function Brand(
  props:BrandProps = { fullWidth : 260}
) {
  const {fullWidth, children} = props
  const classes = useStyles();
  return(
    <div className={classes.root} style={{width:fullWidth + 'px'}}>
      <div className={classes.logo}>
        <img className={classes.img} src={logo} alt="logo" />
        <div className={classes.logoText}>DragIt</div>
      </div>
      {children}
    </div>
  )
}