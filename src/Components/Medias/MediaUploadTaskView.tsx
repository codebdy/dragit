import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { MediaUploadTask } from './MediaUploadTask';
import Image from 'Components/common/Image';
import { IconButton, LinearProgress } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useMediasStore } from './MediasStore';


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

  return (
    <div className = {classes.root}>
      <Image src= {task.thumbnailUrl} />
      {
        task.uploading && <LinearProgress />
      }
      {
        task.errorMessage && <div className={classes.error}>{task.errorMessage}</div>
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
