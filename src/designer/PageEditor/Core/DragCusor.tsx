import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { IDragOverEvent } from './ComponentView';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import bus, { DRAG_OVER_EVENT } from './bus';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:'fixed',
      pointerEvents: 'none',
      height:'4px',
      color:theme.palette.primary.main,
      background:theme.palette.primary.main,
      border:theme.palette.background.paper + ' solid 1px',
      //transform:'rotate(90deg)',
      transition:'width 0.3s, left 0.3s, top 0.3s',
    },

    upArrow:{
      position:'absolute',
      left:'calc(50% - 10px)',
      top:'-14px',
    },
    downArrow:{
      position:'absolute',
      left:'calc(50% - 10px)',
      top:'-5px',
    }

  }),
);

//基于事件来实现，用React组件参数的话，会卡顿
export default function DragCusor(){
  const [dragOverEvent, setDragOverEvent] = useState<IDragOverEvent>();
  const classes = useStyles();
  
  const handleDragOverEvent = (event:IDragOverEvent)=>{
    setDragOverEvent(event);
  }

  useEffect(()=>{
    bus.on(DRAG_OVER_EVENT, handleDragOverEvent);
    return ()=>{
      bus.off(DRAG_OVER_EVENT, handleDragOverEvent);
    }
  },[])

  const rect = dragOverEvent?.rect;
  const top = Math.round(rect?.y||0) + 'px';
  const left = Math.round(rect?.x||0) + 'px';
  const width = Math.round(rect?.width||0) + 'px';
  return (
    <Fragment>
      {
        rect &&
        <div className={classes.root} style={{
          marginTop: '-3px',
          top: top,
          left: left,
          width: width,
        }}>
          <ArrowDropUpIcon className={classes.upArrow}/>
          <ArrowDropDownIcon className = {classes.downArrow} />
        </div>
      }
    </Fragment>
  )
}
