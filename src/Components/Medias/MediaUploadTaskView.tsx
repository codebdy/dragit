import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { MediaUploadTask } from './MediaUploadTask';
import Image from 'Components/common/Image';
import { IconButton, LinearProgress } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useMediasStore } from './MediasStore';
import { useEffect } from 'react';
import useLayzyAxios from 'Data/useLayzyAxios';
import { API_MAGIC_UPLOAD } from 'APIs/magic';
import { MagicUploadBuilder } from 'Data/MagicUploadBuilder';
import { RxMedia } from './constants';
import { MediaStore } from './MediaStore';

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
    task: MediaUploadTask,
    onFinishUpload: ()=>void
  }
) => {
  const {task, onFinishUpload} = props;
  const classes = useStyles();
  const mediasStore = useMediasStore();
  const handleRemoveTask = ()=>{
    mediasStore.removeTask(task);
  }

  const [excuteUpload] = useLayzyAxios({
      ...API_MAGIC_UPLOAD,
      headers:{"Content-Type": "multipart/form-data;boundary=" + new Date().getTime()}
    },
    {
      onCompleted(data:any){
        mediasStore.unshiftMedia(new MediaStore(data?.RxMedia));
        mediasStore.removeTask(task);
        if(mediasStore.tasks.length === 0){
          onFinishUpload();
        }
        task.setUploading(false);
      },
      onError(error){
        task.setErrorMessage(error?.message);
        task.setUploading(false);
      }
    });
  
  useEffect(()=>{
    if(!task.errorMessage && !task.uploading && task.file){
      task.setUploading(true);
      const data = new MagicUploadBuilder()
        .setModel(RxMedia)
        .setData({
          file:task.file,
          folder: mediasStore.selectedFolderId || null,
          name:task.file.name,
        })
        .toData();
      excuteUpload({ data });
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
        task.errorMessage  && <div className={classes.error}>{task.errorMessage}</div>
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
