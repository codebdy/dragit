import React, { useState } from "react";
import {makeStyles, Theme, createStyles, Divider, Hidden} from "@material-ui/core";
import { MediaGridList } from "./MediaGridList";
import { MediaFolders } from "./MediaFolders";
import { MediasToolbar } from "./MediasToolbar";
import intl from 'react-intl-universal';
import { MediasBreadCrumbs } from "./MediasBreadCrumbs";
import { MediasBatchActions } from "./MediasBatchActions";
import { useShowServerError } from "Store/Helpers/useInfoError";
import { useMediasStore } from "./MediasStore";
import {observer} from 'mobx-react';
import SubmitButton from "Components/common/SubmitButton";
import { MediaStore } from "./MediaStore";
import { FolderNode } from "./FolderNode";
import { useUpdateMedia } from "./useUpdateMedia";
import { useAddFolder } from "./useAddFolder";
import { API_MAGIC_POST } from "APIs/magic";
import useLayzyAxios from "Data/useLayzyAxios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display:'flex',
      flexFlow:'row',
    },
    square:{
      borderRadius:'0',
    },

    left:{
      flex:1,
      display:'flex',
      flexFlow:'column',

    },
    toolbar:{
      minHeight:theme.spacing(7),
      display:'flex',
      flexFlow:'row',
      alignItems:'center',
      flexWrap: 'wrap',
      paddingRight: '0',
    },
    right:{
      width:'260px',
      flexShrink:0,
      display:'flex',
      flexFlow:'column',
    },
    mediasGrid:{
      flex:1,
      display:'flex',
      flexFlow:'column',
      //padding:theme.spacing(0, 2, 2, 2),
    },
    folderTitle:{
      padding:theme.spacing(0, 1) ,
      height:theme.spacing(7),
      display:'flex',
      justifyContent:'space-between',
      alignItems: 'center',
      fontWeight: 500,
      fontSize: '1.1rem',
      position: 'relative',
    },
  }),
);

export const  MediasContentInner = observer(()=>{
  const classes = useStyles();
  const mediasStore = useMediasStore();
  const [draggedFolder, setDraggedFolder] = useState(mediasStore.draggedFolder);  
  const [draggedMedia, setDraggedMedia] = useState(mediasStore.draggedMedia);

  const {addFolder, loading:adding} = useAddFolder();

  const updateMedia = useUpdateMedia((data)=>{
    if(draggedMedia){
      draggedMedia.setLoading(false);
      mediasStore.removeMedias([draggedMedia.id]);
      setDraggedMedia(undefined);
    }
  });

  const [updateFolder, {error}] = useLayzyAxios(API_MAGIC_POST,{
    onCompleted:(data)=>{
      if(draggedFolder){
        draggedFolder?.setLoading(false);
        draggedFolder?.moveTo(undefined);
        mediasStore.addFolder(draggedFolder);        
      }
    }});
   
  useShowServerError(error);

  const handleAddNewFolder = ()=>{
    addFolder({data:{name:intl.get('new-folder')}});
  } 

  const handleMoveMedia = (media:MediaStore, folder?:FolderNode)=>{
    media.setLoading(true);
    setDraggedMedia(media)
    updateMedia({data:{
      rxMedia:{
        id:media.id,
        rx_media_folder_id:folder?.id||null          
      }
    }})
  }

  const handleDragOver = (event:React.DragEvent<HTMLDivElement>)=>{
    mediasStore.draggedFolder && event.preventDefault();
    mediasStore?.draggedMedia && event.preventDefault();
    event.stopPropagation();
  }

  const handleDrop = (event:React.DragEvent<HTMLDivElement>)=>{
    const draggedFolder = mediasStore.draggedFolder;
    setDraggedFolder(draggedFolder);
    draggedFolder && event.preventDefault();
    if(draggedFolder?.parent?.id){
      draggedFolder.setLoading(true);
      updateFolder({
        data:{
          id:draggedFolder.id,
          parent:null,
        }
      })
    }

    mediasStore?.draggedMedia && event.preventDefault();

    if(mediasStore?.draggedMedia){
      handleMoveMedia(mediasStore?.draggedMedia);
    }
    event.stopPropagation();
  }
 
  return (
      <div className={classes.root}>
        <div className = {classes.left}>
          <div className ={classes.toolbar}>
            {
              mediasStore.selectedMedias.length > 0 ?
              <MediasBatchActions />
              :
              <MediasToolbar />
            }
          </div>
          <Divider></Divider>
          <MediasBreadCrumbs />
          
          <div className ={classes.mediasGrid}>
            <MediaGridList onMoveMedia = {handleMoveMedia}></MediaGridList>
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <Hidden mdDown>
          <div className = {classes.right} 
            onDragOver = {handleDragOver}
            onDrop = {handleDrop}
          >
            <div className = {classes.folderTitle}>
                {intl.get('folder')}
                <SubmitButton
                  variant = "outlined"
                  color = "primary"
                  submitting = {adding}
                  onClick = {handleAddNewFolder}
                >
                  {intl.get('add-new')}
                </SubmitButton>
              </div>
              <Divider></Divider>
              <MediaFolders onMoveMedia = {handleMoveMedia}/>
            </div>
        </Hidden>
      </div>
  )
})
