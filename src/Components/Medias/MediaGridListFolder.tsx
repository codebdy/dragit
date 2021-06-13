import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, LinearProgress } from '@material-ui/core';
import MdiIcon from 'Components/common/MdiIcon';
import MediaGridListItemTitle from './MediaGridListItemTitle';
import { FolderNode } from "./FolderNode";
import MediaGridListIconButton from './MediaGridListIconButton';
import {observer} from 'mobx-react';
import { useUpdateFolder } from './useUpdateFolder';
import { useMediasStore } from './MediasStore';
import { useRemoveFolder } from './useRemoveFolder';
import { MediaStore } from './MediaStore';
import { MagicDelete } from 'Data/MagicDelete';
import { RxMediaFolder } from './constants';
import { MagicPost } from 'Data/MagicPost';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    folder:{
      border: '#f2f2ff solid 1px',
      flex:1,
      paddingBottom:"100%",
      position:"relative",
      borderRadius:"5px",
      //cursor:"pointer",
    },

    folderIcon:{
      position:"absolute",
      top:"calc(50% - 25px)",
      left:"calc(50% - 25px)",
      color:"#757575",
    },

    mask:{
      position:'absolute',
      height:'100%',
      width:"100%",
      left:"0",
      top:"0",
      background:"rgba(50,50,50, 0.3)",
      borderRadius:"5px",
      display:'flex',
      flexFlow:"column"
    },
    toolbar:{
      height:'40px',
      width:"100%",
      display:'flex',
      flexFlow:'row',
      justifyContent:'flex-end',
      padding:'2px',
    },
    titleInput:{
      width:'100%',
    }  
  }),
);

export const MediaGridListFolder = observer((
  props:{
    folder:FolderNode,
    onMoveMedia:(media:MediaStore, folder:FolderNode)=>void
  }
)=>{
  const {folder, onMoveMedia} = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [folderName, setFolderName] = React.useState(folder.name);
  const mediasStore = useMediasStore();

  const updateFolder = useUpdateFolder((data)=>{
    folder.setLoading(false);
    mediasStore.draggedFolder?.setLoading(false);
    folder.setName(folderName);
  });
  const removeFolder = useRemoveFolder(folder);
  const draggedFolder = mediasStore.draggedFolder;
  const draggedMedia = mediasStore.draggedMedia;

  
  const handleEndEditing = ()=>{
    const data = new MagicPost()
      .setModel(RxMediaFolder)
      .addData({
        id:folder.id,
        name:folder.name,
      })
      .toData();
    setEditing(false);
    if(folderName !== folder.name){
      folder.setLoading(true);
      updateFolder({ data });
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value;
    setFolderName(value);
  };

  const handleDragStart = (event:React.DragEvent<HTMLDivElement>)=>{
    setHover(false);
    mediasStore.setDraggedFolder(folder);
  }

  const handleDragOver = (event:React.DragEvent<HTMLDivElement>)=>{
    draggedFolder && draggedFolder !== folder && event.preventDefault();
    draggedMedia && mediasStore.selectedFolderId !== folder.id && event.preventDefault();
  }


  const handleDrop = ()=>{
    if(draggedFolder && draggedFolder.id !== folder.id){
      const data = new MagicPost()
        .setModel(RxMediaFolder)
        .addData({
          id:draggedFolder.id,
          name:draggedFolder.name,
          parent:folder.id,
        })
        .toData();
      folder.setLoading(true);
      updateFolder({ data });
    }

    if(draggedMedia && folder.id !== mediasStore.selectedFolderId){
      onMoveMedia(draggedMedia, folder);
    }
  }

  const handleSelect = ()=>{
    mediasStore?.selectFolder(folder.id);
  }

  const handleRemove = ()=>{
    const data = new MagicDelete()
      .setModel(RxMediaFolder)
      .setIds(folder.getRemoveIds())
      .toData();
    folder.setLoading(true);
    removeFolder({ data });
  }

  return (
    <Fragment>
      <div 
        className={classes.folder}
        draggable={true}
        onDoubleClick = {handleSelect}
        onMouseOver = {()=>setHover(true)}
        onMouseLeave = {()=>setHover(false)}
        onDragStart={handleDragStart}
        onDragOver = {handleDragOver}
        onDrop = {handleDrop}          
      >
        <MdiIcon className={classes.folderIcon} iconClass = "mdi-folder-outline" size="50" />
        {
          hover&&
          <div className={classes.mask}>
            <div className={classes.toolbar}>
              <MediaGridListIconButton icon = "mdi-pencil" onClick={()=>setEditing(true)} />
              <MediaGridListIconButton icon = "mdi-delete-outline" onClick={handleRemove} />
            </div>
          </div>
        }
      </div>
      {
        folder.loading && <LinearProgress />
      }
      {
        editing?
        <input 
          value={folderName} 
          autoFocus= {true} 
          className={classes.titleInput}
          onBlur = {handleEndEditing}
          onKeyUp = {e=>{
            if(e.key === 'Enter') {
              handleEndEditing()
            }
          }}

          onChange = {handleChange}
        />
        :
        <MediaGridListItemTitle title={folderName} />
      }
      
    </Fragment>
  )
})
