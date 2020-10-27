import React from 'react';
import { makeStyles, Theme, createStyles, IconButton, Typography } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
      height:'30px',
      userSelect:'none',
    },

    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
      margintLeft:'4px',
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

export interface FolderNode{
  id:string;
  name:string;
  children?:Array<FolderNode>;
  editing?:boolean;
  parent?:FolderNode;
}

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


export default function MediaFolder (props:{
  node:FolderNode,
  draggedFolder:FolderNode|undefined,
  onFolderNameChange:(name:string, folder:FolderNode)=>void,
  onAddFolder:(parentFolder?:FolderNode)=>void,
  onRemoveFolder:(folder:FolderNode)=>void,
  onMoveFolderTo:(folder:FolderNode, targetFolder:FolderNode)=>void,
  onDragStart:(folder:FolderNode)=>void,
  onDragEnd:()=>void,
}){
  const {
    node,
    draggedFolder,
    onFolderNameChange, 
    onAddFolder, 
    onRemoveFolder, 
    onMoveFolderTo,
    onDragStart,
    onDragEnd
  } = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  const [editing, setEditing] = React.useState(node.editing);
  const [nodeName, setNodeName] = React.useState(node.name);

  const handleEndEditing = ()=>{
    setEditing(false);
    delete node.editing;
    nodeName !== node.name && onFolderNameChange(nodeName, node);  
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value;
    setNodeName(value);
  };

  const handleDragOver = (event:React.DragEvent<HTMLDivElement>)=>{
    draggedFolder && draggedFolder !== node && event.preventDefault();
  }

  const handleDrop = ()=>{
    if(draggedFolder && draggedFolder !== node){
      onMoveFolderTo(draggedFolder, node);
    }
  }

  return(
    <TreeItem nodeId={node.id.toString()} label={
      <div 
        className={classes.labelRoot}
        onMouseOver = {()=>setHover(true)}
        onMouseLeave = {()=>setHover(false)}
          draggable={true}
          onDragStart={()=>onDragStart(node)}
          onDragOver = {handleDragOver}
          onDragEnd = {onDragEnd}
          onDrop = {handleDrop}         
        >
        <FolderOpenIcon />
        <FolderLabel>
          {
            editing?
            <input 
              value={nodeName} 
              autoFocus= {true} 
              className={classes.nameInput}
              onBlur = {handleEndEditing}
              onKeyUp = {e=>{
                if(e.keyCode === 13) {
                  handleEndEditing()
                }
              }}

              onChange = {handleChange}
            />
            :
            nodeName
          }
        </FolderLabel>
        {
          hover&&
          <FolderActions>
            <IconButton size = "small" onClick={(e)=>{
              e.stopPropagation();
              setEditing(true);
            }}>
              <EditIcon fontSize = "small" />
            </IconButton>
            <IconButton size = "small" onClick={(e)=>{
              e.stopPropagation();
              onAddFolder(node);
            }}>
              <AddIcon fontSize = "small" />
            </IconButton>
            <IconButton size = "small"  onClick={(e)=>{
              e.stopPropagation();
              onRemoveFolder(node);
            }}>
              <DeleteIcon fontSize = "small" />
            </IconButton>
          </FolderActions>
        }
      </div>}
    >
      {
        node.children?.map((child)=>{
          return(
            <MediaFolder 
              key={child.id}               
              node = {child}
              draggedFolder = {draggedFolder}
              onFolderNameChange={onFolderNameChange}
              onAddFolder = {onAddFolder}
              onRemoveFolder = {onRemoveFolder}
              onDragStart = {onDragStart}
              onDragEnd = {onDragEnd}             
              onMoveFolderTo = {onMoveFolderTo}
            />
          )
        })
      }
    </TreeItem>

  )
}