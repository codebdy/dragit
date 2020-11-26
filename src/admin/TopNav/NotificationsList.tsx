import React from 'react';
import { makeStyles, Theme, createStyles, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 360,
      backgroundColor: theme.palette.background.paper,
    },
    avatar: {
      color: '#fff',
      backgroundColor: fade(theme.palette.primary.main, 0.7),
    },
  }),
);

export default function NotificationsList(){
  const classes = useStyles();
  return (
    <List className={classes.root}>

      <ListItem button>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <MdiIcon iconClass = "mdi-email" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<b>{"Photos"}</b>} secondary="Jan 9, 2014" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <MdiIcon iconClass = "mdi-email-open" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
          <MdiIcon iconClass = "mdi-email-open" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
  )
}
