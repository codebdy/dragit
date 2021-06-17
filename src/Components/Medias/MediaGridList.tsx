import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid} from '@material-ui/core';
import Scrollbar from 'Common/Scrollbar';
import { MediaGridListImage } from './MediaGridListImage';
import { observer } from 'mobx-react';
import { MediaGridListFolders } from './MediaGridListFolders';
import { MediaGridListTasks } from './MediaGridListTasks';
import { MediaStore } from './MediaStore';
import { FolderNode } from './FolderNode';
import { useMediasStore } from './MediasStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      padding:theme.spacing(0, 2, 0, 2),
      //修改滚动bug添加，需要确认单独一个页面时，该改动是否影响
      height:0,
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
      textAlign:'center',
      padding:theme.spacing(10),
      justifyContent:'center',
      alignItems:'center',
      display:'flex',
      minHeight:'200px',
    }
  }),
);

export const MediaGridList = observer((
  props:{
    onMoveMedia:(media:MediaStore, folder:FolderNode)=>void,
    onScrollToBottom:()=>void,
    onMediasChanged:()=>void,
    loading:boolean|undefined,
  }
)=>{
  const {onMoveMedia, onScrollToBottom,onMediasChanged, loading} = props;
  const classes = useStyles();
  const mediasStore = useMediasStore();
  
  const handleScroll = (scrollRef: React.RefObject<HTMLDivElement>)=>{
    let divElement = scrollRef.current;
    let scrollRect = divElement?.getBoundingClientRect();
    if(divElement 
      && scrollRect 
      && (divElement?.scrollHeight - (divElement?.scrollTop + scrollRect?.height) <= 50) ){
      onScrollToBottom();
    }
    
    //e.defaultPrevented();
  }

  const handleDragOver = (event:React.DragEvent<HTMLElement>)=>{
    event.preventDefault();
    event.stopPropagation();
  }

  const handleDrop = (event:React.DragEvent<HTMLElement>)=>{
    if(event.dataTransfer.files){
      mediasStore.addUploadFiles(event.dataTransfer.files);
    }
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Scrollbar permanent 
      className={classes.scrollBar} 
      onScroll = {handleScroll}
      onDragOver = {handleDragOver}
      onDrop = {handleDrop}
    >
      <Grid 
        container 
        className={classes.root} 
        spacing={2} 
      >
        <MediaGridListFolders onMoveMedia = {onMoveMedia} />
        <MediaGridListTasks onFinishUpload = {onMediasChanged} />
     
        {mediasStore.medias?.map((media:MediaStore, index) => (
          <Grid item key={media.id + '-image-' + index + '-' + media.name} lg={2} sm={3} xs={4}>
            <MediaGridListImage media = {media} onRemoved = {onMediasChanged}/>
          </Grid>
        ))}
        {
          loading &&
          <Grid item className = {classes.progress} xs={true}>
            <CircularProgress />
          </Grid>
        }
      </Grid>
    </Scrollbar>
  );
})
