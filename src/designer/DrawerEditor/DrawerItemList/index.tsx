import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IMenuItem from 'base/IMenuItem';
import { MenuNode } from './MenuNode';
import { RXNode } from 'base/RXNode/RXNode';
import Scrollbar from 'admin/common/Scrollbar';
import { List, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    userSelect:'none',
    padding:theme.spacing(1),
  },
}));


export default function DrawerItemList(
  props : {
    nodes? : Array<RXNode<IMenuItem>>,
    draggedNode?: RXNode<IMenuItem>,
    onSelected : (node:RXNode<IMenuItem>)=>void,
  }
) {
  const {nodes, draggedNode, onSelected} = props;
  const classes = useStyles();
  const [selectedNode, setSelectedNode] = useState<RXNode<IMenuItem>>();

  const handleSelected = (node:RXNode<IMenuItem>)=>{
    setSelectedNode(node);
    onSelected(node);
  }

  return (
    <Scrollbar>
      <List
        className={classes.root}
        component="div"
      >
        {
          nodes?.map(item=>{
            return (
              <MenuNode key={item.id} node = {item} 
                selectedNode = {selectedNode}
                draggedNode = {draggedNode}
                onSelected={handleSelected}
              />
            )
          })
        }
      </List>
    </Scrollbar>
  );
}
