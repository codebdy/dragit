import React from "react";
import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1',
    },

  }),
);

export default function PageContent() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className = {classNames( 
      'dragit-page-content', 
      classes.root,
      theme.palette.type === 'light' ? 'light' :'',
    )}>
        <div style={{height:'1000px', width:'100%'}}>xxxx</div>
    </div>
  )
}