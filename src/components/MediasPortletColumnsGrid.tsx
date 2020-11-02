import React, { Fragment } from 'react';
import { MediaMeta } from './Medias/MediaGridListImage';
import MediaAdder from './Medias/MediaAdder';
import { Grid } from '@material-ui/core';
import MediasPortletMedia from './MediasPortletMedia';


export default function MediasPortletColumnsGrid(
  props:{
    medias:Array<MediaMeta>, 
    onSelectMedias:(selectedMedias:Array<MediaMeta>)=>void,
    onSwap:(first:MediaMeta, second:MediaMeta)=>void,
    onRemove:(media:MediaMeta)=>void,
    cols?:number,
  }
){
  const {medias, onSelectMedias, onSwap, onRemove, cols=3} = props;
  const [draggedMedia, setDraggedMedia] = React.useState<MediaMeta|undefined>(undefined);
  const colWidth:any = 12/cols;
  const handleDragStart = (media:MediaMeta)=>{
    setDraggedMedia(media)
  }
  const handleDragEnd = ()=>{
    setDraggedMedia(undefined);
  }

  const handleDrop = (media:MediaMeta)=>{
    draggedMedia && onSwap(media, draggedMedia);
  }

  return (
    <Fragment>
      {  
        medias.map((media, index)=>{
          return (
            <Grid key={media.id + '-' + index} item xs={colWidth}>
              <MediasPortletMedia 
                media={media}
                draggedMedia = {draggedMedia}
                onDragStart = {handleDragStart}
                onDragEnd = {handleDragEnd}
                onDrop = {handleDrop}
                onRemove = {onRemove}
              />
            </Grid>                
          )
        })
      }
      {
        <Grid item xs={colWidth}>
          <MediaAdder onSelectMedias={onSelectMedias}/>
        </Grid>
      }
    </Fragment>
  )
}
