import React from 'react';
import { Chip, ListItemIcon, ListItemText, ListItem, createStyles, makeStyles, Theme } from '@material-ui/core';
import IMenuItem from 'base/IMenuItem';
import MdiIcon from 'components/common/MdiIcon';
import MenuDivider from './MenuDivider';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) => createStyles({
  itemText: {
    color:theme.palette.text.primary,
  },

}));

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
  const classes = useStyles();

  return (
    type === 'divider'?
    <MenuDivider className = {className} onClick = {onClick}/>
    :
    <ListItem className = {classNames(classes.itemText, className)} onClick = {onClick}>
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
