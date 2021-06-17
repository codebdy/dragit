import React from 'react';
import {  Grid} from '@material-ui/core';
import { observer } from 'mobx-react';
import { useMediasStore } from './MediasStore';
import { MediaUploadTaskView } from './MediaUploadTaskView';

export const MediaGridListTasks = observer((
  props:{
    onFinishUpload: ()=>void
  }
)=>{
  const {onFinishUpload} = props;
  const mediasStore = useMediasStore();
  return (
    <>
      {
        mediasStore?.tasks.map((task, index)=>{
        return (
          <Grid item key={task.id} lg={2} sm={3} xs={4}>
            <MediaUploadTaskView onFinishUpload = {onFinishUpload} task = {task} />
          </Grid>
          )
        })
      }
    </>
  );
})
