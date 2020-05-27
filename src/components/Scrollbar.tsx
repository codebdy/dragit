import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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
     
/*      '&::-webkit-scrollbar': {
        width: '0.3rem',
        height: '0.3rem',
        display: 'none',
      },

      '&:over':{
        '&::-webkit-scrollbar': {
          display: 'block',
        },
  
      },

      '&::-webkit-scrollbar-track': {
        borderRadius: '0.2rem',
      }, 

     '&::-webkit-scrollbar-thumb': {
        borderRadius: '0.2rem',
        background: 'rgba(255,255,255, 0.2)',
        transition: 'all .2s',
      },*/
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
        classNames('dragit-scrollbar', classes.scrollable, {
          [classes.shellX]:scrollX,
          [classes.shellY]:scrollY,
      })
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