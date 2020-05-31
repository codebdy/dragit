import React from "react";
import { makeStyles, createStyles, Theme, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },

  }),
);

export default function FixedBottom() {
  const classes = useStyles();
  return (
    <Paper className = {classes.root}>
      Bottom
    </Paper>
  )
}