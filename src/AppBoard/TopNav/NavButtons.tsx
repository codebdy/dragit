import React, { Fragment } from "react";
import IconButton from '@material-ui/core/IconButton';
import { Hidden, Typography, createStyles, makeStyles, Theme, Tooltip } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import intl from "react-intl-universal";
import EvenNotification from "./Notifications"
import MdiIcon from "Components/common/MdiIcon";
import { useDragItStore } from "Store/Helpers/useDragItStore";
import { AccountAvatar } from "./AccountAvatar";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    grow: {
      flexGrow: 1,
    },

  }),
);


export default function NavButtons(props:{color?:string, onSidebarToggle: any}) {
  const {color} = props;
  const classes = useStyles();
  const appStore = useDragItStore();
 
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