import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portletHeader: {
      flex:1,
    },

  }),
);

export default function PortletHeader(){
  const classes = useStyles();
  return (
    <div className={classes.portletHeader}>
    </div>
  )
}
