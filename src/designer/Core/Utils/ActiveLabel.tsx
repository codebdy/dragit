import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { IContext } from '../Node/IContext';
import bus, { ACTIVE_NODE, UN_ACTIVE_NODE } from '../bus';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      position:'fixed',
    },

  }),
);

export default function ActiveLabel(){
  const classes = useStyles();
  const [nodId, setNodeId] = React.useState(0);

  const activeNode = (node:IContext)=>{
    setNodeId(node.schema.id)
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
    <div className={classes.label}>
      Active Label
    </div>
  )
}
