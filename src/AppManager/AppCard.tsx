import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Badge, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import { IRxApp } from 'Base/Model/IRxApp';
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
    },
    
    content: {
      display:'flex',
      flexFlow:'column',
      justifyContent:'center',
      alignItems:'center',
      cursor:'pointer',
    },
    appAvata: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    appName:{
      marginTop:theme.spacing(2),
    },
    actions:{
      diplay:'flex',
      justifyContent:'space-between'
    },
    pos: {
      paddingLeft: theme.spacing(1),
    },

    menuItem:{
      padding:theme.spacing(1, 3),
    },
  }),
);


export default function AppCard(
  props:{
    rxApp:IRxApp
  }
) {
  const {rxApp} = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const hadleEdit = ()=>{
    setAnchorEl(null);
  }

  const handleRemove = ()=>{
    setAnchorEl(null);
  }
  
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Badge color="secondary" badgeContent={rxApp.notifications}>
          <Avatar className = {classes.appAvata} style={{ backgroundColor: rxApp.color}} variant = "rounded">
            <MdiIcon iconClass = {rxApp.icon} size={40}  />
          </Avatar>
        </Badge>
        <Typography variant="h5" component="div" className={classes.appName}>
          {rxApp.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Typography className={classes.pos} color="textSecondary">
          {rxApp.appType}
        </Typography>
        <IconButton
          onClick = {handleMenuOpen}
        >
          <MdiIcon iconClass = "mdi-dots-horizontal" size={20} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          
        >
          <MenuItem onClick={hadleEdit} className = {classes.menuItem}>
            <ListItemIcon>
              <MdiIcon iconClass = "mdi-pencil-ruler"  size={18}/>
            </ListItemIcon>
            {intl.get('edit')} 
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className = {classes.menuItem}>
            <ListItemIcon>
              <MdiIcon iconClass = "mdi-toy-brick-remove-outline"  size={18}/>
            </ListItemIcon>
            {intl.get('uninstall')} 
          </MenuItem>
          <Divider/>
          <MenuItem className = {classes.menuItem} onClick={handleRemove}>
            <ListItemIcon>
              <MdiIcon iconClass = "mdi-delete" color={'red'} size={18}/>
            </ListItemIcon>
            {intl.get('delete')} 
          </MenuItem>
        </Menu>

      </CardActions>
    </Card>
  );
}
