import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import bus from '../../../base/bus';
import { CANVAS_SCROLL } from "./busEvents";
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      position:'fixed',
      background:fade(theme.palette.primary.main, 0.8),
      color:'#fff',
      padding:' 0 5px',
      fontSize:'0.8rem',
      height:'20px',
      lineHeight:'20px',
      userSelect:'none',
      cursor: 'default',
    },

  }),
);

export default function ActiveLabel(
  props:{
    followDom:HTMLElement|null|undefined, 
    label:string,
  }
){
  const{followDom, label} = props;
  const classes = useStyles();
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  
  const doFollow = ()=>{
    let rect = followDom?.getBoundingClientRect()
    if(rect){
      setLeft(rect.x)
      let top = rect.y < 90 ? rect.y + rect.height : rect.y - 20
      setTop(top)
    }
  }

  useEffect(()=>{
    doFollow();
    bus.on(CANVAS_SCROLL, hangdePositionChange);
    window.addEventListener('resize', hangdePositionChange)
    return () => {
      bus.off(CANVAS_SCROLL, hangdePositionChange);
      window.removeEventListener('resize', hangdePositionChange)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[followDom])

  
  const hangdePositionChange = ()=>{
    doFollow();
  }


  return (
    <Fragment>
      {followDom &&
        <div className={classes.label}
          style={{
            left:left + 'px',
            top: top + 'px',
          }}
        >
          {label}
        </div>
      }

    </Fragment>
  )
}
