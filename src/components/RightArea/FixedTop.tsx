import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      position: 'absolute',
      left:'0',
      top:'0',
      width:'100%',
      minHeight: '50px',
    },

  }),
);

export default function FixedTop() {
  const classes = useStyles();
  return (
    <div className = {classes.root}>
      Top
    </div>
  )
}