import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { INode } from '../Node/INode';
import bus from '../bus';

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
  const [following, setFollowing] = React.useState<INode|null>(null);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const doFollow = (node:INode)=>{
    let domElement = node.view?.getDom()
    if(!domElement){
      return 
    }
    let rect = domElement.getBoundingClientRect()
    setLeft(rect.x)
    let top = rect.y < 80 ? rect.y + rect.height : rect.y - 20
    setTop(top)
  }

  const follow = (node:INode)=>{
    setFollowing(node);
    doFollow(node);
}

  const unFollow = (node:INode)=>{
    if(following && following.id === node.id){
      setFollowing(null)
    }
  }

  useEffect(() => {
    bus.on(showEvent, follow)
    bus.on(hideEvent, unFollow)
    return () => {
      bus.off(showEvent, follow)
      bus.off(hideEvent, unFollow)
    };
  });

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
