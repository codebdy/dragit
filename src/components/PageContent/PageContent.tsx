import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1',
      //padding:'20px',
    },

  }),
);

export default function PageContent(props:{spacing?:number, children?: any}) {
  const {spacing = 5, children} = props;
  const classes = useStyles();
  return (
    <div className = {classNames( 
        classes.root,
      )}
      //style={{padding: (spacing*4) + 'px'}}
    >
      {children}
    </div>
  )
}