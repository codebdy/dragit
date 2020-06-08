import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { IContext } from '../Node/IContext';
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
    },

  }),
);

export default function Label(props:{showEvent:string, hideEvent:string}){
  const{showEvent, hideEvent} = props;
  const classes = useStyles();
  const [following, setFollowing] = React.useState<IContext|null>(null);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const doFollow = (node:IContext)=>{
    let domElement = node.view.dom()
    let rect = domElement.getBoundingClientRect()
    setLeft(rect.x)
    let top = rect.y < 80 ? rect.y + rect.height : rect.y - 20
    setTop(top)
  }

  const follow = (node:IContext)=>{
    setFollowing(node);
    doFollow(node);
    if(showEvent === 'FOCUS_NODE'){
      //console.log(following.schema.id === node.schema.id)
      console.log('activeNode', following?.schema.id)
    }
}

  const unFollow = (node:IContext)=>{
    if(following && following.schema.id === node.schema.id){
      setFollowing(null)
      if(showEvent === 'FOCUS_NODE'){
        console.log('unActiveNode', following.schema.id)
      }
      
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
      {!!following && 
        <div className={classes.label}
          style={{
            left:left + 'px',
            top: top + 'px',
          }}
        >
          {following.rule.label}
        </div>
      }

    </Fragment>
  )
}
