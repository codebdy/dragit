import React, { Fragment } from 'react';
import MediaAdder from '../Medias/MediaAdder';
import { Grid } from '@material-ui/core';
import MediasPortletMedia from './MediasPortletMedia';
import { IMedia } from 'base1/Model/IMedia';


export default function MediasPortletFeathureGrid(
  props:{
    medias:Array<IMedia>, 
    onSelectMedias:(selectedMedias?:Array<IMedia>|IMedia)=>void,
    onSwap:(first:IMedia, second:IMedia)=>void,
    onRemove:(media:IMedia)=>void,
  }
){
  const {medias, onSelectMedias, onSwap, onRemove} = props;
  const [draggedMedia, setDraggedMedia] = React.useState<IMedia|undefined>(undefined);
  const meidasOnFirstLeft = medias.slice(1,9);

  const leftMedias = medias.slice(9);
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
