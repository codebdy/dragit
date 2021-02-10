import React, { useRef } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { CircularProgress, Grid} from '@material-ui/core';
import Scrollbar from 'Common/Scrollbar';
import { FolderNode } from "./FolderNode";
import MediaGridListFolder from './MediaGridListFolder';
import MediaGridListImage from './MediaGridListImage';
import { IRxMedia } from 'Base/Model/IRxMedia';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      padding:theme.spacing(0, 2, 0, 2),
    },

    scrollBar:{
      paddingBottom:theme.spacing(2),
      paddingRight:theme.spacing(0.2),
      paddingTop:theme.spacing(0.2),
    },

    gridList: {
      flex:1,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },

    progress:{
      width:'100%',
      textAlign:'center',
      padding:theme.spacing(10),
    }
  }),
);

export default function MediasGridList(props:{
    loading:boolean, 
    folderLoading:string|boolean,
    draggedFolder:FolderNode|undefined,
    draggedMedia:IRxMedia|undefined,
    folder?:FolderNode,
    folders?:Array<FolderNode>|undefined,
    medias?:Array<IRxMedia>, 
    selectedMedias:Array<IRxMedia>, 
    onScrollToEnd:()=>void,
    onFolderNameChange:(name:string, folder:FolderNode)=>void,
    onRemoveFolder:(folder:FolderNode)=>void,
    onRemoveMedia:(media:IRxMedia)=>void,
    onMoveFolderTo:(folder:FolderNode, targetFolder:FolderNode|undefined)=>void,
    onMoveMediaTo:(media:IRxMedia, targetFolder:FolderNode|undefined)=>void,
    onDragFolder:(folder:FolderNode|undefined)=>void,
    onMediaDragStart:(media:IRxMedia) =>void,
    onMediaDragEnd:()=>void,
    onToggleSelectMedia:(media:IRxMedia)=>void,
  }) {
  const {
    loading, 
    folderLoading, 
    draggedFolder,
    draggedMedia,
    folder, 
    folders, 
    medias,
    selectedMedias, 
    onScrollToEnd, 
    onFolderNameChange, 
    onRemoveFolder, 
    onMoveFolderTo,
    onMoveMediaTo,
    onRemoveMedia,
    onDragFolder,
    onMediaDragStart,
    onMediaDragEnd,
    onToggleSelectMedia
  } = props;
  const classes = useStyles();
  const ref = useRef(null);  
  
  const handleScroll = (scrollRef: React.RefObject<HTMLDivElement>)=>{
    let divElement = scrollRef.current;
    let innerElement:any = ref.current;
    let scrollRect = divElement?.getBoundingClientRect();
    let innerRect = innerElement?.getBoundingClientRect();
    let scrollBottom = (scrollRect?.y||0) + (scrollRect?.height||0);
    let innerBottom = (innerRect?.y||0) + (innerRect?.height||0);
    //console.log(scrollBottom - innerBottom )    
    if(scrollBottom - innerBottom >= 20){
      onScrollToEnd();
    }
    //e.defaultPrevented();
  }

  const handleSelect = ()=>{

  }



  return (
    <Scrollbar permanent 
      className={classes.scrollBar} 
      onScroll = {handleScroll}
    >
      <Grid container className={classes.root} spacing={2} ref={ref}>
        {folders?.map((folder:any, index) => (
          <Grid item key={folder.id + '-folder-' + folder.name} lg={2} sm={3} xs={4}>
            <MediaGridListFolder
              folderLoading = {folderLoading}
              draggedFolder = {draggedFolder}
              draggedMedia = {draggedMedia}
              folder={folder} 
              onSelect={handleSelect} 
              onFolderNameChange={onFolderNameChange}
              onRemoveFolder = {onRemoveFolder}
              onMoveFolderTo = {onMoveFolderTo}
              onMoveMediaTo = {onMoveMediaTo}
              onDragStart = {(folder)=>{
                onDragFolder(folder)
              }}
              onDragEnd = {()=>{
                onDragFolder(undefined)
              }}                 
            />
          </Grid>
        ))}
     
        {medias?.map((tile:any, index) => (
          <Grid item key={tile.id + '-image-' + index + '-' + tile.title} lg={2} sm={3} xs={4}>
            <MediaGridListImage
              folder = {folder} 
              media = {tile} 
              selectedMedias = {selectedMedias}
              onRemoveMedia = {onRemoveMedia} 
              onDragStart={onMediaDragStart}
              onDragEnd = {onMediaDragEnd}
              onToggleSelect = {onToggleSelectMedia}
            />
          </Grid>
        ))}
      </Grid>
      {
        loading&&
        <div className = {classes.progress}>
          <CircularProgress />
        </div>
      }
    </Scrollbar>
  );
}
