import React from 'react';
import { MediaGridListFolder } from './MediaGridListFolder';
import { observer } from 'mobx-react';
import { useMediasStore } from './MediasStore';
import { Grid } from '@material-ui/core';



export const MediaGridListFolders = observer(()=>{

  const mediasStore = useMediasStore();
  const selectedNode = mediasStore?.selectedFolderNode
  const folders = selectedNode ? selectedNode.children : mediasStore?.folders;
  

  return (
    <>
        {folders?.map((folder:any, index) => (
          <Grid item key={folder.id + '-folder-' + folder.name} lg={2} sm={3} xs={4}>
            <MediaGridListFolder folder = {folder} />
          </Grid>
        ))}
    </>
  );
})
