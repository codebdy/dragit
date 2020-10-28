import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import MediaGridListItemTitle from './MediaGridListItemTitle';
import { FolderNode } from './MediaFolder';
import MediaGridListIconButton from './MediaGridListIconButton';

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
    }

  }),
);

export default function MediaGridListFolder(props:{folder:FolderNode, onSelect:(nodeId:string)=>void}){
  const {folder, onSelect} = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);

  return (
    <Fragment>
      <div 
        className={classes.folder} 
        onDoubleClick = {()=>onSelect(folder.id)}
        onMouseOver = {()=>setHover(true)}
        onMouseLeave = {()=>setHover(false)}
      >
        <MdiIcon className={classes.folderIcon} iconClass = "mdi-folder-outline" size="50" />
        {
          hover&&
          <div className={classes.mask}>
            <div className={classes.toolbar}>
              <MediaGridListIconButton icon = "mdi-pencil" onClick={()=>{}} />
              <MediaGridListIconButton icon = "mdi-trash-can" onClick={()=>{}} />
            </div>
          </div>
        }
      </div>
      {
        //<LinearProgress />
      }
      <MediaGridListItemTitle title={folder.name} />
    </Fragment>
  )
}
