import React, { Fragment } from "react";
import IconButton from '@material-ui/core/IconButton';
import { Hidden, Typography, createStyles, makeStyles, Theme, Tooltip } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import intl from "react-intl-universal";
import EvenNotification from "./Notifications"
import MdiIcon from "Components/Common/MdiIcon";
import { useAppStore } from "Store/Helpers/useAppStore";
import { AccountAvatar } from "./AccountAvatar";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    grow: {
      flexGrow: 1,
    },

    githubLink:{
      color: theme.palette.text.secondary,
      marginRight:theme.spacing(1),
    },

  }),
);


export default function NavButtons(props:{color?:string, onSidebarToggle: any}) {
  const {color} = props;
  const classes = useStyles();
  const appStore = useAppStore();
 
  return(
    <Fragment>
      <Hidden mdUp>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.onSidebarToggle}
        >
          <MenuIcon style={{color:color}}/>
        </IconButton>
        <Typography variant="h6" noWrap  style={{color:color}}>
          RxDrag
        </Typography>          
      </Hidden>

      <div className={classes.grow} />

      
      <a href="https://github.com/rxwater/dragit" className={classes.githubLink} style={{color:color}} target="_blank" rel="noopener noreferrer">
        <MdiIcon iconClass = "mdi-github"/>
      </a>
      <EvenNotification color={color} />

      <Tooltip title={intl.get('theme-settings')} arrow placement="bottom"
        onClick = {()=>appStore.openShowThemeSettings()}
      >
        <IconButton aria-label={intl.get('theme-settings')} >
          <MdiIcon iconClass="mdi-application-cog" color={color} />
        </IconButton>
      </Tooltip>          

       <AccountAvatar />
    </Fragment>
  )
}