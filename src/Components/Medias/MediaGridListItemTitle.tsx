import React from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title:{
      textAlign: "center",
      paddingTop:theme.spacing(1),
    },
    titleText:{
      fontSize: '0.85rem',
    },

  }),
);

export default function MediaGridListItemTitle(props:{title:string}){
  const classes = useStyles();
  return (
    <div className={classes.title}>
      <Typography color="textSecondary" className={classes.titleText}>
        {props.title}
      </Typography>
    </div>
  )
}
