import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import PageContent from "./PageContent";
import FixedTop from "./FixedTop";
import FixedBottom from "./FixedBottom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },

  }),
);

export default function RightArea() {
  const classes = useStyles();
  return (
    <div className = {classes.root}>
      <FixedTop />
      <PageContent />
      <FixedBottom />
    </div>
  )
}