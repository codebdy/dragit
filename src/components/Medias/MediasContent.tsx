import React, { useEffect } from "react";
import {makeStyles, Theme, createStyles, Divider, Hidden, LinearProgress} from "@material-ui/core";
import MediaGridList from "./MediaGridList";
import MediaFolders from "./MediaFolders";
import { FolderNode } from "./MediaFolder";
import axios from 'axios';
import { batchRemove, remove, toggle } from "utils/ArrayHelper";
import { API_MEDIAS_MOVE_FOLDER_TO, API_MEDIAS_MOVE_MEDIA_TO, API_MEDIAS_REMOVE_FOLDER, API_MEDIAS_REMOVE_MEDIAS } from "APIs/medias";
import MediasToolbar from "./MediasToolbar";
import intl from 'react-intl-universal';
import MediasBreadCrumbs from "./MediasBreadCrumbs";
import MediasBatchActions from "./MediasBatchActions";
import { IMedia } from "base/Model/IMedia";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import { cloneObject } from "utils/cloneObject";
import { useAppStore } from "store/helpers/useAppStore";
import { MUTATION_ADD_FOLDER, MUTATION_REMOVE_FOLDER, MUTATION_UPDATE_FOLDER, QUERY_FOLDERS, QUERY_MEDIAS } from "./MediaGQLs";

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
      padding:theme.spacing(2) ,
      minHeight:theme.spacing(7),
      display:'flex',
      alignItems: 'center',
      fontWeight: 500,
      fontSize: '1.1rem',
      position: 'relative',
    },

  }),
);


function makeupParent(folders?:Array<FolderNode>, parent?:FolderNode){
  folders && folders.forEach(folder=>{
    folder.parent = parent;
    makeupParent(folder.children, folder)
  })
  return folders?folders:[];
}

function getByIdFromTree(id:string, folders?:Array<FolderNode>):FolderNode|undefined{
  if(folders){
    for(var i = 0; i < folders.length; i++){
      if(folders[i].id === id){
        return folders[i];
      }
      let searchedChild = getByIdFromTree(id, folders[i].children);
      if(searchedChild){
        return searchedChild;
      }
    }
  }
  return undefined;
}

export default function MediasContent(
  props:{
    single?:boolean,
    onSelectedChange?:(medias:Array<IMedia>)=>void
  }
){
  const {single, onSelectedChange} = props;
  const classes = useStyles();
  const [folderLoading, setFolderLoading] = React.useState<boolean|string>(false);
  const [draggedFolder, setDraggedFolder] = React.useState<FolderNode|undefined>();
  const [draggedMedia, setDraggedMedia] = React.useState<IMedia|undefined>();
  const [folders, setFolders] = React.useState<Array<FolderNode>>([]);
  const [selectedFolder, setSelectedFolder] = React.useState('root');
  const [gridLoading, setGridLoading] = React.useState(false);
  const [medias, setMedias] = React.useState<Array<IMedia>>([]);
  const [selectedMedias, setSelectedMedias] = React.useState<Array<IMedia>>([]);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [hasData, setHasData] = React.useState(true);
  const [batchActionLoading, setBatchActionLoading] = React.useState(false);

  const { loading, error:queryFolderError, data:folderData } = useQuery(QUERY_FOLDERS, {fetchPolicy:'no-cache'});
  const [excuteQuery, { loading:queryLoading, error:queryError, data:mediaData, refetch }] = useLazyQuery(QUERY_MEDIAS, {
    variables: { first:20, page:pageNumber + 1},
    notifyOnNetworkStatusChange: true,
    fetchPolicy:'no-cache'
  });

  const [addFolder, {error:addFolderError}] = useMutation(MUTATION_ADD_FOLDER,
    {
      onCompleted:(data)=>{
        setFolderLoading(false);
        let newFolder = data?.addMediaFolder;
        if(!newFolder){
          return;
        }
        setSelectedFolder(newFolder?.id || 'root');
        const parent = getByIdFromTree(newFolder?.parent?.id, folders);
        newFolder.editing = true;
        newFolder.parent = parent;     
        if(parent){
          parent.children = parent.children ? [...parent.children, newFolder] : [newFolder];
          setFolders([...folders])
        }else{
          setFolders([...folders, newFolder]);
        }
      }
    }
  );

  const [updateFolder, {error:updateFolderError}] = useMutation(MUTATION_UPDATE_FOLDER,{
    onCompleted:(data)=>{
      setFolderLoading(false);
    }});

  const [removeFolder, {error:removeFolderError}] = useMutation(MUTATION_REMOVE_FOLDER,{
    onCompleted:(data)=>{
      setFolderLoading(false);
    }});

  useEffect(()=>{
    setGridLoading(queryLoading);
  }, [queryLoading])
  
  const appStore = useAppStore();
  const selectedFolderNode = getByIdFromTree(selectedFolder, folders);
  
  const error = queryFolderError || queryError || addFolderError || updateFolderError || removeFolderError;

  useEffect(()=>{
    setFolderLoading(loading);
    if(error){
      appStore.infoError(intl.get('server-error'), error?.message)
      setFolderLoading(false)
      console.log( error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error, loading])
  
  useEffect(()=>{
    if(folderData){
      const queriedFolders:Array<FolderNode> = makeupParent(cloneObject((folderData && folderData['mediaFoldersTree'])||[]));
      setFolders(queriedFolders)
    }
  },[folderData])

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
  },[pageNumber, selectedFolder]);

  useEffect(() => {
    onSelectedChange && onSelectedChange([...selectedMedias]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedMedias]);

  const handleScrollToEnd = ()=>{
    if(!gridLoading && hasData){
      setGridLoading(true);
      refetch && refetch({ first:20, page:pageNumber + 1});
    }
  }

  const handleAddFolder = (parent?:FolderNode)=>{
    setFolderLoading(true)
    addFolder({variables:{parentId:parent?.id}});
  }

  const handleFolderNameChange = (name:string, folder:FolderNode, fromGrid?:boolean)=>{
    fromGrid ? setFolderLoading(folder.id) : setFolderLoading(true)
    folder.name = name;
    updateFolder({variables:{folder:{id:folder.id, name:folder.name, parentId:folder.parent?.id}}});   
  }

  
  const handleRemoveFolder = (folder:FolderNode, fromGrid?:boolean)=>{
    const parentFolder = folder.parent;
    setFolderLoading(true)
    if(selectedFolder === folder.id){
      setSelectedFolder('root');
    }
    removeFolder({variables:{id:folder.id}})
    if(!parentFolder){
      remove(folder, folders)
    }
    else{
      remove(folder, parentFolder.children)
    }
  }

  const handleMoveToFolderTo = (folder:FolderNode, targetFolder:FolderNode|undefined, fromGrid?:boolean)=>{
    const parentFolder = folder.parent;
    fromGrid ? setFolderLoading(targetFolder ? targetFolder.id : true) : setFolderLoading(true)
    if(selectedFolder === folder.id){
      setSelectedFolder('root');
    }
    axios(
      {
        method: API_MEDIAS_MOVE_FOLDER_TO.method as any,
        url: API_MEDIAS_MOVE_FOLDER_TO.url,
        params:{
          id:folder.id,
          targetId:targetFolder?.id
        },
      }
    ).then(res => {
      setFolderLoading(false);
      if(parentFolder){
          remove(folder, parentFolder.children)
      }
      else{
        remove(folder, folders)
      }
      folder.parent = undefined;
      if(targetFolder){
        targetFolder.children = targetFolder?.children? [...targetFolder?.children, folder] : [folder]
        folder.parent = targetFolder;
      }
      else{
        folders.push(folder)
      }
  
      //setFolders([...folders]);
 
    })
    .catch(err => {
      console.log('server error',err);
      setFolderLoading(false);
    });

  }

  const handelMoveMediaTo = (media:IMedia, targetFolder:FolderNode|undefined, fromGrid?:boolean)=>{
    if(targetFolder?.id === selectedFolder || (!targetFolder && selectedFolder==='root')){
      return
    }    
    
    fromGrid ? setFolderLoading(targetFolder ? targetFolder.id : true) : setFolderLoading(true);
    axios(
      {
        method: API_MEDIAS_MOVE_MEDIA_TO.method as any,
        url: API_MEDIAS_MOVE_MEDIA_TO.url,
        params:{
          media:media.id,
          folder:targetFolder?.id
        },
      }
    ).then(res => {
      setFolderLoading(false);
      remove(media, medias);
      setMedias([...medias]);
    })
    .catch(err => {
      console.log('server error',err);
      setFolderLoading(false);
    });
  }

  const handeRemoveMedia = (media:IMedia)=>{
    remove(media, medias);
    remove(media, selectedMedias);
    setMedias([...medias]);
    setSelectedMedias([...selectedMedias]);
  }

  const handleToggleSelectMedia = (media:IMedia)=>{
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
    axios(
      {
        method: API_MEDIAS_REMOVE_MEDIAS.method as any,
        url: API_MEDIAS_REMOVE_MEDIAS.url,
        data:{
          imageIds:selectedMedias.map((media)=>{return media.id}),
        },
      }
    ).then(res => {
      setBatchActionLoading(false);
      batchRemove(selectedMedias, medias)
      setSelectedMedias([])
      setMedias([...medias])
    })
    .catch(err => {
      console.log('server error',err);
      setBatchActionLoading(false);
    });
    
  }
 
  return (
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
          selectedFolder = {selectedFolder}
          selectedFolderNode = {selectedFolderNode}
          onSelect={setSelectedFolder}
        />
        {batchActionLoading && <LinearProgress />}
        <div className ={classes.mediasGrid}>
            <MediaGridList 
              loading={gridLoading}
              folderLoading = {folderLoading}
              draggedFolder = {draggedFolder}
              draggedMedia = {draggedMedia}
              folders = {selectedFolderNode? selectedFolderNode.children : folders}
              medias = {medias}
              selectedMedias = {selectedMedias}
              onScrollToEnd = {handleScrollToEnd}
              onSelect = {(folder)=>{
                setSelectedFolder(folder);
              }}
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
            </div>
            <Divider></Divider>
              {
                (folderLoading === true) && <LinearProgress />
              }
            <MediaFolders
              draggedFolder = {draggedFolder} 
              draggedMedia = {draggedMedia}
              folders = {folders} 
              selectedFolder={selectedFolder}
              onSelect = {(folder)=>{
                  setSelectedFolder(folder);
              }}
              onAddFolder = {handleAddFolder}
              onFolderNameChange = {handleFolderNameChange}
              onRemoveFolder = {handleRemoveFolder}
              onMoveFolderTo = {handleMoveToFolderTo}
              onMoveMediaTo = {handelMoveMediaTo}
              onDragFolder = {setDraggedFolder}
            />
          </div>
      </Hidden>
    </div>
  )
}
