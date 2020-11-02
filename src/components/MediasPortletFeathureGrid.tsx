import React, { Fragment } from 'react';
import { MediaMeta } from './Medias/MediaGridListImage';
import MediaAdder from './Medias/MediaAdder';
import { Grid } from '@material-ui/core';
import MediasPortletMedia from './MediasPortletMedia';


export default function MediasPortletFeathureGrid(
  props:{
    medias:Array<MediaMeta>, 
    onSelectMedias:(selectedMedias:Array<MediaMeta>)=>void,
    onSwap:(first:MediaMeta, second:MediaMeta)=>void,
  }
){
  const {medias, onSelectMedias, onSwap} = props;
  const [draggedMedia, setDraggedMedia] = React.useState<MediaMeta|undefined>(undefined);
  const meidasOnFirstLeft = medias.slice(1,9);

  const leftMedias = medias.slice(9);
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
        medias.length > 0 &&
        <Grid  item xs={ 4}>
          <MediasPortletMedia 
            media={medias[0]}
            draggedMedia = {draggedMedia}
            onDragStart = {handleDragStart}
            onDragEnd = {handleDragEnd}
            onDrop = {handleDrop}
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
