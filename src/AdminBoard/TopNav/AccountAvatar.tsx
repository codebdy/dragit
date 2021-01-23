import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Avatar, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import {observer} from 'mobx-react';
import MdiIcon from 'Components/Common/MdiIcon';
import { useHistory } from 'react-router';
import { useLoggedUser } from 'Store/Helpers/useLoggedUser';
import { TOKEN_NAME, LOGIN_URL } from 'Utils/consts';
import { resolvePageUrl } from 'Utils/resolvePageUrl';
import { useAppStore } from 'Store/Helpers/useAppStore';
import intl from "react-intl-universal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar:{
      marginLeft:theme.spacing(1),
      cursor:"pointer",
      width:theme.spacing(4),
      height:theme.spacing(4),
    },
    accountMenuItem:{
      padding:theme.spacing(1, 3),
    },
  }),
);

export const AccountAvatar = observer(()=>{
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
      pageId:'edit-user',
      dataId:user.meta?.id
    }));
    setAnchorEl(null);
  }

  const handleChangePassword = ()=>{
    history.push(resolvePageUrl({
      moduleSlug:'user',
      pageId:'edit-user',
      dataId:user.meta?.id
    }));
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <Avatar className={classes.avatar} onClick={handleProfileMenuOpen} src={user?.meta?.avatar?.thumbnail}>
        {
          !user?.meta?.avatar?.thumbnail &&
          <MdiIcon iconClass = "mdi-account" color={'#fff'} />
        }
        
      </Avatar>

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
    </Fragment>
  )
})
