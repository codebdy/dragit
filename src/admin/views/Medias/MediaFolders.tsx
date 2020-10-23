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

export default function MediaFolders(props:{folders:Array<FolderNode>, selectedFolder:string, onSelect:(node:string)=>void}) {
  const {folders, selectedFolder, onSelect} = props;
  const classes = useStyles();
  const handleAddInRoot = (event: React.MouseEvent<unknown>)=>{
    event.stopPropagation();
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
          <div className={classes.labelRoot}>
            <MdiIcon iconClass = "mdi-folder-home-outline" size="22" />
            <FolderLabel>
              {intl.get('all')}
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
            return <MediaFolder node={node} key={node.id}/>
          })
        }
      </TreeItem>
    </TreeView>
  );
}
