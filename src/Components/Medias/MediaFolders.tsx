import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { MediaFolder } from './MediaFolder';
import { observer } from 'mobx-react';
import { useMediasStore } from './MediasStore';

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

export const MediaFolders = observer(() => {

  const classes = useStyles();
  const mediaStore = useMediasStore();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected = {mediaStore.selectedFolderId ? mediaStore.selectedFolderId.toString() : ''}
    >
      {
        mediaStore.folders?.map((node)=>{
          return <MediaFolder 
            key={node.id + '-' + node.name} 
            node={node}             
          />
        })
      }
    </TreeView>
  );
})
