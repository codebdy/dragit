import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Badge, IconButton, Popover, Typography, Divider, Button } from '@material-ui/core';
import useAppInfo from "store/app/useAppInfo";
import MdiIcon from "components/common/MdiIcon"
import NotificationsList from './NotificationsList';
import intl from "react-intl-universal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
      fontWeight:'bold',
    },
    viewAll:{
      width:'100%',
    },
    emperty: {
      width: 360,
      backgroundColor: theme.palette.background.paper,
      padding:theme.spacing(4),
    },
  }),
);

export default function Notifications(
  props:{
    color?:string,
  }
){
  const {color} = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const appInfo = useAppInfo();
 
  return (
    <Fragment>
      <IconButton aria-label="notifications" onClick={handleClick}>
        {
          appInfo?.unreadMessagesCount ?
            <Badge badgeContent={appInfo.unreadMessagesCount} color="secondary">
              <MdiIcon iconClass = "mdi-bell-outline" color={color}/>
            </Badge>
          :
          <MdiIcon iconClass = "mdi-bell-outline" color={color}/>
        }
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        //className = {classes.root}
      >
        <Typography className={classes.typography} variant = "subtitle1">最新通知</Typography>
        <Divider /> 
        {
          (appInfo && appInfo.unreadMessagesCount) ?
          <NotificationsList />
          :
          <div className={classes.emperty}>{intl.get('no-notifications')}</div>          
        }       

        <Divider />
        <Button className={classes.viewAll}>查看全部</Button>
      </Popover>            
    </Fragment>
  )
}
