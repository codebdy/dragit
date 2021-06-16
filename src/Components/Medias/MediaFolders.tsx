import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { MediaFolder } from './MediaFolder';
import { observer } from 'mobx-react';
import { useMediasStore } from './MediasStore';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import { FolderNode } from './FolderNode';
import { parseFolderNodes } from './FolderNode/parseFolderNodes';
import MediaFilderLoadingSkeleton from './MediaFilderLoadingSkeleton';
import { MediaStore } from './MediaStore';
import { useMagicQuery } from 'Data/useMagicQuery';
import { folderTreeQuery } from './constants';
import Scrollbar from 'Common/Scrollbar';

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

export const MediaFolders = observer((
  props:{
    onMoveMedia:(media:MediaStore, folder:FolderNode)=>void
  }
) => {
  const {onMoveMedia} = props;
  const classes = useStyles();
  const mediaStore = useMediasStore();
  const { loading, error:queryFolderError, data:folderData } = useMagicQuery<any>(
    folderTreeQuery
  );

  useShowServerError(queryFolderError);
  
  useEffect(()=>{
    if(folderData?.data){
      const queriedFolders:Array<FolderNode> = parseFolderNodes(folderData?.data);
      mediaStore.setFolders(queriedFolders);
    }
  },[folderData, mediaStore]);

  return (
    <Scrollbar permanent>
      {
        (loading === true) && <MediaFilderLoadingSkeleton />
      }
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
              onMoveMedia = {onMoveMedia}       
            />
          })
        }
      </TreeView>
    </Scrollbar>
  );
})
