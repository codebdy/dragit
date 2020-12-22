import React, { Fragment } from "react";
import MdiIcon from "components/common/MdiIcon"
import IconButton from '@material-ui/core/IconButton';
import { Hidden, Typography, Menu, MenuItem, createStyles, makeStyles, Theme, ListItemIcon, Avatar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router";
import { TOKEN_NAME, LOGIN_URL } from "utils/consts";
import intl from "react-intl-universal";
import EvenNotification from "./Notifications"
import { resolvePageUrl } from "utils/resolvePageUrl";
import { useLoggedUser } from "store/helpers/useLoggedUser";
import { useAppStore } from "store/helpers/useAppStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    grow: {
      flexGrow: 1,
    },

    githubLink:{
      color: theme.palette.text.secondary,
      marginRight:theme.spacing(1),
    },
    accountMenuItem:{
      padding:theme.spacing(1, 3),
    },
    avatar:{
      marginLeft:theme.spacing(1),
      cursor:"pointer",
      width:theme.spacing(4),
      height:theme.spacing(4),
    }
  }),
);


export default function NavButtons(props:{color?:string, onSidebarToggle: any}) {
  const {color} = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const appStore = useAppStore();
  const user = useLoggedUser();

  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';
  const history = useHistory();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = ()=>{
    appStore.setToken('');
    appStore.setLoggedUser(undefined);
    localStorage.removeItem(TOKEN_NAME);
    history.push(LOGIN_URL);
  }

  const handleShowProfile = ()=>{
    history.push(resolvePageUrl({
      moduleSlug:'user',
      pageSlug:'edit-user',
      dataId:user?.meta.id
    }));
    setAnchorEl(null);
  }

  const handleChangePassword = ()=>{
    history.push(resolvePageUrl({
      moduleSlug:'user',
      pageSlug:'edit-user',
      dataId:user?.meta.id
    }));
    setAnchorEl(null);
  }

 
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
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
      <MenuItem onClick={handleShowProfile} className = {classes.accountMenuItem}>
        <ListItemIcon>
          <MdiIcon iconClass = "mdi-account-outline" />
        </ListItemIcon>
        {intl.get('profile')} 
      </MenuItem>
      <MenuItem className = {classes.accountMenuItem} onClick={handleChangePassword}>
        <ListItemIcon>
          <MdiIcon iconClass = "mdi-lock-outline" />
        </ListItemIcon>
        {intl.get('change-password')} 
      </MenuItem>
      <MenuItem onClick={handleLogout} className = {classes.accountMenuItem}>
        <ListItemIcon>
          <MdiIcon iconClass = "mdi-logout-variant" />
        </ListItemIcon>
        {intl.get('logout')} 
      </MenuItem>
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
          RxDrag
        </Typography>          
      </Hidden>

      <div className={classes.grow} />

      
      <a href="https://github.com/rxwater/dragit" className={classes.githubLink} style={{color:color}} target="_blank" rel="noopener noreferrer">
        <MdiIcon iconClass = "mdi-github"/>
      </a>
      <EvenNotification color={color} />

      <Avatar className={classes.avatar} onClick={handleProfileMenuOpen} src={user?.meta?.avatar?.thumbnail}>
        {
          !user?.meta?.avatar?.thumbnail &&
          <MdiIcon iconClass = "mdi-account" color={color} />
        }
        
      </Avatar>

      {renderMenu}        
    </Fragment>
  )
}