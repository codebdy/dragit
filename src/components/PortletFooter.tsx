import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portletFooter: {
      flex:1,
    },

  }),
);

export default function PortletFooter(){
  const classes = useStyles();
  return (
    <div className={classes.portletFooter}>
    </div>
  )
}
