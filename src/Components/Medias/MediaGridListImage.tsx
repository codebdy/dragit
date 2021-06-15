import React, { Fragment, useState } from 'react';
import { makeStyles, 
  Theme, 
  createStyles, 
  LinearProgress, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  IconButton 
} from '@material-ui/core';
import MediaGridListItemTitle from './MediaGridListItemTitle';
import MediaGridListIconButton from './MediaGridListIconButton';
import classNames from 'classnames';
import Close from '@material-ui/icons/Close';
import { MUTATION_REMOVE_MEDIAS } from './MediasGQLs';
import MdiIcon from 'Components/common/MdiIcon';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import Image from 'Components/common/Image';
import {observer} from 'mobx-react';
import { MediaStore } from './MediaStore';
import { useMediasStore } from './MediasStore';
import { useUpdateMedia } from './useUpdateMedia';
import { useLazyQuery } from '@apollo/client';
import { mediaServerUrl } from 'Data/mediaServerUrl';

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

export const MediaGridListImage = observer((
  props:{media:MediaStore}
)=>{
  const {media} = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [mediaName, setMediaName] = useState(media.name);
  //const [loading, setLoading] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  //const selected = contains(media, selectedMedias);
  const mediasStore = useMediasStore();

  const updateMedia = useUpdateMedia((data)=>{
    media.setLoading(false);
    media.name = mediaName;
  });

  const [removeMedias, {error:removeMediasError}] = useLazyQuery(MUTATION_REMOVE_MEDIAS,{
    errorPolicy:'all',
    onCompleted:(data)=>{
      media.setLoading(false);
      mediasStore.removeMedias([media.id]);
    }});

  useShowServerError(removeMediasError);
    
  const changeImageNameOnServer = ()=>{
    if(mediaName === media.name){
      return
    }
    media.setLoading(true)
    updateMedia({data:{rxMedia:{id:media.id, name:mediaName}}})
  }

  const removeMedia = ()=>{
    media.setLoading(true)
    removeMedias({variables:{id:[media.id]}})
  }

  const handleEndEditing = ()=>{
    setEditing(false);
    changeImageNameOnServer();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value;
    setMediaName(value);
  };

  const handleView = ()=>{
    setViewOpen(true);
  }

  const handleToggleSelect = ()=>{
    mediasStore.toggleSelected(media);
  }

  const handleDragStart = ()=>{
    setHover(false);
    mediasStore.setDraggedMedia(media);
  }

  const handleDragEnd = ()=>{
    mediasStore.setDraggedMedia(undefined);
  }

  return (
    <Fragment>
      <div className = { classNames(classes.root) }
        draggable={true}
        onMouseOver = {()=>setHover(true)}
        onMouseLeave = {()=>setHover(false)}          
        onDragStart={handleDragStart}
        onDragEnd = {handleDragEnd}
        onClick = {handleToggleSelect}
      >
        <Image 
          src={`${mediaServerUrl}/thumbnails/${media.fileName}`}
          className = { media.selected? classes.checked : classes.notChecked } 
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
          media.selected &&
          <div className={classes.checkbox}>
            <MdiIcon iconClass="mdi-check" size="18" color="#5d78ff" />
          </div>
        }        
      </div>        
      {
        media.loading && <LinearProgress />
      }
      {
        editing?
        <input 
          value={mediaName} 
          autoFocus= {true} 
          className={classes.titleInput}
          onBlur = {handleEndEditing}
          onKeyUp = {e=>{
            if(e.key === 'Enter') {
              handleEndEditing()
            }
          }}
          onChange = {handleChange}
        />
        :
        <MediaGridListItemTitle title={mediaName} />
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
            <img width="100%" src={media.fileName} alt={'view ' + media.name} />
          </DialogContent>
          <DialogActions>
            url:{media.fileName}
          </DialogActions>
        </Dialog>
      }
    </Fragment>
  )
})
