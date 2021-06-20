import React, { useEffect } from "react";
import {makeStyles, Theme, createStyles, Divider, Hidden} from "@material-ui/core";
import { MediaGridList } from "./MediaGridList";
import { MediaFolders } from "./MediaFolders";
import { MediasToolbar } from "./MediasToolbar";
import intl from 'react-intl-universal';
import { MediasBreadCrumbs } from "./MediasBreadCrumbs";
import { MediasBatchActions } from "./MediasBatchActions";
import { useShowServerError } from "Store/Helpers/useInfoError";
import { MediaSort, useMediasStore } from "./MediasStore";
import {observer} from 'mobx-react';
import SubmitButton from "Components/common/SubmitButton";
import { MediaStore } from "./MediaStore";
import { FolderNode } from "./FolderNode";
import { useUpdateMedia } from "./useUpdateMedia";
import { useAddFolder } from "./useAddFolder";
import { API_MAGIC_POST } from "APIs/magic";
import useLayzyAxios from "Data/useLayzyAxios";
import { MagicPostBuilder } from "Data/MagicPostBuilder";
import { folderTreeQuery } from "./querys";
import { useMagicQueryInfinite } from "Data/useMagicQueryInfinite";
import { MagicQueryBuilder } from "Data/MagicQueryBuilder";
import { mutate } from "swr";
import { RxMedia, RxMediaFolder } from "modelConstants";
import { ASC, DESC } from "Components/common/contants";

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

const PAGE_SIZE = 10;

export const  MediasContentInner = observer(()=>{
  const classes = useStyles();
  const mediasStore = useMediasStore();

  const getKey = (pageIndex: any, previousPageData: any)=>{
    if(previousPageData && !previousPageData.data?.length){
      return null;
    }
    let orderField = ['createdAt', DESC];
    if(mediasStore.sortBy === MediaSort.ASC_BY_CREATE_AT){
      orderField = ['createdAt', ASC];
    }
    if(mediasStore.sortBy === MediaSort.ASC_BY_NAME){
      orderField = ['name', ASC];
    }
    if(mediasStore.sortBy === MediaSort.DESC_BY_NAME){
      orderField = ['name', DESC];
    }

    const builder = new MagicQueryBuilder()
      .setModel(RxMedia)
    if(mediasStore.keyword?.trim()){
      builder.addCondition('name', `%${mediasStore.keyword?.trim()}%`, 'like')
    }
    if(mediasStore.selectedFolderId){
      builder.addCondition('folder.id', mediasStore.selectedFolderId);
    }

    builder.setOrderBy(orderField[0], orderField[1])
      .setPageSize(PAGE_SIZE)
      .setPageIndex(pageIndex);
    return builder.toAxioConfig().url||null;
  }

  const { data, error: queryError, mutate: queryMutate, size, setSize, isValidating } = 
    useMagicQueryInfinite(getKey, {persistSize:true});
  const isLoadingInitialData = !data && !queryError;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.length < PAGE_SIZE);
  const isLoading = isValidating && data && data.length === size;

  useEffect(()=>{
    mediasStore.setMedias(data ? [].concat(...data.map(data=>data.data)) : []);
  }, [data, mediasStore])

  useEffect(()=>{
    setSize(1);
  },[mediasStore.selectedFolderId, setSize])

  const {addFolder, loading:adding} = useAddFolder();

  const updateMedia = useUpdateMedia((data)=>{
    const draggedMedia = mediasStore.draggedMedia;
    if(draggedMedia){
      draggedMedia.setLoading(false);
      mediasStore.removeMedias([draggedMedia.id]);
      mediasStore.setDraggedMedia(undefined);
      queryMutate();
    }
  });

  const [updateFolder, {error}] = useLayzyAxios(API_MAGIC_POST,{
    onCompleted:(data)=>{
      mutate(folderTreeQuery.toUrl());
    }});
   
  useShowServerError(error||queryError);

  const handleAddNewFolder = ()=>{
    const data = new MagicPostBuilder()
      .setModel(RxMediaFolder)
      .setSingleData({name:intl.get('new-folder')})
      .toData();
    addFolder({data});
  }
  
  const handleToBottom = ()=>{
    if(!isLoadingMore
      && !isLoading 
      && !isReachingEnd){
      setSize(size + 1);
    }
  }

  const handleMoveMedia = (media:MediaStore, folder?:FolderNode)=>{
    media.setLoading(true);
    mediasStore.setDraggedMedia(media);
    const data = new MagicPostBuilder()
      .setModel(RxMedia)
      .addData({
        id:media.id, 
        name:media.name,
        folder:folder?.id||null 
      })
    .toData();
    updateMedia({ data });
  }

  const handleDragOver = (event:React.DragEvent<HTMLDivElement>)=>{
    mediasStore.draggedFolder && event.preventDefault();
    mediasStore?.draggedMedia && event.preventDefault();
    event.stopPropagation();
  }

  const handleDrop = (event:React.DragEvent<HTMLDivElement>)=>{
    const draggedFolder = mediasStore.draggedFolder;
    draggedFolder && event.preventDefault();
    if(draggedFolder?.parent?.id){
      draggedFolder.setLoading(true);
      const data = new MagicPostBuilder()
        .setModel(RxMediaFolder)
        .addData({
          id:draggedFolder.id,
          name:draggedFolder.name,
          parent:null,
        })
        .toData();
      updateFolder({ data });
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
              <MediasBatchActions
                onMediasChanged = {queryMutate}
              />
              :
              <MediasToolbar />
            }
          </div>
          <Divider></Divider>
          <MediasBreadCrumbs />
          
          <div className ={classes.mediasGrid}>
            <MediaGridList 
              onMoveMedia = {handleMoveMedia}
              onScrollToBottom = {handleToBottom}
              loading = {isLoadingInitialData || isLoadingMore}
              onMediasChanged = {queryMutate}
            ></MediaGridList>
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
