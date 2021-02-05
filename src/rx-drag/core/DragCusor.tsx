import { Fragment, useEffect, useState } from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React from 'react';
import classNames from 'classnames';
import { IRect } from 'rx-drag/models/IRect';
import { observer } from 'mobx-react';
import { useDesign } from '../store/useDesign';

export const DragCusor = observer(()=>{
  const [rect, setRect] = useState<IRect>();
  const {rxDragStore: editorStore} = useDesign();

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
    marginTop = "-1px";
  }

  if(editorStore?.dragOverParam?.position ==='out-bottom'){
    cursorTop = (rect?.y||0) + (rect?.height||0);
    marginTop = "1px";
  }

  if(editorStore?.dragOverParam?.position ==='in-top'){
    marginTop = "2px";
  }
  if(editorStore?.dragOverParam?.position ==='in-bottom'){
    cursorTop = (rect?.y||0) + (rect?.height||0);
    marginTop = "-3px";
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
              'rx-cusor', { 'rx-vertical':isvertical }
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
            <ArrowDropUpIcon className='rx-up-arrow'/>            
          }
          {
             editorStore?.dragOverParam?.position !=='in-bottom' && editorStore?.dragOverParam?.position !=='in-left' &&
             editorStore?.dragOverParam?.position !=='in-center'&&
            <ArrowDropDownIcon className = 'rx-down-arrow' />
          }
          {
            editorStore?.dragOverParam?.position ==='in-center'&&
            <Fragment>
              <ArrowLeftIcon className = 'rx-left-arrow' fontSize="large"/>
              <ArrowRightIcon className = 'rx-right-arrow' fontSize="large"/>
            </Fragment>
          }
        </div>
      }
    </Fragment>
  )
})
