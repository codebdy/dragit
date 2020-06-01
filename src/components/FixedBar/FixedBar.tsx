import React from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import FontIcon from "components/common/FontIcon"
import IconButton from '@material-ui/core/IconButton';
import { Paper, Tooltip } from "@material-ui/core";
import intl from 'react-intl-universal';

interface FixedBarProps{
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      right:'20px',
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
      <Paper  className={classes.root} elevation={24}>
        <Tooltip title={intl.get('design-layout')} arrow placement="left">
          <IconButton aria-label={intl.get('design-layout')}>
            <FontIcon iconClass="mdi mdi-pencil-ruler" />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.get('modules')} arrow placement="left">
          <IconButton aria-label={intl.get('modules')}>
            <FontIcon iconClass="mdi mdi-view-grid-plus" />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.get('settings')} arrow placement="left">
          <IconButton aria-label={intl.get('settings')}>
            <FontIcon iconClass="mdi mdi-cog" />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.get('debug')} arrow placement="left">
          <IconButton  aria-label={intl.get('debug')}>
            <FontIcon iconClass="mdi mdi-android-debug-bridge"/>
          </IconButton>
        </Tooltip>
      </Paper >
  )
}