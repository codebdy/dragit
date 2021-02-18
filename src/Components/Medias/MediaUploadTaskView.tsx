import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { MediaUploadTask } from './MediaUploadTask';
import Image from 'Components/common/Image';
import { LinearProgress } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error:{
      color:'red',
      padding:theme.spacing(1),
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

  return (
    <>
      <Image src= {task.thumbnailUrl} />
      {
        task.uploading && <LinearProgress />
      }
      {
        task.errorMessage && <div className={classes.error}>{task.errorMessage}</div>
      }
      
    </>
  );
})
