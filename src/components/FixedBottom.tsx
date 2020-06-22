import React from "react";
import { makeStyles, createStyles, Theme, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      position: 'absolute',
      left:'0',
      bottom:'0',
      width:'100%',
      minHeight: '50px',
    },

  }),
);

export default function FixedBottom() {
  const classes = useStyles();
  return (
    <Paper className = {classes.root} square>
      Bottom
    </Paper>
  )
}