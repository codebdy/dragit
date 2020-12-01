import React, { Fragment } from 'react';
import MediaAdder from '../Medias/MediaAdder';
import { Grid } from '@material-ui/core';
import MediasPortletMedia from './MediasPortletMedia';
import { IMedia } from 'base/Model/IMedia';


export default function MediasPortletColumnsGrid(
  props:{
    medias:Array<IMedia>, 
    onSelectMedias:(selectedMedias?:Array<IMedia>|IMedia)=>void,
    onSwap:(first:IMedia, second:IMedia)=>void,
    onRemove:(media:IMedia)=>void,
    cols?:number,
  }
){
  const {medias, onSelectMedias, onSwap, onRemove, cols=3} = props;
  const [draggedMedia, setDraggedMedia] = React.useState<IMedia|undefined>(undefined);
  const colWidth:any = 12/cols;
  const handleDragStart = (media:IMedia)=>{
    setDraggedMedia(media)
  }
  const handleDragEnd = ()=>{
    setDraggedMedia(undefined);
  }

  const handleDrop = (media:IMedia)=>{
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
