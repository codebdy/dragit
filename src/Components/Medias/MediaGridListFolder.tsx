import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, LinearProgress } from '@material-ui/core';
import MdiIcon from 'Components/common/MdiIcon';
import MediaGridListItemTitle from './MediaGridListItemTitle';
import { FolderNode } from "./FolderNode";
import MediaGridListIconButton from './MediaGridListIconButton';
import { IRxMedia } from 'Base/Model/IRxMedia';
import { ID } from 'rx-drag/models/baseTypes';

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

export default function MediaGridListFolder(props:{
    folder:FolderNode, 
    folderLoading:boolean|ID,
    draggedFolder:FolderNode|undefined,
    draggedMedia:IRxMedia|undefined,
    onSelect:(nodeId:ID)=>void,
    onFolderNameChange:(name:string, folder:FolderNode)=>void,
    onRemoveFolder:(folder:FolderNode)=>void,
    onMoveFolderTo:(folder:FolderNode, targetFolder:FolderNode|undefined)=>void,
    onMoveMediaTo:(media:IRxMedia, targetFolder:FolderNode|undefined)=>void,
    onDragStart:(folder:FolderNode)=>void,
    onDragEnd:()=>void,
  
  }){
  const {
    folder, 
    folderLoading, 
    draggedFolder,
    draggedMedia,
    onSelect, 
    onFolderNameChange, 
    onRemoveFolder, 
    onMoveFolderTo,
    onMoveMediaTo,
    onDragStart, 
    onDragEnd
  } = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [folderName, setFolderName] = React.useState(folder.name);
  const handleEndEditing = ()=>{
    setEditing(false);
    if(folderName !== folder.name){
      onFolderNameChange(folderName, folder);
      folder.name = folderName;
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value;
    setFolderName(value);
  };

  const handleDragOver = (event:React.DragEvent<HTMLDivElement>)=>{
    draggedFolder && draggedFolder !== folder && event.preventDefault();
    draggedMedia && event.preventDefault();
  }

  const handleDrop = ()=>{
    if(draggedFolder && draggedFolder !== folder){
      onMoveFolderTo(draggedFolder, folder);
    }

    if(draggedMedia){
      onMoveMediaTo(draggedMedia, folder);
    }
  }

  return (
    <Fragment>
      <div 
        className={classes.folder}
        draggable={true}
        onDoubleClick = {()=>onSelect(folder.id)}
        onMouseOver = {()=>setHover(true)}
        onMouseLeave = {()=>setHover(false)}
        onDragStart={()=>{
          setHover(false);
          onDragStart(folder);
        }}
        onDragOver = {handleDragOver}
        onDragEnd = {onDragEnd}
        onDrop = {handleDrop}          
      >
        <MdiIcon className={classes.folderIcon} iconClass = "mdi-folder-outline" size="50" />
        {
          hover&&
          <div className={classes.mask}>
            <div className={classes.toolbar}>
              <MediaGridListIconButton icon = "mdi-magnify" onClick={()=>onSelect(folder.id)} />
              <MediaGridListIconButton icon = "mdi-pencil" onClick={()=>setEditing(true)} />
              <MediaGridListIconButton icon = "mdi-delete-outline" onClick={()=>onRemoveFolder(folder)} />
            </div>
          </div>
        }
      </div>
      {
        folderLoading === folder.id && <LinearProgress />
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
}
