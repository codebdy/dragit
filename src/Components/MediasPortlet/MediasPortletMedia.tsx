import React from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import Image from 'Components/common/Image'
import MdiIcon from '../common/MdiIcon';
import { IMedia } from 'Base/Model/IMedia';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:"relative",
      cursor:'move',
    },
    mask:{
      position:'absolute',
      height:'calc(100% - 2px)',
      width:"100%",
      left:"0",
      top:"1px",
      background:"rgba(50,50,50, 0.3)",
      borderRadius:"5px",
    },
    closeButton:{
      position:'absolute',
      right:'3px',
      top:'3px',
    },
    moveIcon:{
      position:'absolute',
      left:'calc(50% - 20px)',
      top:'calc(50% - 20px)',
    }
  }),
);

export default function MediasPortletMedia(
  props:{
    media:IMedia,
    draggedMedia:IMedia|undefined,
    onRemove:(media:IMedia)=>void,
    onDragStart:(media:IMedia)=>void,
    onDragEnd:()=>void,
    onDrop:(targetMedia:IMedia)=>void
  }
){
  const {media, draggedMedia, onRemove, onDragStart, onDragEnd, onDrop} = props
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);

  const handleDragOver = (event:React.DragEvent<HTMLDivElement>)=>{
    if(draggedMedia && draggedMedia !== media){
      event.preventDefault();
    }
  }

  return (
    <div className = { classes.root }
      draggable={true}
      onMouseOver = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}       
      onDragStart={()=>{
        setHover(false);
        onDragStart(media);
      }}
      onDragEnd = {onDragEnd}
      onDrop = {()=>onDrop(media)}
      onDragOver = {handleDragOver}
    >
      <Image src={media.thumbnail}/>
      {
        hover&&
        <div className={classes.mask}>
          <IconButton className={classes.closeButton} size="small" onClick={()=>onRemove(media)}>
            <MdiIcon iconClass = "mdi-close" color="#f7f7f7" size="16" />
          </IconButton>
  
          <div className={classes.moveIcon}>
            <MdiIcon iconClass = "mdi-arrow-all" color="#f7f7f7" size="40"  />
          </div>
        </div>
      }
    </div>
  )
}
