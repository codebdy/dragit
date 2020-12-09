import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import bus from '../../../base/bus';
import { CANVAS_SCROLL, SELECT_NODE } from "./busEvents";
import useDesigner from 'store/designer/useDesigner';
import { IMeta } from 'base/Model/IMeta';
import { RXNode } from 'base/RXNode/RXNode';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      position:'fixed',
      background:theme.palette.primary.main,
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
declare var window:{ 
  selectedNode?:RXNode<IMeta>,
  addEventListener:any,
  removeEventListener:any,
};

export default function SelectedLabel(
  props:{
    label:string,
  }
){
  const{label} = props;
  const classes = useStyles();
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const designer = useDesigner();
  
  const handleSelect = (selectedNode:RXNode<IMeta>)=>{
    doFollow();
  }

  const doFollow = ()=>{
    let rect = window.selectedNode?.dom?.getBoundingClientRect();
    if(rect){
      setLeft(rect.x)
      let top = rect.y < 90 ? rect.y + rect.height : rect.y - 20
      setTop(top)
    }
  }

  useEffect(()=>{
    doFollow();
    bus.on(CANVAS_SCROLL, hangdePositionChange);
    bus.on(SELECT_NODE, handleSelect);
    window.addEventListener('resize', hangdePositionChange)
    return () => {
      bus.off(CANVAS_SCROLL, hangdePositionChange);
      bus.off(SELECT_NODE, handleSelect);
      window.removeEventListener('resize', hangdePositionChange)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  const hangdePositionChange = ()=>{
    doFollow();
  }

  useEffect(() => {
    hangdePositionChange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[designer.showPaddingX, designer.showPaddingY]);

  return (
    <Fragment>
      {window.selectedNode?.dom &&
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
