import React from "react";
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    shellY:{
      flex:1, 
      display:'flex', 
      flexFlow:'column',
      height:'0',
    },
    shellX:{
      flex:1, 
      //paddingBottom:'2px', 
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
  className?: string,
  children?: any,
  permanent?:boolean,
  onScroll?: any,
}
export default function Scrollbar(props:ScrollbarProps = {}) {
  const {
    scrollX = false, 
    scrollY = true,
    permanent = false,
    className,
    children,
    onScroll
  } = props
  const classes = useStyles();

  const theme = useTheme()

  return (
    <div 
      className={
        classNames(
          'dragit-scrollbar ',
          permanent && 'permanent',
          className, 
          theme.palette.type === 'light' ? 'light' :'',
          classes.scrollable, 
          {
            [classes.shellX]:scrollX,
            [classes.shellY]:scrollY,
          }
        )
        
      }
      onScroll = {onScroll}
    >
      <div
        className={
          classNames(className, classes.scrollable, {
            [classes.scrollX]:scrollX,
            [classes.scrollY]:scrollY,
          })
        }

        onScroll = {onScroll}
      >
        {children}
      </div>
    </div>
  )

}