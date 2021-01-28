import React, { useRef } from 'react';
import { Chip, ListItemIcon, ListItemText, ListItem, createStyles, makeStyles, Theme, Divider } from '@material-ui/core';
import IMenuItem from 'Base/Model/IMenuItem';
import MdiIcon from 'Components/Common/MdiIcon';
import classNames from 'classnames';
import { RxNode } from 'rx-drag/models/RxNode';
import MenuNodeOperateProps from './MenuNodeOperateProps';

const useStyles = makeStyles((theme: Theme) => createStyles({
  itemText: {
    color:theme.palette.text.primary,
  },
  divider: {
    padding:theme.spacing(1, 0),
  },
}));

export default function MenuItem(
  props:{
    node: RxNode<IMenuItem>, 
    className?:any,
    children:any,
  }&MenuNodeOperateProps
){
  const {node,
    className, 
    draggedNode, 
    onClick, 
    children,
    onDragToBefore,
    onDragToAfter,
    onDragStart,
    onDragEnd,
  } = props;
  const item = node.meta;
  const {title, type, icon, chip, badge} = item;
  const classes = useStyles();
  const nodeEl = useRef(null);

  const handleDragover = (event: React.DragEvent<unknown>)=>{
    event.preventDefault();    
    event.stopPropagation();
    if(draggedNode &&(draggedNode.id !== node.id)){
      let domElement = nodeEl?.current as unknown as HTMLElement;
      if(domElement){
        let rect = domElement.getBoundingClientRect();
        if((event.clientY - rect.y)/rect.height > 0.5){
          onDragToBefore(node.id);
        }
        else{
          onDragToAfter(node.id);
        }
      }
    }
  }

  const handleDrop = (event: React.DragEvent<unknown>)=>{
    event.stopPropagation();
  }

  return (
    type === 'divider'?
      <div
        ref={nodeEl}
        draggable = {true} 
        className = {classNames(classes.divider, className)} 
        onClick = {onClick}
        onDragOver = {handleDragover}
        onDragStart = {()=>onDragStart(node)}
        onDragEnd = {onDragEnd}
        onDrop = {handleDrop}
      >
        <Divider />      
      </div>
    :
    <ListItem 
      ref={nodeEl}
      draggable = {true}
      className = {classNames(classes.itemText, className)} 
      onClick = {onClick}
      onDragOver = {handleDragover}
      onDragStart = {()=>onDragStart(node)}
      onDragEnd = {onDragEnd}
      onDrop = {handleDrop}
    >
      {
        type !== 'subheader' &&
        <ListItemIcon>
          <MdiIcon iconClass = {icon} />
        </ListItemIcon>
      }
  
      <ListItemText primary={title} >
      </ListItemText>
      {(badge && badge.field) &&
        <Chip color={badge.color} label={'B'} size={badge.size}/>          
      }
      {chip&&
        <Chip color={chip.color} label={chip.label} size={chip.size}/>          
      }
      {
        children
      }
    </ListItem>
   
  )
}
