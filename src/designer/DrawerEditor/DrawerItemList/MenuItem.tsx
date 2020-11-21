import React from 'react';
import { makeStyles, Theme, createStyles, Chip, ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import IMenuItem from 'base/IMenuItem';
import MdiIcon from 'components/common/MdiIcon';
import MenuDivider from './MenuDivider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      "&:hover":{
        outline:'dashed 1px',
        outlineColor: theme.palette.primary.main,
      }
    },
  }),
);

export default function MenuItem(
  props:{
    item:IMenuItem, 
    onClick?:()=>void,
    children?:any
  }
){
  const {item, onClick, children} = props;
  const {title, type, icon, chip, badge} = item;

  const classes = useStyles();
  return (
    type === 'divider'?
    <MenuDivider className = {classes.item}/>
    :
    <ListItem className = {classes.item} onClick = {onClick}>
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
