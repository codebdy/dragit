import React from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import MdiIcon from "components/common/MdiIcon"
import IconButton from '@material-ui/core/IconButton';
import { Paper, Tooltip, Hidden } from "@material-ui/core";
import intl from 'react-intl-universal';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openAreaSelectAction } from "store/designer/actions";
import { closeFixedBarAction } from "store/fixedBar/actions";
import { RootState } from "store";
import { compactableAction } from "store/sidebar/actions";

interface FixedBarProps{
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      right: theme.spacing(1),
      //top:'calc(50% - 150px)',
      bottom: theme.spacing(10),
      width:'52px',
      //background:'#121246',
      color:"rgba(255,255,255,1)",
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems:'center',
      borderRadius:'5px',
      padding:'10px 0',
    },
  }),
);

export default function FixedBar(
  props:FixedBarProps = {}
) {
  const classes = useStyles();
  const dispatch = useDispatch()
  
  const selectMyStore = (state: RootState) => state.fixedBar
  const myStore = useSelector(selectMyStore)  

  const selectSidebar = (state: RootState) => state.sidebar
  const sidebarStore = useSelector(selectSidebar)  

  const handleOpen = () => {
    dispatch(openAreaSelectAction());
    dispatch(closeFixedBarAction());
    sidebarStore.compactable && dispatch(compactableAction());
  };

  return(
    <Hidden smDown>{}
    {
      myStore.open && 
      <Paper  className={classes.root} elevation={24}>
        <Tooltip title={intl.get('design-layout')} arrow placement="left">
          <IconButton aria-label={intl.get('design-layout')} onClick={handleOpen}>
            <MdiIcon iconClass="mdi-pencil-ruler" />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.get('modules')} arrow placement="left">
          <NavLink to={'/design'}>
            <IconButton aria-label={intl.get('modules')}>
              <MdiIcon iconClass="mdi-view-grid-plus" />
            </IconButton>
          </NavLink>
        </Tooltip>
        <Tooltip title={intl.get('theme-settings')} arrow placement="left">
          <IconButton aria-label={intl.get('theme-settings')}>
            <MdiIcon iconClass="mdi-image-filter-black-white" />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.get('debug')} arrow placement="left">
          <IconButton  aria-label={intl.get('debug')}>
            <MdiIcon iconClass="mdi-android-debug-bridge"/>
          </IconButton>
        </Tooltip>
      </Paper >
    }
    </Hidden>
  )
}