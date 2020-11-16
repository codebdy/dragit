import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { INode } from '../Node/INode';
import bus, { CANVAS_SCROLL } from '../bus';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      position:'fixed',
      background:'#5d78ff',
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

export default function Label(props:{showEvent:string, hideEvent:string}){
  const{showEvent, hideEvent} = props;
  const classes = useStyles();
  const [following, setFollowing] = React.useState<INode|undefined>(undefined);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const selectMyStore = (state: RootState) => state.designer
  const myStore = useSelector(selectMyStore)
  
  const doFollow = (node:INode|undefined)=>{
    let domElement = node?.view?.getDom()
    if(!domElement){
      return 
    }
    let rect = domElement.getBoundingClientRect()
    setLeft(rect.x)
    let top = rect.y < 90 ? rect.y + rect.height : rect.y - 20
    setTop(top)
  }

  const follow = (node:INode)=>{
    setFollowing(node);
    doFollow(node);
}

  const unFollow = (node:INode)=>{
    if(following && following.id === node.id){
      setFollowing(undefined)
    }
  }
  const hangdePositionChange = ()=>{
    doFollow(following);
  }

  useEffect(() => {
    bus.on(showEvent, follow)
    bus.on(hideEvent, unFollow)
      bus.on(CANVAS_SCROLL, hangdePositionChange);
      window.addEventListener('resize', hangdePositionChange)
    return () => {
      bus.off(showEvent, follow)
      bus.off(hideEvent, unFollow)
      bus.off(CANVAS_SCROLL, hangdePositionChange);
      window.removeEventListener('resize', hangdePositionChange)
     };
  });

  useEffect(() => {
    hangdePositionChange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[myStore.showPaddingX, myStore.showPaddingY]);

  return (
    <Fragment>
      {!!following && following.label &&
        <div className={classes.label}
          style={{
            left:left + 'px',
            top: top + 'px',
          }}
        >
          {following.label}
        </div>
      }

    </Fragment>
  )
}
