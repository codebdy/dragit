import React from 'react';
import { Chip, ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import IMenuItem from 'base/IMenuItem';
import MdiIcon from 'components/common/MdiIcon';
import MenuDivider from './MenuDivider';

export default function MenuItem(
  props:{
    item:IMenuItem, 
    className?:any,
    onClick?:()=>void,
    children?:any
  }
){
  const {item,className,  onClick, children} = props;
  const {title, type, icon, chip, badge} = item;

  return (
    type === 'divider'?
    <MenuDivider className = {className} onClick = {onClick}/>
    :
    <ListItem className = {className} onClick = {onClick}>
      {
        type !== 'subheader' &&
        <ListItemIcon>
          <MdiIcon iconClass = {icon} />
        </ListItemIcon>
      }
  
      <ListItemText primary={title} >
      </ListItemText>
      {
        chip && <Chip {... chip.props}/>
      }
      {
        badge && <Chip {... badge.props}/>
      }
      {
        children
      }
    </ListItem>
   
  )
}
