import React from 'react';
import { makeStyles, Theme, createStyles, IconButton, Typography, CircularProgress } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { FolderNode } from './FolderNode';
import { useMediasStore } from './MediasStore';
import { stringValue } from 'rx-drag/utils/stringValue';
import { Check, Close } from '@material-ui/icons';
import { useAddFolder } from './useAddFolder';
import { useUpdateFolder } from './useUpdateFolder';
import { useRemoveFolder } from './useRemoveFolder';
import { MediaStore } from './MediaStore';
import { useLoggedUser } from 'Store/Helpers/useLoggedUser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1, 0),
      height:'30px',
      userSelect:'none',
    },

    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
      margintLeft:'4px',
      marginLeft: theme.spacing(1),
    },  
    actions: {
      width:'76px',
      textAlign:'center',
    },
    nameInput:{
      width:'100px',
    }  
  }),
);

export function FolderLabel(props:{
    children:any,
  }){
  const classes = useStyles();

  return(
    <Typography variant="body2" 
      className={classes.labelText}
    >
      {props.children}
    </Typography>    
  )
}

export function FolderActions(props:{children:any}){
  const classes = useStyles();

  return(
    <div className={classes.actions}>
      {props.children}
    </div>    
  )
}


export const MediaFolder = observer((
  props:{ 
    node:FolderNode,
    onMoveMedia:(media:MediaStore, folder:FolderNode)=>void
  }
)=>{
  const {
    node,
    onMoveMedia
  } = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  const [nodeName, setNodeName] = React.useState(node.name);
  const mediaStore = useMediasStore();
  const [draggedFolder, setDraggedFolder] = React.useState(mediaStore.draggedFolder);  
  const loggedUser = useLoggedUser();
  const {addFolder} = useAddFolder(node);
  const updateFolder = useUpdateFolder((data)=>{
    node.setLoading(false);
    mediaStore.draggedFolder?.setLoading(false);
    node.setName(nodeName);
    const json = data.updateRxMediaFolder
    if(draggedFolder && draggedFolder?.id === json?.id){
      if(!draggedFolder?.parent){
        mediaStore.removeFolder(draggedFolder);
      }
      draggedFolder?.moveTo(node);
      //mediaStore.setDraggedFolder(undefined);
    }
  });
  const removeFolder = useRemoveFolder(node);

  const handleEndEditing = ()=>{
    node.setEditing(false);
    node.setLoading(true);
    updateFolder({
      variables:{
        id:node.id,
        name:nodeName,
        parent_id:node.parent?.id
      }
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value;
    setNodeName(value);
  };

  const handleDragOver = (event:React.DragEvent<HTMLDivElement>)=>{
    const draggedFolder = mediaStore.draggedFolder;
    const draggedMedia = mediaStore.draggedMedia;
    draggedFolder && draggedFolder !== node && event.preventDefault();
    draggedMedia && event.preventDefault();
    event.stopPropagation();
  }

  const handleDrop = (event:React.DragEvent<HTMLDivElement>)=>{
    const draggedFolder = mediaStore.draggedFolder;
    const draggedMedia = mediaStore.draggedMedia;
    if(draggedFolder && draggedFolder !== node){
      setDraggedFolder(draggedFolder);
      node.setLoading(true);
      updateFolder({
        variables:{
          id:draggedFolder.id,
          parent_id:node.id
        }
      })
    }
    if(draggedMedia){
      onMoveMedia(draggedMedia, node);
    }
    event.stopPropagation();
  }

  const handelAddFolder = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    node.setLoading(true);
    addFolder({
      variables:{
        parent_id:node.id,
        name:intl.get('new-folder')
      }
    });
  }

  const handleFinishEdit = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    handleEndEditing();
  }

  const handleCancelEdit = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    setNodeName(node?.name);
    node?.setEditing(false);
  }

  const handleRemoveFolder = ()=>{
    node.setLoading(true);
    removeFolder({
      variables:{
        id:node.getRemoveIds(),
      }
    })
  }

  const handleDragEnd = ()=>{
    mediaStore?.setDraggedFolder(undefined);
  }


  return(
    <TreeItem nodeId={node.id.toString()} 
      label={
        <div 
          className={classes.labelRoot}
          onMouseOver = {()=>setHover(true)}
          onMouseLeave = {()=>setHover(false)}
          draggable={true}
          onDragStart={()=>{
            setHover(false);
            mediaStore.setDraggedFolder(node);
          }}
          onDragOver = {handleDragOver}
          onDragEnd = {handleDragEnd}
          onDrop = {handleDrop}    
          onClick = {()=>{
              !node.editing && mediaStore.selectFolder(node.id);
            }            
          }     
        >
          <FolderOpenIcon />
          <FolderLabel>
            {
              node.editing?
              <input 
                value={stringValue(nodeName)} 
                autoFocus= {true} 
                className={classes.nameInput}
                onKeyUp = {e=>{
                  if(e.key === 'Enter') {
                    handleEndEditing()
                  }
                }}

                onClick = {e=>e.stopPropagation()}
                onChange = {handleChange}
              />
              :
              nodeName
            }
          </FolderLabel>
          {
            node.loading &&
            <CircularProgress size = {24}/>
          }
          {
            node.editing &&
            <>
              <IconButton size = "small" onClick={handleFinishEdit}>
                <Check fontSize = "small" />
              </IconButton>
              <IconButton size = "small"  onClick={handleCancelEdit}>
                <Close fontSize = "small" />
              </IconButton>
            </>
          }
          {
            hover && !node.loading && !node.editing &&
            <FolderActions>
              <IconButton size = "small" onClick={(e)=>{
                e.stopPropagation();
                node.setEditing(true);
              }}>
                <EditIcon fontSize = "small" />
              </IconButton>
              <IconButton size = "small" onClick={handelAddFolder}>
                <AddIcon fontSize = "small" />
              </IconButton>
              <IconButton size = "small"  onClick={handleRemoveFolder}>
                <DeleteIcon fontSize = "small" />
              </IconButton>
            </FolderActions>
          }
        </div>
      }
    >
      {
        node.children?.map((child)=>{
          return(
            <MediaFolder 
              key={child.id + '-' + child.name}               
              node = {child}
              onMoveMedia = {onMoveMedia}
            />
          )
        })
      }
    </TreeItem>

  )
})