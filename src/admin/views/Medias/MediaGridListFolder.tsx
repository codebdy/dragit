import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import MediaGridListItemTitle from './MediaGridListItemTitle';
import { FolderNode } from './MediaFolder';

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

  }),
);

export default function MediaGridListFolder(props:{folder:FolderNode, onSelect:(nodeId:string)=>void}){
  const {folder, onSelect} = props;
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.folder} onDoubleClick = {()=>onSelect(folder.id)}>
        <MdiIcon className={classes.folderIcon} iconClass = "mdi-folder-outline" size="50" />
      </div>
      {
        //<LinearProgress />
      }
      <MediaGridListItemTitle title={folder.name} />
    </Fragment>
  )
}
