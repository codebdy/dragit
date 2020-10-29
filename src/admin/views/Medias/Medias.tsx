import React, { useEffect } from "react";
import {makeStyles, Theme, createStyles, Container, Grid, Paper, Divider, Button, SvgIcon, Hidden, LinearProgress} from "@material-ui/core";
import classNames from "classnames";
import MediaGridList from "./MediaGridList";
import MediaFolders from "./MediaFolders";
import { FolderNode } from "./MediaFolder";
import axios from 'axios';
import { remove, toggle } from "ArrayHelper";
import { MediaMeta } from "./MediaGridListImage";
import { API_MEDIAS, API_MEDIAS_ADD_FOLDER, API_MEDIAS_CHANGE_FOLDER_NAME, API_MEDIAS_MOVE_FOLDER_TO, API_MEDIAS_MOVE_MEDIA_TO, API_MEDIAS_REMOVE_FOLDER } from "Api";
import MediasToolbar from "./MediasToolbar";
import intl from 'react-intl-universal';
import MediasBreadCrumbs from "./MediasBreadCrumbs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    meidas: {
      flex: 1,
      display:'flex',
      flexFlow:'column',
    },
    square:{
      borderRadius:'0',
    },
    flex1:{
      flex:1,
    },
    mainCol:{
      flex:1,
      display:'flex',
      flexFlow:'column',
      paddingBottom: theme.spacing(2),
    },
    paper:{
      display:'flex',
      flexFlow:'row',
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

    mainUploadButton:{
      boxShadow: theme.shadows[6],
    },

    uploadIcon:{
      marginRight: theme.spacing(1),
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

export default function Medias(props:{children?: any}) {
  const classes = useStyles();
  const [folderLoading, setFolderLoading] = React.useState<boolean|string>(false);
  const [draggedFolder, setDraggedFolder] = React.useState<FolderNode|undefined>();
  const [draggedMedia, setDraggedMedia] = React.useState<MediaMeta|undefined>();
  const [folders, setFolders] = React.useState<Array<FolderNode>>([]);
  const [selectedFolder, setSelectedFolder] = React.useState('root');
  const [gridLoading, setGridLoading] = React.useState(false);
  const [medias, setMedias] = React.useState<Array<MediaMeta>>([]);
  const [selectedMedias, setSelectedMedias] = React.useState<Array<MediaMeta>>([]);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [haseData] = React.useState(true);

  const selectedFolderNode = getByIdFromTree(selectedFolder, folders);

  useEffect(() => {
    setFolderLoading(true);
    axios(
      {
        method:"get",
        url:'/api/medias/folders',
      }
    ).then(res => {
      setFolders(makeupParent(res.data));
      setFolderLoading(false);
    })
    .catch(err => {
      console.log('server error');
      setFolderLoading(false);
    })
  
  },[]);
  useEffect(() => {
    setGridLoading(true);
    setPageNumber(0);
    setMedias([]);
    setSelectedMedias([]);
    loadMedias();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageNumber, selectedFolder]);


  const handleScrollToEnd = ()=>{
    if(!gridLoading && haseData){
      setGridLoading(true);
      loadMedias(medias);
    }
  }

  const loadMedias = (oldMedias:Array<MediaMeta> = []) => {
    axios(
      {
        method: API_MEDIAS.method as any,
        url: API_MEDIAS.url,
        params: {
          folder: selectedFolder === 'root' ? '' : selectedFolder,
          page: pageNumber,
        }
      }
    ).then(res => {
      setMedias(oldMedias.concat(res.data));
      setGridLoading(false);
    })
    .catch(err => {
      console.log('server error');
      setGridLoading(false);
    });
  }

  const handleAddFolder = (parent?:FolderNode)=>{
    setFolderLoading(true)
    axios(
      {
        method: API_MEDIAS_ADD_FOLDER.method as any,
        url: API_MEDIAS_ADD_FOLDER.url,
      }
    ).then(res => {
      let newFolder = res.data
      newFolder.editing = true;
      setFolderLoading(false);
      //setSelectedFolder(newFolder.id.toString());
      if(parent){
        parent.children = parent.children ? [...parent.children, newFolder] : [newFolder];
        setFolders([...folders])
      }else{
        setFolders([...folders, newFolder]);
      }
    })
    .catch(err => {
      console.log('server error');
      setFolderLoading(false);
    });
  }

  const handleFolderNameChange = (name:string, folder:FolderNode, fromGrid?:boolean)=>{
    fromGrid ? setFolderLoading(folder.id) : setFolderLoading(true)
    folder.name = name;    
    axios(
      {
        method: API_MEDIAS_CHANGE_FOLDER_NAME.method as any,
        url: API_MEDIAS_CHANGE_FOLDER_NAME.url,
        data:folder,
      }
    ).then(res => {
      setFolderLoading(false);
      setFolders([...folders]);
    })
    .catch(err => {
      console.log('server error');
      setFolderLoading(false);
    });

  }

  
  const handleRemoveFolder = (folder:FolderNode, fromGrid?:boolean)=>{
    const parentFolder = folder.parent;
    fromGrid ? setFolderLoading(folder.id) : setFolderLoading(true)
    if(selectedFolder === folder.id){
      setSelectedFolder('root');
    }
    axios(
      {
        method:API_MEDIAS_REMOVE_FOLDER.method as any,
        url: API_MEDIAS_REMOVE_FOLDER.url,
        params:{
          id:folder.id
        },
      }
    ).then(res => {
      setFolderLoading(false);
      if(!parentFolder){
        remove(folder, folders)
        setFolders([...folders])
      }
      else{
        remove(folder, parentFolder.children)
        setFolders([...folders])
      }
    })
    .catch(err => {
      console.log('server error',err);
      setFolderLoading(false);
    });

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
  
      setFolders([...folders]);
 
    })
    .catch(err => {
      console.log('server error',err);
      setFolderLoading(false);
    });

  }

  const handelMoveMediaTo = (media:MediaMeta, targetFolder:FolderNode|undefined, fromGrid?:boolean)=>{
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

  const handeRemoveMedia = (media:MediaMeta)=>{
    remove(media, medias);
    remove(media, selectedMedias);
    setMedias([...medias]);
    setSelectedMedias([...selectedMedias]);
  }

  const handleToggleSelectMedia = (media:MediaMeta)=>{
    toggle(media, selectedMedias);
    setSelectedMedias([...selectedMedias]);
  }


  return (
    <Container className={classes.meidas}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item><h2>{intl.get("medias")}</h2></Grid>
        <Grid item>
        <Button variant="contained" color="secondary" size="large" className={classes.mainUploadButton}>
          <SvgIcon className={classes.uploadIcon}>
            <path fill="currentColor" d="M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04M19,18H6A4,4 0 0,1 2,14C2,11.95 3.53,10.24 5.56,10.03L6.63,9.92L7.13,8.97C8.08,7.14 9.94,6 12,6C14.62,6 16.88,7.86 17.39,10.43L17.69,11.93L19.22,12.04C20.78,12.14 22,13.45 22,15A3,3 0 0,1 19,18M8,13H10.55V16H13.45V13H16L12,9L8,13Z" />
          </SvgIcon> {intl.get('upload')}
        </Button>
        </Grid>
      </Grid>
      
      <Grid container className={classes.flex1}>
        <Grid item xs={12} className={classes.mainCol}>
          <Paper className = {classNames(classes.paper, classes.flex1)} elevation={6}>
            <div className = {classes.left}>
              <div className ={classes.toolbar}>
                  <MediasToolbar />
              </div>
              <Divider></Divider>
              <MediasBreadCrumbs 
                selectedFolder = {selectedFolder}
                selectedFolderNode = {selectedFolderNode}
                onSelect={setSelectedFolder}
              />
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
                    folderLoading === true && <LinearProgress />
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )

}