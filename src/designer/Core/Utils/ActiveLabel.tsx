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
  const [nodId, setNodeId] = React.useState(0);
  const [text, setText] = React.useState('');

  const activeNode = (node:IContext)=>{
    setNodeId(node.schema.id);
    setText(node.rule.label);
    //if(node.schema.id !== schema.id)
    //nodeContext.toNormalState()
  }

  const unActiveNode = (node:IContext)=>{
    if(nodId === node.schema.id){
      setNodeId(0)
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
      {nodId !== 0 && 
        <div className={classes.label}>
          {text}
        </div>
      }

    </Fragment>
  )
}
