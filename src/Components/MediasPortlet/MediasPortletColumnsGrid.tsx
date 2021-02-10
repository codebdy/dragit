import React, { Fragment } from 'react';
import MediaAdder from '../Medias/MediaAdder';
import { Grid } from '@material-ui/core';
import MediasPortletMedia from './MediasPortletMedia';
import { IRxMedia } from 'Base/Model/IRxMedia';


export default function MediasPortletColumnsGrid(
  props:{
    medias:Array<IRxMedia>, 
    onSelectMedias:(selectedMedias?:Array<IRxMedia>|IRxMedia)=>void,
    onSwap:(first:IRxMedia, second:IRxMedia)=>void,
    onRemove:(media:IRxMedia)=>void,
    cols?:number,
  }
){
  const {medias, onSelectMedias, onSwap, onRemove, cols=3} = props;
  const [draggedMedia, setDraggedMedia] = React.useState<IRxMedia|undefined>(undefined);
  const colWidth:any = 12/cols;
  const handleDragStart = (media:IRxMedia)=>{
    setDraggedMedia(media)
  }
  const handleDragEnd = ()=>{
    setDraggedMedia(undefined);
  }

  const handleDrop = (media:IRxMedia)=>{
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
