import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MediaFolder, { FolderNode } from './MediaFolder';
import { IRxMedia } from 'Base/Model/IRxMedia';
import {observer} from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(1,1,1,0),
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
      height:'30px',
    },

  }),
);

export const MediaFolders = observer((
    props:{
      folders:Array<FolderNode>, 
      draggedFolder:FolderNode|undefined,
      draggedMedia:IRxMedia|undefined,
      selectedFolder:string, 
      onSelect:(node:string)=>void,
      onFolderNameChange:(name:string, folder:FolderNode)=>void,
      onAddFolder:(parentFolder?:FolderNode)=>void,
      onRemoveFolder:(folder:FolderNode)=>void,
      onMoveFolderTo:(folder:FolderNode, targetFolder:FolderNode|undefined)=>void,
      onMoveMediaTo:(media:IRxMedia, targetFolder:FolderNode|undefined)=>void,
      onDragFolder:(folder:FolderNode|undefined)=>void
    }
  ) => {
  const {
    folders, 
    draggedFolder, 
    draggedMedia,
    selectedFolder, 
    onSelect, 
    onAddFolder, 
    onFolderNameChange, 
    onRemoveFolder, 
    onMoveFolderTo,
    onMoveMediaTo,
    onDragFolder
  } = props;
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected = {selectedFolder}
      onNodeSelect = {(e: any, nodeId: string) =>{
        onSelect(nodeId);
      }}
    >
      {
        folders.map((node)=>{
          return <MediaFolder 
            key={node.id + '-' + node.name} 
            node={node} 
            draggedFolder = {draggedFolder}
            draggedMedia = {draggedMedia}
            onFolderNameChange = {onFolderNameChange}
            onAddFolder = {onAddFolder}
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
        })
      }
    </TreeView>
  );
})
