import React from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import FontIcon from "components/common/FontIcon"

interface FixedBarProps{
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      right:'0',
      top:'calc(50% - 50px)',
      width:'56px',
      background:'#7367f0',
      color:"rgba(255,255,255,1)",
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems:'center',
      borderRadius:'5px 0 0 5px',
      boxShadow:theme.shadows[15],
      padding:'10px 0',
    },
  }),
);

export default function FixedBar(
  props:FixedBarProps = {}
) {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <FontIcon iconClass="mdi mdi-pencil-ruler" />
      <FontIcon iconClass="mdi mdi-view-module" />
      <FontIcon iconClass="mdi mdi-file-tree" />
      <FontIcon iconClass="mdi mdi-cog" />
    </div>
  )
}