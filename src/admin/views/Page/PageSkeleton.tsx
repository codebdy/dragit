import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 'calc(100vh - 150px)',
  },
}));


export default function PageSkeleton(){
  const classes = useStyles();
  return (
    <Fragment>
      <Skeleton animation="wave" height={50} width="30%" style={{ marginTop: 6 }} />
      <Skeleton animation="wave" variant="rect" className={classes.media} />
    </Fragment>
  )
}
