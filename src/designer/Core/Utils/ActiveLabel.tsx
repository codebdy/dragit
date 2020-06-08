import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { IContext } from '../Node/IContext';
import bus, { ACTIVE_NODE, UN_ACTIVE_NODE } from '../bus';

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

export default function ActiveLabel(){
  const classes = useStyles();
  const [following, setFollowing] = React.useState<IContext|null>(null);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const followElement = (node:IContext)=>{
    let domElement = node.view.dom()
    let rect = domElement.getBoundingClientRect()
    setLeft(rect.x)
    let top = rect.y < 80 ? rect.y + rect.height : rect.y - 20
    setTop(top)
  }

  const activeNode = (node:IContext)=>{
    setFollowing(node);
    //setText(node.rule.label);
    followElement(node);
    //if(node.schema.id !== schema.id)
    //nodeContext.toNormalState()
  }

  const unActiveNode = (node:IContext)=>{
    if(following && following.schema.id === node.schema.id){
      setFollowing(null)
    }
    //if(node.schema.id !== schema.id)
    //nodeContext.toNormalState()
  }

  useEffect(() => {
    bus.on(ACTIVE_NODE, activeNode)
    bus.on(UN_ACTIVE_NODE, unActiveNode)
    return () => {
      bus.off(ACTIVE_NODE, activeNode)
      bus.off(UN_ACTIVE_NODE, unActiveNode)
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
