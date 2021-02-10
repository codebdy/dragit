import React, { Fragment } from 'react';
import MediaAdder from '../Medias/MediaAdder';
import { Grid } from '@material-ui/core';
import MediasPortletMedia from './MediasPortletMedia';
import { IRxMedia } from 'Base/Model/IRxMedia';


export default function MediasPortletFeathureGrid(
  props:{
    medias:Array<IRxMedia>, 
    onSelectMedias:(selectedMedias?:Array<IRxMedia>|IRxMedia)=>void,
    onSwap:(first:IRxMedia, second:IRxMedia)=>void,
    onRemove:(media:IRxMedia)=>void,
  }
){
  const {medias, onSelectMedias, onSwap, onRemove} = props;
  const [draggedMedia, setDraggedMedia] = React.useState<IRxMedia|undefined>(undefined);
  const meidasOnFirstLeft = medias.slice(1,9);

  const leftMedias = medias.slice(9);
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
        medias.length > 0 &&
        <Grid  item xs={ 4}>
          <MediasPortletMedia 
            media={medias[0]}
            draggedMedia = {draggedMedia}
            onDragStart = {handleDragStart}
            onDragEnd = {handleDragEnd}
            onDrop = {handleDrop}
            onRemove = {onRemove}
          />
        </Grid> 
      }
      {
        meidasOnFirstLeft.length > 0 &&
        <Grid container item xs={8} spacing={3}>
          {
            meidasOnFirstLeft.map((media, index)=>{
              return (
                <Grid key={media.id + '-' + index} item xs={3}>
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
            meidasOnFirstLeft.length < 8 &&           
            <Grid item xs={3}>
              <MediaAdder onSelectMedias={onSelectMedias}/>
            </Grid>
          }
        </Grid> 
      }
      {  
        leftMedias.map((media, index)=>{
          return (
            <Grid key={media.id + '-' + index} item xs={2}>
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
        (medias.length <= 1 || meidasOnFirstLeft.length >= 8) &&
        <Grid item xs={2}>
          <MediaAdder onSelectMedias={onSelectMedias}/>
        </Grid>
      }
    </Fragment>
  )
}
