import React, { Fragment, useState } from 'react';
import { makeStyles, Theme, createStyles, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { API_GET_LASTED_NOTIFICATIONS } from 'APIs/app';
import { AxiosRequestConfig } from 'axios';
import { useAxios } from 'base/Hooks/useAxios';
import SiderBarLoadingSkeleton from 'admin/Sidebar/LoadingSkeleton';
import { INotification } from 'base//Model/INotification';
import { useHistory } from 'react-router-dom';
import { resolvePageUrl } from 'utils/resolvePageUrl';

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

export default function NotificationsList(props:{onClose:()=>void}){
  const {onClose} = props;
  const classes = useStyles();
  const [request] = useState<AxiosRequestConfig>(API_GET_LASTED_NOTIFICATIONS);
  const history = useHistory();

  const [notifications, loading] = useAxios<Array<INotification>>(request)

  const handleClick = (id:number)=>{
    history.push(resolvePageUrl({
      moduleSlug:'notifications',
      pageSlug:'view-notification',
      dataId:id,
    }));
    onClose();
  }

  return (
    loading?
    <div className={classes.root}><SiderBarLoadingSkeleton /></div>
    :
    <List className={classes.root}>
      {
        notifications?.map((note, index)=>{
          return(
            index < 5 &&
            <Fragment key={note.id}>
              <ListItem button onClick={e=>handleClick(note.id)}>
                <ListItemAvatar>
                  <Avatar className={note.read ? '' : classes.avatar}>
                    <MdiIcon iconClass = {note.read? "mdi-email-open" : "mdi-email"} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary=
                {
                  note.read ?
                  note.title
                  :
                  <b>{note.title}</b>
                } 
                  secondary={note.created_at} />
              </ListItem>
              <Divider />            
            </Fragment>

          )
        })
      }
    </List>
  )
}
