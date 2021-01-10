import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IMenuItem from 'Base/Model/IMenuItem';
import { MenuNode } from './MenuNode';
import { RXNode } from 'Base/RXNode/RXNode';
import Scrollbar from 'AdminBoard/common/Scrollbar';
import { List, Theme } from '@material-ui/core';
import MenuNodeOperateProps from './MenuNodeOperateProps';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    userSelect:'none',
    padding:theme.spacing(1),
  },
}));


export default function DrawerItemList(
  props : {nodes?: Array<RXNode<IMenuItem>>}
    &MenuNodeOperateProps
) {
  const {nodes, 
    draggedNode,
    onSelected, 
    onDragToBefore, 
    onDragToAfter,
    onDragStart,
    onDragEnd,
    onDragIn
  } = props;
  const classes = useStyles();
  const [selectedNode, setSelectedNode] = useState<RXNode<IMenuItem>>();

  const handleSelected = (node:RXNode<IMenuItem>)=>{
    setSelectedNode(node);
    onSelected && onSelected(node);
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
                onDragToBefore = {onDragToBefore}
                onDragToAfter = {onDragToAfter}
                onDragStart = {onDragStart}
                onDragEnd = {onDragEnd}
                onDragIn = {onDragIn}
              />
            )
          })
        }
      </List>
    </Scrollbar>
  );
}
