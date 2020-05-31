import React from "react";
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    shellY:{
      flex:1, 
      paddingRight:'2px', 
      display:'flex', 
      flexFlow:'column',
      height:'0'
    },
    shellX:{
      flex:1, 
      paddingBottom:'2px', 
      display:'flex', 
      flexFlow:'row',
      width:'0',
    },
    scrollable:{
      flex:1,
      position: 'relative',
    },

    scrollX:{
      overflowX: 'auto',
      overflowY:'hidden',
    },

    scrollY:{
      overflowY: 'auto',
      overflowX: 'hidden',
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

  const theme = useTheme()

  return (
    <div 
      className={
        classNames(
          'dragit-scrollbar', 
          theme.palette.type === 'light' ? 'light' :'',
          classes.scrollable, 
          {
            [classes.shellX]:scrollX,
            [classes.shellY]:scrollY,
          }
        )
      }
    >
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
    </div>
  )

}