import { Fragment, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { IDragOverParam } from "./IDragOverParam";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import bus, { DRAG_OVER_EVENT } from './bus';
import React from 'react';
import classNames from 'classnames';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:'fixed',
      pointerEvents: 'none',
      height:'4px',
      color:theme.palette.primary.main,
      background:theme.palette.primary.main,
      border:theme.palette.background.paper + ' solid 1px',
      transition:'width 0.3s, left 0.3s, top 0.3s',
    },

    vertical:{
      transform:'rotate(90deg)',
      transformOrigin:'left 0',
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
  const [dragOverParam, setDragOverParam] = useState<IDragOverParam>();
  const classes = useStyles();
  
  const handleDragOverEvent = (param:IDragOverParam)=>{
    setDragOverParam(param);
  }

  useEffect(()=>{
    bus.on(DRAG_OVER_EVENT, handleDragOverEvent);
    return ()=>{
      bus.off(DRAG_OVER_EVENT, handleDragOverEvent);
    }
  },[])
  const rect = dragOverParam?.targetNode?.rect;
  const isvertical = dragOverParam?.position ==='out-left' || dragOverParam?.position ==='out-right'
    ||dragOverParam?.position ==='in-left' || dragOverParam?.position ==='in-right';

  const cursorWidth = isvertical ? (rect?.height) : (rect?.width)
  let cursorLeft = rect?.x;
  let marginLeft = '0px';
  let marginTop = '-1px';
  let cursorTop = rect?.y;  
  
  if(dragOverParam?.position ==='out-top'){
    marginTop = "-3px";
  }

  if(dragOverParam?.position ==='out-bottom'){
    cursorTop = (rect?.y||0) + (rect?.height||0);
    marginTop = "-1px";
  }

  if(dragOverParam?.position ==='in-top'){
    marginTop = "1px";
  }
  if(dragOverParam?.position ==='in-bottom'){
    cursorTop = (rect?.y||0) + (rect?.height||0);
    marginTop = "-4px";
  }

  if(dragOverParam?.position ==='in-left'){
    marginTop = "1px";
    marginLeft = '4px';
  }
  if(dragOverParam?.position === 'in-right'){
    cursorLeft = (rect?.x || 0) + (rect?.width||0);
    marginTop = "1px";
  }

  if(dragOverParam?.position ==='out-right'){
    cursorLeft = (rect?.x || 0) + (rect?.width||0)
    marginLeft = '2px'
  }

  if(dragOverParam?.position ==='out-left'){
    marginLeft = '2px'
  }


  const top = Math.round(cursorTop||0) + 'px';
  const left = Math.round(cursorLeft||0) + 'px';
  const width = Math.round(cursorWidth||0) + 'px';

  return (
    <Fragment>
      {
        rect &&
        <div 
          className={
            classNames(
              classes.root, { [classes.vertical]:isvertical }
            )
          } 
          style={{
            marginTop: marginTop,
            marginLeft: marginLeft,
            top: top,
            left: left,
            width: width,
          }}
        >
          {
            dragOverParam?.position !=='in-top' && dragOverParam?.position !=='in-right' &&
            <ArrowDropUpIcon className={classes.upArrow}/>            
          }
          {
             dragOverParam?.position !=='in-bottom' && dragOverParam?.position !=='in-left' &&
            <ArrowDropDownIcon className = {classes.downArrow} />
          }
        </div>
      }
    </Fragment>
  )
}
