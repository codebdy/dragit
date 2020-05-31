import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },

  }),
);

export default function PageContent() {
  const classes = useStyles();
  return (
    <div className = {classes.root}>
      Center content
    </div>
  )
}