import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { IContext } from '../Node/IContext';
import bus, { FOCUS_NODE, UN_FOCUS_NODE } from '../bus';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      position:'fixed',
      background:'#5d78ff',
      color:'#fff',
      padding:' 0 5px',
      fontSize:'0.8rem',
      height:'20px',
      lineHeight:'20px',
      width:'100px',
    },

  }),
);

export default function NodeToolbar(){
  const classes = useStyles();
  const [following, setFollowing] = React.useState<IContext|null>(null);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const doFollow = (node:IContext)=>{
    let domElement = node.view.dom()
    let rect = domElement.getBoundingClientRect()
    setLeft(rect.right - 100)
    let top = rect.y < 80 ? rect.y + rect.height : rect.y - 20
    setTop(top)
  }

  const follow = (node:IContext)=>{
    setFollowing(node);
    doFollow(node);
}

  const unFollow = (node:IContext)=>{
    if(following && following.schema.id === node.schema.id){
      setFollowing(null)
      
    }
  }

  useEffect(() => {
    bus.on(FOCUS_NODE, follow)
    bus.on(UN_FOCUS_NODE, unFollow)
    return () => {
      bus.off(FOCUS_NODE, follow)
      bus.off(UN_FOCUS_NODE, unFollow)
    };
  });

  return (
    <Fragment>
      {!!following && 
        <div className={classes.toolbar}
          style={{
            left:left + 'px',
            top: top + 'px',
          }}
        >
          Toolbar
        </div>
      }

    </Fragment>
  )
}
