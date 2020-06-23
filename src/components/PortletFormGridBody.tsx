import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portletBody: {
      flex:1,
    },

  }),
);

export default function PortletFormGridBody(){
  const classes = useStyles();
  return (
    <div className={classes.portletBody}>
    </div>
  )
}
