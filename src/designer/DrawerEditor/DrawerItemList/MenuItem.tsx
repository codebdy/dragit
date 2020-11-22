import React, { useRef } from 'react';
import { Chip, ListItemIcon, ListItemText, ListItem, createStyles, makeStyles, Theme, Divider } from '@material-ui/core';
import IMenuItem from 'base/IMenuItem';
import MdiIcon from 'components/common/MdiIcon';
import classNames from 'classnames';
import { RXNode } from 'base/RXNode/RXNode';

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
    node: RXNode<IMenuItem>, 
    className?:any,
    draggedNode?: RXNode<IMenuItem>,
    onClick?:()=>void,
    children?:any,
    onDragToBefore:(targetId: number)=>void,
    onDragToAfter:(targetId: number)=>void,
  }
){
  const {node,
    className, 
    draggedNode, 
    onClick, 
    children,
    onDragToBefore,
    onDragToAfter
  } = props;
  const item = node.meta;
  const {title, type, icon, chip, badge} = item;
  const classes = useStyles();
  const nodeEl = useRef(null);

  const handleDragover = (event: React.DragEvent<unknown>)=>{
    if(draggedNode &&(draggedNode.id !== node.id)){
      event.preventDefault();
      event.stopPropagation();
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

  return (
    type === 'divider'?
      <div
        ref={nodeEl}
        draggable = {true} 
        className = {classNames(classes.divider, className)} 
        onClick = {onClick}
        onDragOver = {handleDragover}
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
