import React, { Fragment, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IMenuItem from 'base/IMenuItem';
import { RXNode } from 'base/RXNode/RXNode';
import MenuItem from './MenuItem';
import { Collapse, List } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import MenuNodeOperateProps from './MenuNodeOperateProps';

const useStyles = makeStyles((theme: Theme) => createStyles({
  nested: {
    padding:theme.spacing(2),    
    paddingLeft: theme.spacing(4),
    outline:'dashed 1px',
    outlineColor: theme.palette.divider,  
  },

  moreButton:{
    cursor:'pointer',
  },

  itemHoverable: {
    "&:hover":{
      outline:'dashed 1px',
      outlineColor: theme.palette.primary.main,
    }
  },

  selected:{
    outline:'solid 2px',
    outlineColor: theme.palette.primary.main,
    "&:hover":{
      outline:'solid 2px',
      outlineColor: theme.palette.primary.main,
    }    
  },

}));

export function MenuNode(
  props: {
    node:RXNode<IMenuItem>,
  }&MenuNodeOperateProps
) 
{
  const classes = useStyles();
  const { node, 
    selectedNode, 
    draggedNode, 
    onSelected, 
    onDragToBefore,
    onDragToAfter,
    onDragStart,
    onDragEnd,
    onDragIn 
  } = props;
  const [open, setOpen] = useState(false);

  const isGroup = node.meta.type === 'group';
  
  const handleOpenClick = (event: React.MouseEvent<unknown>)=>{
    setOpen(!open);
    event.stopPropagation();
  }

  const handleGroupDrageOver = ()=>{
    node.children.length === 0 && onDragIn && onDragIn(node.id);
  }

  const handleDrop = (event: React.DragEvent<unknown>)=>{
    event.stopPropagation();
  }


  return (
    <Fragment>
      <MenuItem 
        node={node} 
        draggedNode = {draggedNode} 
        onClick = {()=>{onSelected && onSelected(node)}} 
        className={classNames({[classes.selected]:selectedNode?.id === node.id})}
        onDragToBefore = {onDragToBefore}
        onDragToAfter = {onDragToAfter}
        onDragStart = {onDragStart}
        onDragEnd = {onDragEnd}
      >
        {isGroup && (open ? 
          <ExpandLess className={classes.moreButton} onClick = {handleOpenClick} /> 
          : 
          <ExpandMore className={classes.moreButton} onClick = {handleOpenClick} />)}
      </MenuItem>  
      <Collapse 
        in={open} 
        timeout="auto" 
        unmountOnExit 
      >
        <List component="div" 
          disablePadding 
          className={classes.nested}
          onDragOver = {handleGroupDrageOver}
          onDrop = {handleDrop}
        >
          {
            node.children?.map(child=>{
              return(
                <MenuNode 
                  key={child.id} 
                  node = {child} 
                  draggedNode = {draggedNode}
                  selectedNode = {selectedNode} 
                  onSelected={onSelected}
                  onDragToBefore = {onDragToBefore}
                  onDragToAfter = {onDragToAfter}
                  onDragStart = {onDragStart}
                  onDragEnd = {onDragEnd}
                />
              )
            })
          }
        </List>
      </Collapse>
    </Fragment>

  );
}
