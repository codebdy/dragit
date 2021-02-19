import React, { useEffect } from "react";
import {makeStyles, Theme, createStyles, Divider, Hidden, LinearProgress} from "@material-ui/core";
import { MediaGridList } from "./MediaGridList";
import { MediaFolders } from "./MediaFolders";
import { FolderNode } from "./FolderNode";
import MediasToolbar from "./MediasToolbar";
import intl from 'react-intl-universal';
import { MediasBreadCrumbs } from "./MediasBreadCrumbs";
import { MediasBatchActions } from "./MediasBatchActions";
import { IRxMedia } from "Base/Model/IRxMedia";
import {  MUTATION_UPDATE_FOLDER, QUERY_FOLDERS } from "./MediasGQLs";
import { useShowAppoloError } from "Store/Helpers/useInfoError";
import { useMediasStore } from "./MediasStore";
import {observer} from 'mobx-react';
import SubmitButton from "Components/common/SubmitButton";
import MediaFilderLoadingSkeleton from "./MediaFilderLoadingSkeleton";
import { parseFolderNodes } from "./FolderNode/parseFolderNodes";
import { ID } from "rx-drag/models/baseTypes";
import { useMutation, useQuery } from "@apollo/react-hooks";
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

  //const [folderLoading, setFolderLoading] = React.useState<boolean|ID>(false);
  //const [draggedFolder, setDraggedFolder] = React.useState<FolderNode|undefined>();
  //const [draggedMedia, setDraggedMedia] = React.useState<IRxMedia|undefined>();
  //const [folders, setFolders] = React.useState<Array<FolderNode>>([]);
  //const [selectedFolder, setSelectedFolder] = React.useState('root');
  //const [gridLoading, setGridLoading] = React.useState(false);

  //const [selectedMedias, setSelectedMedias] = React.useState<Array<IRxMedia>>([]);

  const {addFolder, loading:adding} = useAddFolder();
  /*const [addFolder, {error:addFolderError, loading:adding}] = useMutation(MUTATION_ADD_FOLDER,
    {
      onCompleted:(data)=>{
        let json = data?.addRxMediaFolder;
        if(!json){
          return;
        }
        const folder = new FolderNode(json.id, json.name);
        //folder.setEditing(true);
        mediasStore.addFolder(folder);        
      }
    }
  );*/


  const [updateFolder, {error:updateFolderError}] = useMutation(MUTATION_UPDATE_FOLDER,{
    onCompleted:(data)=>{
      if(mediasStore?.draggedFolder){
        mediasStore?.draggedFolder?.setLoading(false);
        mediasStore?.draggedFolder?.moveTo(undefined);
        mediasStore.addFolder(mediasStore?.draggedFolder);        
      }
    }});

  //const [updateMedia, {error:updateMediaError}] = useMutation(MUTATION_UPDATE_MEDIA,{
  ////  onCompleted:(data)=>{
  //    setFolderLoading(false);
  //  }});

  //const [removeMedias, {error:removeMediasError}] = useMutation(MUTATION_REMOVE_MEDIAS,{
  //  onCompleted:(data)=>{
  //    setBatchActionLoading(false);
  //  }});
    

  
  //const selectedFolderNode = getByIdFromTree(selectedFolder, folders);
  
  const error = //queryFolderError || 
                updateFolderError //||
                //addFolderError //|| 
                //updateMediaError || 
                //removeMediasError;

  useShowAppoloError(error);
  //useEffect(()=>{
  //  setFolderLoading(loading);
 // },[loading])
  


  
  //useEffect(() => {
  //  onSelectedChange && onSelectedChange([...selectedMedias]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //},[selectedMedias]);


  const handleAddNewFolder = ()=>{
    addFolder({variables:{name:intl.get('new-folder')}});
  } 

  //const handleFolderNameChange = (name:string, folder:FolderNode, fromGrid?:boolean)=>{
  //  fromGrid ? setFolderLoading(folder.id) : setFolderLoading(true)
  //  folder.name = name;
  //  //updateFolder({variables:{folder:{id:folder.id, name:folder.name, parentId:folder.parent?.id}}});   
  //}

  
  //const handleRemoveFolder = (folder:FolderNode, fromGrid?:boolean)=>{
  //  const parentFolder = folder.parent;
  //  setFolderLoading(true)
  //  if(mediasStore.selectedFolderId === folder.id){
  //    mediasStore.setSelectedFolderId(0);
  //  }
  //  //removeFolder({variables:{id:folder.id}})
  //  if(!parentFolder){
      //remove(folder, folders)
  //  }
  //  else{
  //    //remove(folder, parentFolder.children)
  //  }
  //}

  //const handelMoveMediaTo = (media:IRxMedia, targetFolder:FolderNode|undefined, fromGrid?:boolean)=>{
    //if(targetFolder?.id === selectedFolder || (!targetFolder && selectedFolder==='root')){
    //  return
    //}
    //fromGrid ? setFolderLoading(targetFolder ? targetFolder.id : true) : setFolderLoading(true);
    //updateMedia({variables:{media:{id:media.id, title:media.title, folderId:targetFolder?.id}}});
    //remove(media, medias);
    //setMedias([...medias]);
  //}

  /*const handeRemoveMedia = (media:IRxMedia)=>{
    remove(media, medias);
    remove(media, selectedMedias);
    setMedias([...medias]);
    setSelectedMedias([...selectedMedias]);
  }*/

 /* const handleToggleSelectMedia = (media:IRxMedia)=>{
    if(single){
      if(selectedMedias.length > 0 && media === selectedMedias[0]){
        setSelectedMedias([])
      }else{
        setSelectedMedias([media]);
      }
    }else{
      toggle(media, selectedMedias);
      setSelectedMedias([...selectedMedias]);
    }
  }
*/

  const handleDragOver = (event:React.DragEvent<HTMLDivElement>)=>{
    const draggedFolder = mediasStore.draggedFolder;
    draggedFolder && event.preventDefault();
    event.stopPropagation();
  }

  const handleDrop = (event:React.DragEvent<HTMLDivElement>)=>{
    const draggedFolder = mediasStore.draggedFolder;
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
              <MediasBatchActions 
                //selectedMedias = {selectedMedias}
                //onClearSelected = {()=>setSelectedMedias([])}
                //onRemoveSelected = {handleRemoveSelected}
              />
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
