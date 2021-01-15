import React, { Fragment, useState } from 'react';
import { useAppStore } from 'Store/Helpers/useAppStore';
import {observer} from 'mobx-react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      outline:'dashed green 2px',
      pointerEvents:'none',
    },

  }),
);
export const ModelSelector = observer(() => {
  const classes = useStyles();
  const appStore = useAppStore();
  const [rect, setRect] = useState<DOMRect>();

  const getDom = ()=>{
    return document.querySelector(`[data-rxid="${appStore.selectModelComponentRxid}"]`);
  }

  const getDomRect = ()=>{
    const selectedDom = getDom();
    return selectedDom?.getBoundingClientRect();
  }

  const reComputeRect = ()=>{
    setRect(getDomRect());
  }  
  
  const handleScroll = ()=>{
    console.log('Scroll')
    reComputeRect();
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  useEffect(()=>{
    const currentRect = getDomRect();
    //滚动条高度+视窗高度 = 可见区域底部高度
    const visibleBottom = window.scrollY + document.documentElement.clientHeight;
    //可见区域顶部高度
    const visibleTop = window.scrollY;

    if(currentRect && (currentRect.bottom <= visibleTop || currentRect.top >= visibleBottom)){
      //document.documentElement.scrollTop = currentRect.top;
      getDom()?.scrollIntoView()
    }

    reComputeRect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStore.selectModelComponentRxid])

  return (
    appStore.selectModelComponentRxid && rect
    ? <div 
        className={classes.root}
        style = {{
          left: Math.round(rect.left) + 'px',
          top: Math.round(rect.top) + 'px',
          width: Math.round(rect.width) + 'px',
          height: Math.round(rect.height) + 'px',
        }}
      ></div>
    : <Fragment></Fragment>
  );
})
