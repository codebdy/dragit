import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding:theme.spacing(4),
    },

  }),
);

export default function Page404(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>404 Error，can not find page！</h2>
    </div>
  )
}
