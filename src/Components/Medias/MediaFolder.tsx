import React from 'react';
import { makeStyles, Theme, createStyles, IconButton, Typography, CircularProgress } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_ADD_FOLDER, MUTATION_REMOVE_FOLDER, MUTATION_UPDATE_FOLDER } from './MediasGQLs';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { FolderNode } from './FolderNode';
import { useMediasStore } from './MediasStore';
import { stringValue } from 'rx-drag/utils/stringValue';

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


export const MediaFolder = observer((props:{ node:FolderNode})=>{
  const {
    node,
  } = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  const [nodeName, setNodeName] = React.useState(node.name);
  const mediaStore = useMediasStore();
  
  const [addFolder, {error:addFolderError, loading:adding}] = useMutation(MUTATION_ADD_FOLDER,
    {
      onCompleted:(data)=>{
        const json = data?.addRxMediaFolder;
        if(!json){
          return;
        }
        const folder = new FolderNode(json.id, json.name, node);
        folder.setEditing(true);
        node?.addChild(folder);
      }
    }
  );

  const [updateFolder, {error:updateFolderError, loading:updating}] = useMutation(MUTATION_UPDATE_FOLDER,{
    onCompleted:(data)=>{
      node.setName(nodeName);
    }});

  const [removeFolder, {error:removeFolderError, loading:removing}] = useMutation(MUTATION_REMOVE_FOLDER,{
    onCompleted:(data)=>{
      //setFolderLoading(false);
    }});

  useShowAppoloError(addFolderError || updateFolderError || removeFolderError);

  const handleEndEditing = ()=>{
    node.setEditing(false);
    updateFolder({
      variables:{
        id:node.id,
        name:nodeName,
        parent_id:node.parent?.id
      }
    })
    //delete node.editing;
    //nodeName !== node.name && onFolderNameChange(nodeName, node);  
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value;
    setNodeName(value);
  };

  const handleDragOver = (event:React.DragEvent<HTMLDivElement>)=>{
    //draggedFolder && draggedFolder !== node && event.preventDefault();
    //draggedMedia && event.preventDefault();
  }

  const handleDrop = ()=>{
    //if(draggedFolder && draggedFolder !== node){
    //  onMoveFolderTo(draggedFolder, node);
    //}
    //if(draggedMedia){
    //  onMoveMediaTo(draggedMedia, node);
    //}
  }

  const handelAddFolder = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    addFolder({
      variables:{
        parent_id:node.id,
        name:intl.get('new-folder')
      }
    });
  }

  const handleRemoveFolder = ()=>{

  }

  const handleDragEnd = ()=>{

  }

  const loading = adding || updating || removing;

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
            //onDragStart(node);
          }}
          onDragOver = {handleDragOver}
          onDragEnd = {handleDragEnd}
          onDrop = {handleDrop}    
          onClick = {()=>{
              console.log('MediaFolder', node.id);
              mediaStore.setSelectedFolderId(node.id);
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
                onBlur = {handleEndEditing}
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
            loading &&
            <CircularProgress size = {24}/>
          }
          {
            hover && !loading &&
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
            />
          )
        })
      }
    </TreeItem>

  )
})