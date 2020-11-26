import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Badge, IconButton, Popover, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Button } from '@material-ui/core';
import useAppInfo from "store/app/useAppInfo";
import MdiIcon from "components/common/MdiIcon"
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
      fontWeight:'bold',
    },
    root: {
      width: 360,
      backgroundColor: theme.palette.background.paper,
    },
    viewAll:{
      width:'100%',
    }
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
      >
        <Typography className={classes.typography} variant = "subtitle1">最新通知</Typography>
        <Divider />        
        <List className={classes.root}>

          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={<b>{"Photos"}</b>} secondary="Jan 9, 2014" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
          </ListItem>
        </List>
        <Divider />
        <Button className={classes.viewAll}>查看全部</Button>
      </Popover>            
    </Fragment>
  )
}
