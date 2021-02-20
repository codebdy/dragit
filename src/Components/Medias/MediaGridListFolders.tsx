import React from 'react';
import { MediaGridListFolder } from './MediaGridListFolder';
import { observer } from 'mobx-react';
import { useMediasStore } from './MediasStore';
import { Grid } from '@material-ui/core';
import { FolderNode } from './FolderNode';
import { MediaStore } from './MediaStore';



export const MediaGridListFolders = observer((
  props:{
    onMoveMedia:(media:MediaStore, folder:FolderNode)=>void
  }
)=>{
  const {onMoveMedia} = props;
  const mediasStore = useMediasStore();
  const selectedNode = mediasStore?.selectedFolderNode
  const folders = selectedNode ? selectedNode.children : mediasStore?.folders;
  

  return (
    <>
        {folders?.map((folder:any, index) => (
          <Grid item key={folder.id + '-folder-' + folder.name} lg={2} sm={3} xs={4}>
            <MediaGridListFolder folder = {folder} onMoveMedia = {onMoveMedia} />
          </Grid>
        ))}
    </>
  );
})
