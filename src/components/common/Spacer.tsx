import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacer: {
      flex:1,
    },

  }),
);

export default function Spacer(){
  const classes = useStyles();
  return (
    <div className={classes.spacer}>
    </div>
  )
}
