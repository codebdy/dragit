import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Divider, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import MdiIcon from 'Components/utils/MdiIcon';
import intl from 'react-intl-universal';
import ActionButton from 'AppStudio/ActionButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem:{
      padding:theme.spacing(1, 3),
    },

  }),
);

export default function PageAction(
  props:{
    onCloseMenu?:()=>void,
    onDesign?:()=>void,
    onEditName?:()=>void,
    onDuplicate?:()=>void,
    onRemove?:()=>void,
  }
){
  const {onCloseMenu, onDesign, onEditName, onDuplicate, onRemove} = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    onCloseMenu && onCloseMenu();
  };

  const handleEditName = () =>{
    handleMenuClose();
    onEditName&&onEditName();
  }

  const handleDesign = ()=>{
    handleMenuClose();
    onDesign&&onDesign();
  }

  const handleDuplicate = ()=>{
    handleMenuClose();
    onDuplicate&&onDuplicate();
  }

  const handleRemove = ()=>{
    handleMenuClose();
    onRemove&&onRemove();
  }

  return (
    <Fragment>
      <ActionButton onClick={handleMenuOpen} icon = "mdi-dots-horizontal"/>
      <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDesign} className = {classes.menuItem}>
            <ListItemIcon>
              <MdiIcon iconClass = "mdi-pencil-ruler"  size={18}/>
            </ListItemIcon>
            {intl.get('design-page')} 
          </MenuItem>
          <MenuItem onClick={handleEditName} className = {classes.menuItem}>
            <ListItemIcon>
              <MdiIcon iconClass = "mdi-pencil"  size={18}/>
            </ListItemIcon>
            {intl.get('edit')+intl.get('name')} 
          </MenuItem>
          <MenuItem onClick={handleDuplicate} className = {classes.menuItem}>
            <ListItemIcon>
              <MdiIcon iconClass = "mdi-content-copy"  size={18}/>
            </ListItemIcon>
            {intl.get('duplicate')} 
          </MenuItem>
          <Divider/>
          <MenuItem className = {classes.menuItem} onClick={handleRemove}>
            <ListItemIcon>
              <MdiIcon iconClass = "mdi-trash-can-outline" color={'red'} size={18}/>
            </ListItemIcon>
            {intl.get('delete')} 
          </MenuItem>
        </Menu>
    </Fragment>
  )
}
