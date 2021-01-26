import { Fragment, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React from 'react';
import classNames from 'classnames';
import { IRect } from 'Base/Model/IRect';
import { observer } from 'mobx-react';
import { useDesign } from '../../Design/PageEditor/useDesign';


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
export const DragCusor = observer(()=>{
  //const [dragOverParam, setDragOverParam] = useState<IDragOverParam>();
  const [rect, setRect] = useState<IRect>();
  const classes = useStyles();
  const {editorStore} = useDesign();

  useEffect(()=>{      
    if(editorStore?.dragOverParam){
      const param = editorStore?.dragOverParam;
      if(param.position){
        editorStore?.setDragOverParam(param);
        setRect(param?.targetNode?.rect);
        return;
      }
    }
    setRect(undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[editorStore?.dragOverParam])

  useEffect(()=>{
    setRect(editorStore?.dragOverParam?.targetNode?.rect);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[editorStore?.refreshToolbarAndLabelFlag])

  const isvertical = editorStore?.dragOverParam?.position ==='out-left' || editorStore?.dragOverParam?.position ==='out-right'
    ||editorStore?.dragOverParam?.position ==='in-left' || editorStore?.dragOverParam?.position ==='in-right';

  const cursorWidth = isvertical ? (rect?.height) : (rect?.width)
  let cursorLeft = rect?.x;
  let marginLeft = '0px';
  let marginTop = '-1px';
  let cursorTop = rect?.y;  
  
  if(editorStore?.dragOverParam?.position ==='out-top'){
    marginTop = "-3px";
  }

  if(editorStore?.dragOverParam?.position ==='out-bottom'){
    cursorTop = (rect?.y||0) + (rect?.height||0);
    marginTop = "-1px";
  }

  if(editorStore?.dragOverParam?.position ==='in-top'){
    marginTop = "1px";
  }
  if(editorStore?.dragOverParam?.position ==='in-bottom'){
    cursorTop = (rect?.y||0) + (rect?.height||0);
    marginTop = "-4px";
  }

  if(editorStore?.dragOverParam?.position ==='in-left'){
    marginTop = "1px";
    marginLeft = '4px';
  }
  if(editorStore?.dragOverParam?.position === 'in-right'){
    cursorLeft = (rect?.x || 0) + (rect?.width||0);
    marginTop = "1px";
  }

  if(editorStore?.dragOverParam?.position ==='out-right'){
    cursorLeft = (rect?.x || 0) + (rect?.width||0)
    marginLeft = '2px'
  }

  if(editorStore?.dragOverParam?.position ==='out-left'){
    marginLeft = '2px'
  }

  if(editorStore?.dragOverParam?.position ==='in-center'){
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
            editorStore?.dragOverParam?.position !=='in-top' && editorStore?.dragOverParam?.position !=='in-right' &&
            editorStore?.dragOverParam?.position !=='in-center'&&
            <ArrowDropUpIcon className={classes.upArrow}/>            
          }
          {
             editorStore?.dragOverParam?.position !=='in-bottom' && editorStore?.dragOverParam?.position !=='in-left' &&
             editorStore?.dragOverParam?.position !=='in-center'&&
            <ArrowDropDownIcon className = {classes.downArrow} />
          }
          {
            editorStore?.dragOverParam?.position ==='in-center'&&
            <Fragment>
              <ArrowLeftIcon className = {classes.leftArrow} fontSize="large"/>
              <ArrowRightIcon className = {classes.rightArrow} fontSize="large"/>
            </Fragment>
          }
        </div>
      }
    </Fragment>
  )
})
