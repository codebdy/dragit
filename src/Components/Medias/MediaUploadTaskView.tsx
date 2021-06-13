import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { MediaUploadTask } from './MediaUploadTask';
import Image from 'Components/common/Image';
import { IconButton, LinearProgress } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useMediasStore } from './MediasStore';
import { useEffect } from 'react';
import { useLoggedUser } from 'Store/Helpers/useLoggedUser';
import useLayzyAxios from 'Data/useLayzyAxios';
import { API_MAGIC_POST } from 'APIs/magic';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      position:'relative',
    },
    error:{
      color:'red',
      padding:theme.spacing(1),
    },
    closeButton:{
      position:'absolute',
      right:'0',
      top:'0',
    }
  }),
);


export const MediaUploadTaskView = observer((
  props:{
    task:MediaUploadTask
  }
) => {
  const {task} = props;
  const classes = useStyles();
  const mediasStore = useMediasStore();
  const handleRemoveTask = ()=>{
    mediasStore.removeTask(task);
  }

  const loggedUser = useLoggedUser();

  const [excuteUpload,{error}] = useLayzyAxios(API_MAGIC_POST,
    {
      onCompleted(data:any){
        task.setUploading(false);
        mediasStore.unshiftMedia(data?.uploadRxMedia);
        mediasStore.removeTask(task);
      }
    });
  
  useEffect(()=>{
    task.setErrorMessage(error?.message);
  },[error, task])

  useEffect(()=>{
    if(!task.errorMessage && !task.uploading && task.file){
      task.setUploading(true);
      excuteUpload(
        {
          data:{
            file:task.file,
            rx_media_folder_id: mediasStore.selectedFolderId || null,
            rx_user_id:loggedUser.meta?.id || null
          }
        }
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[task, excuteUpload])

  return (
    <div className = {classes.root}>
      <Image src= {task.thumbnailUrl} />
      {
        task.uploading && <LinearProgress />
      }
      {
        task.errorMessage && !task.errorMessage && <div className={classes.error}>{task.errorMessage}</div>
      }
      {
        task.errorMessage &&
        <IconButton 
          className={classes.closeButton} 
          size = "small" color = "secondary"
          onClick = {handleRemoveTask}
        >
          <Close />
        </IconButton>
      }

    </div>
  );
})
