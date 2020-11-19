import React, { Fragment } from "react";
import MdiIcon from "components/common/MdiIcon"
import IconButton from '@material-ui/core/IconButton';
import { Hidden, Badge, Typography, Menu, MenuItem, createStyles, makeStyles, Theme } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    grow: {
      flexGrow: 1,
    },

    githubLink:{
      color: theme.palette.text.secondary,
      marginRight:theme.spacing(1),
    }  
  }),
);


export default function NavButtons(props:{color?:string, onSidebarToggle: any}) {
  const {color} = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  


  return(
    <Fragment>
      <Hidden mdUp>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.onSidebarToggle}
        >
          <MenuIcon style={{color:color}}/>
        </IconButton>
        <Typography variant="h6" noWrap  style={{color:color}}>
          DragRX
        </Typography>          
      </Hidden>

      <div className={classes.grow} />

      
      <a href="https://github.com/rxwater/dragit" className={classes.githubLink} style={{color:color}} target="_blank" rel="noopener noreferrer">
        <MdiIcon iconClass = "mdi-github"/>
      </a>
      <IconButton aria-label="show 17 new notifications">
        <Badge badgeContent={17} color="secondary">
        <MdiIcon iconClass = "mdi-bell-outline" color={color}/>
        </Badge>
      </IconButton>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        
      >
        <AccountCircle style={{color:color}}/>
      </IconButton>
      {renderMenu}        
    </Fragment>
  )
}