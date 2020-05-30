import React from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import classNames from "classnames";

interface FixedBarProps{
  children?: any,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  }),
);

export default function FixedBar(
  props:FixedBarProps = {}
) {
  const {children} = props
  const classes = useStyles();
  return(
    <div className={classes.root}>
      Fixed Bar
      {children}
    </div>
  )
}