import React, { Fragment, useState } from 'react';
import {observer} from 'mobx-react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { DADA_RXID_CONST } from 'Base/RXNode/RXNode';
import { useDebugStore } from '../DebugStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      outline:'dashed green 2px',
      pointerEvents:'none',
      zIndex:theme.zIndex.appBar - 10,
    },

  }),
);
export const ModelSelector = observer(() => {
  const classes = useStyles();
  const [rect, setRect] = useState<DOMRect>();
  const debugStore = useDebugStore();
  const selectedRxid = debugStore?.selectedModel?.node.rxid;

  const getDom = ()=>{
    return document.querySelector(`[${DADA_RXID_CONST}="${selectedRxid}"]`);
  }

  const getDomRect = ()=>{
    const selectedDom = getDom();
    return selectedDom?.getBoundingClientRect();
  }

  const reComputeRect = ()=>{
    setRect(getDomRect());
  }  
  
  const doFollow = ()=>{
    if(debugStore?.selectedModel){
      reComputeRect();
    }

  }

  useEffect(() => {
    window.addEventListener('resize', doFollow)
    window.addEventListener('scroll', doFollow)
    return () => {
      window.removeEventListener('resize', doFollow)
      window.removeEventListener('scroll', doFollow)
    };
  });


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
  }, [selectedRxid])

  return (
    selectedRxid && rect
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
