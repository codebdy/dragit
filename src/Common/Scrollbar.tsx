import React, { useRef } from "react";
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
  onScroll?: (scrollRef: React.RefObject<HTMLDivElement>)=>void,
  onDragOver?:(event:React.DragEvent<HTMLElement>)=>void,
  onDrop?:(event:React.DragEvent<HTMLElement>)=>void,
  style?:any,
}
export default function Scrollbar(props:ScrollbarProps = {}) {
  const {
    scrollX = false, 
    scrollY = true,
    permanent = false,
    className,
    children,
    onScroll = (scrollRef:React.RefObject<HTMLDivElement>)=>{},
    onDragOver,
    onDrop,
    style
  } = props
  const classes = useStyles();

  const theme = useTheme()
  const ref = useRef(null);

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
      onScroll = {(e)=>{
        e.preventDefault();
        onScroll(ref);
      }}

      onDragOver = {onDragOver}
      onDrop = {onDrop}

      {...style}
    >
      <div
        ref = {ref}
        className={
          classNames(className, classes.scrollable, {
            [classes.scrollX]:scrollX,
            [classes.scrollY]:scrollY,
          })
        }

        onScroll = {(e)=>{
          e.preventDefault();
          onScroll(ref)
        }}
      >
        {children}
      </div>
    </div>
  )

}