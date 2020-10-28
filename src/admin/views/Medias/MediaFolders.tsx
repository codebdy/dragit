import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import intl from 'react-intl-universal';
import MediaFolder, { FolderActions, FolderLabel, FolderNode } from './MediaFolder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(1),
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
      height:'30px',
    },

  }),
);

export default function MediaFolders(
    props:{
      folders:Array<FolderNode>, 
      selectedFolder:string, 
      onSelect:(node:string)=>void,
      onFolderNameChange:(name:string, folder:FolderNode)=>void,
      onAddFolder:(parentFolder?:FolderNode)=>void,
      onRemoveFolder:(folder:FolderNode)=>void,
      onMoveFolderTo:(folder:FolderNode, targetFolder:FolderNode|undefined)=>void    }
  ) {
  const {folders, selectedFolder, onSelect, onAddFolder, onFolderNameChange, onRemoveFolder, onMoveFolderTo} = props;
  const classes = useStyles();
  const [draggedFolder, setDraggedFolder] = React.useState<FolderNode|undefined>();
  //const [draggedParent, setDraggedParent] = React.useState<FolderNode|undefined>();

  const handleAddInRoot = (event: React.MouseEvent<unknown>)=>{
    event.stopPropagation();

    onAddFolder();
  }

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
      <TreeItem nodeId="root" label=
        {
          <div className={classes.labelRoot}
            onDragOver={e=>{
              if(draggedFolder){
                e.preventDefault()
              }
            }}
            onDrop={
              ()=>{draggedFolder && onMoveFolderTo(draggedFolder, undefined)}
            }
          >
            <MdiIcon iconClass = "mdi-folder-home-outline" size="22" />
            <FolderLabel>
              {intl.get('root-dir')}
            </FolderLabel>
            <FolderActions>
              <IconButton size = "small" onClick={handleAddInRoot}>
                <AddIcon fontSize = "small" />
              </IconButton>
            </FolderActions>
          </div>
        }
      >
        {
          folders.map((node)=>{
            return <MediaFolder 
              key={node.id + '-' + node.name} 
              node={node} 
              draggedFolder = {draggedFolder}
              onFolderNameChange = {onFolderNameChange}
              onAddFolder = {onAddFolder}
              onRemoveFolder = {onRemoveFolder}
              onMoveFolderTo = {onMoveFolderTo}
              onDragStart = {(folder)=>{
                setDraggedFolder(folder)
              }}
              onDragEnd = {()=>{
                setDraggedFolder(undefined)
              }}               
            />
          })

        }
      </TreeItem>
    </TreeView>
  );
}
