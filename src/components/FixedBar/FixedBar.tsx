import React from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import FontIcon from "components/common/FontIcon"
import IconButton from '@material-ui/core/IconButton';
import { Paper, Tooltip } from "@material-ui/core";

interface FixedBarProps{
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      right:'0',
      top:'calc(50% - 150px)',
      width:'56px',
      //background:'#121246',
      color:"rgba(255,255,255,1)",
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems:'center',
      borderRadius:'5px 0 0 5px',
      padding:'10px 0',
    },
  }),
);

export default function FixedBar(
  props:FixedBarProps = {}
) {
  const classes = useStyles();
  return(
      <Paper  className={classes.root} elevation={20}>
        <Tooltip title="布局设计" arrow placement="left">
          <IconButton aria-label="布局设计">
            <FontIcon iconClass="mdi mdi-pencil-ruler" />
          </IconButton>
        </Tooltip>
        <Tooltip title="模块管理" arrow placement="left">
          <IconButton aria-label="模块管理">
            <FontIcon iconClass="mdi mdi-view-grid-plus" />
          </IconButton>
        </Tooltip>
        <Tooltip title="设置" arrow placement="left">
          <IconButton aria-label="设置">
            <FontIcon iconClass="mdi mdi-cog" />
          </IconButton>
        </Tooltip>
        <Tooltip title="调试" arrow placement="left">
          <IconButton  aria-label="调试">
            <FontIcon iconClass="mdi mdi-android-debug-bridge"/>
          </IconButton>
        </Tooltip>
      </Paper >
  )
}