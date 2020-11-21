import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Chip, Divider, ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import IMenuItem from 'base/IMenuItem';
import MdiIcon from 'components/common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    //labelText: {
    //  fontWeight: 'inherit',
    //  flexGrow: 1,
    //},

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
    <ListItem button onClick = {onClick}>
      {
        type !== 'subheader' && type !== 'divider' &&
        <ListItemIcon>
          <MdiIcon className={classes.labelIcon} iconClass = {icon} />
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
