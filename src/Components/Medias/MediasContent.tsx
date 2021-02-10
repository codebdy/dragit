import React, { useEffect, useState } from "react";
import {makeStyles, Theme, createStyles, Divider, Hidden, LinearProgress} from "@material-ui/core";
import MediaGridList from "./MediaGridList";
import { MediaFolders } from "./MediaFolders";
import { FolderNode } from "./FolderNode";
import MediasToolbar from "./MediasToolbar";
import intl from 'react-intl-universal';
import { MediasBreadCrumbs } from "./MediasBreadCrumbs";
import MediasBatchActions from "./MediasBatchActions";
import { IRxMedia } from "Base/Model/IRxMedia";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import { MUTATION_ADD_FOLDER,  MUTATION_REMOVE_MEDIAS, MUTATION_UPDATE_MEDIA, QUERY_FOLDERS, QUERY_MEDIAS } from "./MediasGQLs";
import { useShowAppoloError } from "Store/Helpers/useInfoError";
import { toggle, batchRemove, remove } from "rx-drag/utils/ArrayHelper";
import { MediasStore, MediasStoreProvider } from "./MediasStore";
import {observer} from 'mobx-react';
import SubmitButton from "Components/common/SubmitButton";
import MediaFilderLoadingSkeleton from "./MediaFilderLoadingSkeleton";
import { cloneObject } from "rx-drag/utils/cloneObject";
import { parseFolderNodes } from "./FolderNode/parseFolderNodes";

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

export const  MediasContent = observer((
  props:{
    single?:boolean,
    onSelectedChange?:(medias:Array<IRxMedia>)=>void
  }
)=>{
  const {single, onSelectedChange} = props;
  const classes = useStyles();
  const [mediasStore] = useState(new MediasStore());
  const [folderLoading, setFolderLoading] = React.useState<boolean|string>(false);
  const [draggedFolder, setDraggedFolder] = React.useState<FolderNode|undefined>();
  const [draggedMedia, setDraggedMedia] = React.useState<IRxMedia|undefined>();
  //const [folders, setFolders] = React.useState<Array<FolderNode>>([]);
  //const [selectedFolder, setSelectedFolder] = React.useState('root');
  const [gridLoading, setGridLoading] = React.useState(false);
  const [medias, setMedias] = React.useState<Array<IRxMedia>>([]);
  const [selectedMedias, setSelectedMedias] = React.useState<Array<IRxMedia>>([]);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [hasMore, setHasData] = React.useState(true);
  const [batchActionLoading, setBatchActionLoading] = React.useState(false);

  const { loading, error:queryFolderError, data:folderData } = useQuery(QUERY_FOLDERS, {fetchPolicy:'no-cache'});
  const [excuteQuery, { loading:queryLoading, error:queryError, data:mediaData, refetch }] = useLazyQuery(QUERY_MEDIAS, {
    variables: { first:20, page:pageNumber + 1},
    notifyOnNetworkStatusChange: true,
    fetchPolicy:'no-cache'
  });

  const [addFolder, {error:addFolderError, loading:adding}] = useMutation(MUTATION_ADD_FOLDER,
    {
      onCompleted:(data)=>{
        let newFolder = data?.addRxMediaFolder;
        if(!newFolder){
          return;
        }
        mediasStore.addFolder(cloneObject(newFolder));
        mediasStore.setSelectedFolderId(newFolder?.id || 'root');
      }
    }
  );


  const [updateMedia, {error:updateMediaError}] = useMutation(MUTATION_UPDATE_MEDIA,{
    onCompleted:(data)=>{
      setFolderLoading(false);
    }});

  const [removeMedias, {error:removeMediasError}] = useMutation(MUTATION_REMOVE_MEDIAS,{
    onCompleted:(data)=>{
      setBatchActionLoading(false);
    }});
    

  useEffect(()=>{
    setGridLoading(queryLoading);
  }, [queryLoading])
  
  //const selectedFolderNode = getByIdFromTree(selectedFolder, folders);
  
  const error = queryFolderError || 
                queryError || 
                addFolderError || 
                updateMediaError || 
                removeMediasError;

  useShowAppoloError(error);
  useEffect(()=>{
    setFolderLoading(loading);
  },[loading])
  
  useEffect(()=>{
    if(folderData){
      const queriedFolders:Array<FolderNode> = parseFolderNodes(JSON.parse((folderData && folderData['rxMediaFoldersTree'])||'[]'));
      mediasStore.setFolders(queriedFolders);
    }
  },[folderData, mediasStore])

  useEffect(()=>{
    setMedias([...medias, ...(mediaData?.medias?.data||[])])
    setHasData(mediaData?.medias?.paginatorInfo?.hasMorePages);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mediaData])
  
  useEffect(() => {
    setGridLoading(true);
    setPageNumber(0);
    setMedias([]);
    setSelectedMedias([]);
    excuteQuery({variables: { first:20, page:pageNumber + 1}});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageNumber, mediasStore.selectedFolderId]);

  useEffect(() => {
    onSelectedChange && onSelectedChange([...selectedMedias]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedMedias]);

  const handleScrollToEnd = ()=>{
    if(!gridLoading && hasMore){
      setGridLoading(true);
      refetch && refetch({ first:20, page:pageNumber + 1});
    }
  }

  const handleAddNewFolder = ()=>{
    addFolder({variables:{name:intl.get('new-folder')}});
  } 

  const handleFolderNameChange = (name:string, folder:FolderNode, fromGrid?:boolean)=>{
    fromGrid ? setFolderLoading(folder.id) : setFolderLoading(true)
    folder.name = name;
    //updateFolder({variables:{folder:{id:folder.id, name:folder.name, parentId:folder.parent?.id}}});   
  }

  
  const handleRemoveFolder = (folder:FolderNode, fromGrid?:boolean)=>{
    const parentFolder = folder.parent;
    setFolderLoading(true)
    if(mediasStore.selectedFolderId === folder.id){
      mediasStore.setSelectedFolderId('root');
    }
    //removeFolder({variables:{id:folder.id}})
    if(!parentFolder){
      //remove(folder, folders)
    }
    else{
      //remove(folder, parentFolder.children)
    }
  }

  const handleMoveToFolderTo = (folder:FolderNode, targetFolder:FolderNode|undefined, fromGrid?:boolean)=>{
    const parentFolder = folder.parent;
    fromGrid ? setFolderLoading(targetFolder ? targetFolder.id : true) : setFolderLoading(true)
    //if(selectedFolder === folder.id){
    //  setSelectedFolder('root');
    //}

    //updateFolder({variables:{folder:{id:folder.id, name:folder.name, parentId:targetFolder?.id}}});
    if(parentFolder){
        remove(folder, parentFolder.children)
    }
    else{
      //remove(folder, folders)
    }
    folder.parent = undefined;
    if(targetFolder){
      targetFolder.children = targetFolder?.children? [...targetFolder?.children, folder] : [folder]
      folder.parent = targetFolder;
    }
    else{
     // folders.push(folder)
    }
  }

  const handelMoveMediaTo = (media:IRxMedia, targetFolder:FolderNode|undefined, fromGrid?:boolean)=>{
    //if(targetFolder?.id === selectedFolder || (!targetFolder && selectedFolder==='root')){
    //  return
    //}
    //fromGrid ? setFolderLoading(targetFolder ? targetFolder.id : true) : setFolderLoading(true);
    //updateMedia({variables:{media:{id:media.id, title:media.title, folderId:targetFolder?.id}}});
    //remove(media, medias);
    //setMedias([...medias]);
  }

  const handeRemoveMedia = (media:IRxMedia)=>{
    remove(media, medias);
    remove(media, selectedMedias);
    setMedias([...medias]);
    setSelectedMedias([...selectedMedias]);
  }

  const handleToggleSelectMedia = (media:IRxMedia)=>{
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

  const handleRemoveSelected = ()=>{
    setBatchActionLoading(true)
    removeMedias({variables:{ids:selectedMedias.map((media)=>{return media.id})}})
    batchRemove(selectedMedias, medias)
    setSelectedMedias([])
    setMedias([...medias])
  }
 
  return (
    <MediasStoreProvider value = {mediasStore}>
      <div className={classes.root}>
        <div className = {classes.left}>
          <div className ={classes.toolbar}>
            {
              selectedMedias.length > 0 ?
              <MediasBatchActions 
                selectedMedias = {selectedMedias}
                onClearSelected = {()=>setSelectedMedias([])}
                onRemoveSelected = {handleRemoveSelected}
              />
              :
              <MediasToolbar />
            }
          </div>
          <Divider></Divider>
          <MediasBreadCrumbs 
            selectedFolder = {mediasStore.selectedFolderId}
            selectedFolderNode = {mediasStore.selectedFolderNode}
          />
          {batchActionLoading && <LinearProgress />}
          <div className ={classes.mediasGrid}>
              <MediaGridList 
                loading={gridLoading}
                folderLoading = {folderLoading}
                draggedFolder = {draggedFolder}
                draggedMedia = {draggedMedia}
                //folder = {selectedFolderNode}
                //folders = {selectedFolderNode? selectedFolderNode.children : folders}
                medias = {medias}
                selectedMedias = {selectedMedias}
                onScrollToEnd = {handleScrollToEnd}
                //onSelect = {(folder)=>{
                //  setSelectedFolder(folder);
                //}}
                onFolderNameChange = {(name, folder)=>handleFolderNameChange(name, folder, true)}
                onRemoveFolder = {(folder)=>handleRemoveFolder(folder, true)}
                onMoveFolderTo = {(folder, targetFolder)=>handleMoveToFolderTo(folder, targetFolder, true)}
                onMoveMediaTo = {(media, folder)=>handelMoveMediaTo(media, folder, true)}
                onRemoveMedia = {handeRemoveMedia}
                onDragFolder = {setDraggedFolder}
                onMediaDragStart = {setDraggedMedia}
                onMediaDragEnd = {()=>setDraggedMedia(undefined)}
                onToggleSelectMedia = {handleToggleSelectMedia}
              ></MediaGridList>
            </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <Hidden mdDown>
          <div className = {classes.right}>
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
              {
                (folderLoading === true) && <MediaFilderLoadingSkeleton />
              }
              <MediaFolders/>
            </div>
        </Hidden>
      </div>
    </MediasStoreProvider>
  )
})
