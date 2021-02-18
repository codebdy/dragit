import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { MediaUploadTask } from './MediaUploadTask';
import Image from 'Components/common/Image';
import { IconButton, LinearProgress } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useMediasStore } from './MediasStore';
import { useEffect } from 'react';
import { gql, useMutation } from '@apollo/react-hooks';

const UPLOAD_MEDIA = gql`
  mutation uploadRxMedia($file: Upload!, $rx_media_folder_id:ID){
    uploadRxMedia(file:$file, rx_media_folder_id :$rx_media_folder_id){
      id
      name
      thumbnail
      src      
    }

  }
`;

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

  const [uploadMutation,{error}] = useMutation(UPLOAD_MEDIA,
    {
      errorPolicy:'all',
      onCompleted(data){
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
      uploadMutation(
        {
          variables:{
            file:task.file,
            rx_media_folder_id: mediasStore.selectedFolderId || null
          }
        }
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[task, uploadMutation])

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
