import { Fragment, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { IDragOverParam } from "./IDragOverParam";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import bus from '../../../base/bus';
import { CANVAS_SCROLL, DRAG_OVER_EVENT } from "./busEvents";
import React from 'react';
import classNames from 'classnames';
import { IRect } from 'base/Model/IRect';
import { useCanvarsStore } from '../CanvasStore';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:'fixed',
      //pointerEvents: 'none',
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
    },
    leftArrow:{
      position:'absolute',
      right:'-13px',
      top:'-14px',
    },
    rightArrow:{
      position:'absolute',
      left:'-13px',
      top:'-14px',
    }

  }),
);

//1、基于Bust event来实现，用React组件参数的话，会卡顿
//2、避免画面卡顿，全局变量存储拖动参数
export default function DragCusor(){
  //const [dragOverParam, setDragOverParam] = useState<IDragOverParam>();
  const [rect, setRect] = useState<IRect>();
  const classes = useStyles();
  const canvasStore = useCanvarsStore();
  
  const handleDragOverEvent = (param:IDragOverParam)=>{
    //只有可拖释放时，才记录拖动信息，避免释放无效的bug
    if(param.position){
      canvasStore.setDragOverParam(param);
      setRect(param?.targetNode?.rect);
    }
  }

  const hangdeScroll = ()=>{
    setRect(canvasStore.dragOverParam?.targetNode?.rect);
  }
  
  useEffect(()=>{
    bus.on(DRAG_OVER_EVENT, handleDragOverEvent);
    bus.on(CANVAS_SCROLL, hangdeScroll);
    return ()=>{
      bus.off(DRAG_OVER_EVENT, handleDragOverEvent);
      bus.off(CANVAS_SCROLL, hangdeScroll);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const isvertical = canvasStore.dragOverParam?.position ==='out-left' || canvasStore.dragOverParam?.position ==='out-right'
    ||canvasStore.dragOverParam?.position ==='in-left' || canvasStore.dragOverParam?.position ==='in-right';

  const cursorWidth = isvertical ? (rect?.height) : (rect?.width)
  let cursorLeft = rect?.x;
  let marginLeft = '0px';
  let marginTop = '-1px';
  let cursorTop = rect?.y;  
  
  if(canvasStore.dragOverParam?.position ==='out-top'){
    marginTop = "-3px";
  }

  if(canvasStore.dragOverParam?.position ==='out-bottom'){
    cursorTop = (rect?.y||0) + (rect?.height||0);
    marginTop = "-1px";
  }

  if(canvasStore.dragOverParam?.position ==='in-top'){
    marginTop = "1px";
  }
  if(canvasStore.dragOverParam?.position ==='in-bottom'){
    cursorTop = (rect?.y||0) + (rect?.height||0);
    marginTop = "-4px";
  }

  if(canvasStore.dragOverParam?.position ==='in-left'){
    marginTop = "1px";
    marginLeft = '4px';
  }
  if(canvasStore.dragOverParam?.position === 'in-right'){
    cursorLeft = (rect?.x || 0) + (rect?.width||0);
    marginTop = "1px";
  }

  if(canvasStore.dragOverParam?.position ==='out-right'){
    cursorLeft = (rect?.x || 0) + (rect?.width||0)
    marginLeft = '2px'
  }

  if(canvasStore.dragOverParam?.position ==='out-left'){
    marginLeft = '2px'
  }

  if(canvasStore.dragOverParam?.position ==='in-center'){
    cursorTop =  (rect?.y||0) + (rect?.height||0)/2;
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
            canvasStore.dragOverParam?.position !=='in-top' && canvasStore.dragOverParam?.position !=='in-right' &&
            canvasStore.dragOverParam?.position !=='in-center'&&
            <ArrowDropUpIcon className={classes.upArrow}/>            
          }
          {
             canvasStore.dragOverParam?.position !=='in-bottom' && canvasStore.dragOverParam?.position !=='in-left' &&
             canvasStore.dragOverParam?.position !=='in-center'&&
            <ArrowDropDownIcon className = {classes.downArrow} />
          }
          {
            canvasStore.dragOverParam?.position ==='in-center'&&
            <Fragment>
              <ArrowLeftIcon className = {classes.leftArrow} fontSize="large"/>
              <ArrowRightIcon className = {classes.rightArrow} fontSize="large"/>
            </Fragment>
          }
        </div>
      }
    </Fragment>
  )
}
