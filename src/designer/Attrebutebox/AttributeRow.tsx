import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    attrRow:{
      display:'flex',
      flexFlow:'row',
      padding:theme.spacing(0.6, 0),
    },

  }),
);

export function AttributeRow(props:{children:any}){
  const classes = useStyles();
  return (
      <div className={classes.attrRow}>
        {props.children}
      </div>
  )
}
