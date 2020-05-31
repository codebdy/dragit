import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import PageContent from "./PageContent";
import FixedTop from "./FixedTop";
import FixedBottom from "./FixedBottom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:'1',
      display: 'flex',
      flexFlow: 'column',
      position: 'relative',
      background: '#f2f4f4',
      width: '0',
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