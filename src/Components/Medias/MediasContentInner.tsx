import React from "react";
import {makeStyles, Theme, createStyles, Divider, Hidden} from "@material-ui/core";
import { MediaGridList } from "./MediaGridList";
import { MediaFolders } from "./MediaFolders";
import { MediasToolbar } from "./MediasToolbar";
import intl from 'react-intl-universal';
import { MediasBreadCrumbs } from "./MediasBreadCrumbs";
import { MediasBatchActions } from "./MediasBatchActions";
import {  MUTATION_UPDATE_FOLDER } from "./MediasGQLs";
import { useShowAppoloError } from "Store/Helpers/useInfoError";
import { useMediasStore } from "./MediasStore";
import {observer} from 'mobx-react';
import SubmitButton from "Components/common/SubmitButton";
import { useMutation } from "@apollo/react-hooks";
import { useAddFolder } from "./useAddFolder";

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
  const [draggedFolder, setDraggedFolder] = React.useState(mediasStore.draggedFolder);  


  const {addFolder, loading:adding} = useAddFolder();

  const [updateFolder, {error}] = useMutation(MUTATION_UPDATE_FOLDER,{
    onCompleted:(data)=>{
      if(draggedFolder){
        draggedFolder?.setLoading(false);
        draggedFolder?.moveTo(undefined);
        mediasStore.addFolder(draggedFolder);        
      }
    }});
   
  useShowAppoloError(error);

  const handleAddNewFolder = ()=>{
    addFolder({variables:{name:intl.get('new-folder')}});
  } 

  const handleDragOver = (event:React.DragEvent<HTMLDivElement>)=>{
    const draggedFolder = mediasStore.draggedFolder;
    draggedFolder && event.preventDefault();
    event.stopPropagation();
  }

  const handleDrop = (event:React.DragEvent<HTMLDivElement>)=>{
    const draggedFolder = mediasStore.draggedFolder;
    setDraggedFolder(draggedFolder);
    draggedFolder && event.preventDefault();
    if(draggedFolder?.parent?.id){
      draggedFolder.setLoading(true);
      updateFolder({
        variables:{
          id:draggedFolder.id,
          parent_id:null,
        }
      })
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
            <MediaGridList></MediaGridList>
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
              <MediaFolders/>
            </div>
        </Hidden>
      </div>
  )
})
