import React, { Fragment, useState } from 'react';
import { makeStyles, Theme, createStyles, LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import MediaGridListItemTitle from './MediaGridListItemTitle';
import MediaGridListIconButton from './MediaGridListIconButton';
import classNames from 'classnames';
import { IMedia } from 'Base/Model/IMedia';
import Close from '@material-ui/icons/Close';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_UPDATE_MEDIA, MUTATION_REMOVE_MEDIAS } from './MediaGQLs';
import { FolderNode } from './MediaFolder';
import MdiIcon from 'Components/Common/MdiIcon';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { contains } from 'Utils/ArrayHelper';
import Image from 'Components/Common/Image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:"relative",
    },
    checked:{
      border:"#5d78ff solid 2px",
      borderRadius:"5px",
    },
    notChecked:{
      border:"transparent solid 2px",
      borderRadius:"5px",    
    },
    mask:{
      position:'absolute',
      height:'calc(100% - 2px)',
      width:"100%",
      left:"0",
      top:"1px",
      background:"rgba(50,50,50, 0.3)",
      borderRadius:"5px",
      display:'flex',
      flexFlow:"column",
      justifyContent:"space-between",
    },

    toolbar:{
      height:'40px',
      width:"100%",
      display:'flex',
      flexFlow:'row',
      justifyContent:'flex-end',
      padding:'2px',
    },
    titleInput:{
      width:'100%',
    },
    checkbox:{
      width:'30px',
      height:'30px',
      background:"#f7f7f7",
      position:'absolute',
      bottom: '5px', 
      right:'3px',
      borderRadius:'50%',
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(0.5),
      top: theme.spacing(0.5),
    },  
  }),
);

export default function MediaGridListImage(
  props:{
    folder?:FolderNode,
    selectedMedias:Array<IMedia>, 
    media:IMedia, 
    onRemoveMedia:(media:IMedia)=>void,
    onDragStart:(media:IMedia)=>void,
    onDragEnd:()=>void,
    onToggleSelect:(media:IMedia)=>void,
  }
){
  const {folder, selectedMedias, media, onRemoveMedia, onDragStart, onDragEnd, onToggleSelect} = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [mediaTitle, setMediaTitle] = useState(media.title);
  const [loading, setLoading] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const selected = contains(media, selectedMedias);

  const [updateMedia, {error:updateMediaError}] = useMutation(MUTATION_UPDATE_MEDIA,{
    onCompleted:(data)=>{
      setLoading(false);
    }});

  const [removeMedias, {error:removeMediasError}] = useMutation(MUTATION_REMOVE_MEDIAS,{
    onCompleted:(data)=>{
      setLoading(false);
      onRemoveMedia(media);
    }});

  useShowAppoloError(updateMediaError||removeMediasError);
    
  const changeImageTitleOnServer = ()=>{
    if(mediaTitle === media.title){
      return
    }
    setLoading(true)
    updateMedia({variables:{media:{id:media.id, title:mediaTitle, folderId:folder?.id}}})
    media.title = mediaTitle
  }

  const removeMedia = ()=>{
    setLoading(true)
    removeMedias({variables:{ids:[media.id]}})
  }

  const handleEndEditing = ()=>{
    setEditing(false);
    changeImageTitleOnServer();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value;
    setMediaTitle(value);
  };

  const handleView = ()=>{
    setViewOpen(true);
  }

  return (
    <Fragment>
      <div className = { classNames(classes.root) }
        draggable={true}
        onMouseOver = {()=>setHover(true)}
        onMouseLeave = {()=>setHover(false)}          
        onDragStart={()=>{
          setHover(false);
          onDragStart(media);
        }}
        onDragEnd = {onDragEnd}
        onClick = {()=>onToggleSelect(media)}
      >
        <Image 
          src={media.thumbnail}
          className = { selected? classes.checked : classes.notChecked } 
        />
        {
          hover&&
          <div className={classes.mask}>
            <div className={classes.toolbar}>
              <MediaGridListIconButton icon = "mdi-magnify" onClick={handleView} />
              <MediaGridListIconButton icon = "mdi-pencil" onClick={()=>setEditing(true)} />
              <MediaGridListIconButton icon = "mdi-delete-outline" onClick={removeMedia} />
            </div>

          </div>
        }
        {
          selected &&
          <div className={classes.checkbox}>
            <MdiIcon iconClass="mdi-check" size="18" color="#5d78ff" />
          </div>
        }        
      </div>        
      {
        loading && <LinearProgress />
      }
      {
        editing?
        <input 
          value={mediaTitle} 
          autoFocus= {true} 
          className={classes.titleInput}
          onBlur = {handleEndEditing}
          onKeyUp = {e=>{
            if(e.keyCode === 13) {
              handleEndEditing()
            }
          }}
          onChange = {handleChange}
        />
        :
        <MediaGridListItemTitle title={mediaTitle} />
      }

      {
        viewOpen &&
        <Dialog
          fullWidth
          maxWidth='sm'
          open={viewOpen}
          onClose={()=>{setViewOpen(false)}}
        >
          <DialogTitle>
            <IconButton aria-label="close" 
              className={classes.closeButton} 
              onClick={()=>{setViewOpen(false)}}
              size="small"
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <img width="100%" src={media.src} alt={'view ' + media.title} />
          </DialogContent>
          <DialogActions>
            url:{media.src}
          </DialogActions>
        </Dialog>
      }
    </Fragment>
  )
}
