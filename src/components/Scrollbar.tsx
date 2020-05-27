import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scrollable:{
      flex:1,
      position: 'relative',
    },

    scrollX:{
      overflowX: 'auto',
    },

    scrollY:{
      overflowY: 'auto',
    },
    
    lightTheme:{

    },

    darkTheme:{

    },

  }),
);

interface ScrollbarProps{
  scrollY?: boolean,
  scrollX?: boolean,
  children?: any,
}
export default function Scrollbar(props:ScrollbarProps = {}) {
  const {
    scrollX = false, 
    scrollY = true,
    children 
  } = props
  const classes = useStyles();

  return (
    <div
      className={
        classNames(classes.scrollable, {
          [classes.scrollX]:scrollX,
          [classes.scrollY]:scrollY,
        })
      }
    >
      {children}
    </div>
  )

}