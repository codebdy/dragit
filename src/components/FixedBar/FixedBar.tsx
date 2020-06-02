import React from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import FontIcon from "components/common/FontIcon"
import IconButton from '@material-ui/core/IconButton';
import { Paper, Tooltip, Hidden } from "@material-ui/core";
import intl from 'react-intl-universal';
import { NavLink } from "react-router-dom";

interface FixedBarProps{
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      right:'0',
      top:'calc(50% - 150px)',
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

  return(
    <Hidden mdDown>
      <Paper  className={classes.root} elevation={24}>
        <Tooltip title={intl.get('design-layout')} arrow placement="left">
          <IconButton aria-label={intl.get('design-layout')}>
            <FontIcon iconClass="mdi mdi-pencil-ruler" />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.get('modules')} arrow placement="left">
          <NavLink to={'/design'}>
            <IconButton aria-label={intl.get('modules')}>
              <FontIcon iconClass="mdi mdi-view-grid-plus" />
            </IconButton>
          </NavLink>
        </Tooltip>
        <Tooltip title={intl.get('theme-settings')} arrow placement="left">
          <IconButton aria-label={intl.get('theme-settings')}>
            <FontIcon iconClass="mdi mdi-image-filter-black-white" />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.get('debug')} arrow placement="left">
          <IconButton  aria-label={intl.get('debug')}>
            <FontIcon iconClass="mdi mdi-android-debug-bridge"/>
          </IconButton>
        </Tooltip>
      </Paper >

    </Hidden>
  )
}