import React, { Fragment } from 'react';
import { MediaMeta } from './Medias/MediaGridListImage';
import MediaAdder from './Medias/MediaAdder';
import Image from 'components/common/Image'
import { Grid } from '@material-ui/core';


export default function MediasPortletFeathureGrid(
  props:{
    medias:Array<MediaMeta>, 
    onSelectMedias:(selectedMedias:Array<MediaMeta>)=>void
  }
){
  const {medias, onSelectMedias} = props;
  const meidasOnFirstLeft = medias.slice(1,9);

  const leftMedias = medias.slice(9);

  return (
    <Fragment>
      {
        medias.length > 0 &&
        <Grid  item xs={ 4}>
          <Image src={medias[0].thumbnail}/>
        </Grid> 
      }
      {
        meidasOnFirstLeft.length > 0 &&
        <Grid container item xs={8} spacing={3}>
          {
            meidasOnFirstLeft.map((media, index)=>{
              return (
                <Grid key={media.id + '-' + index} item xs={3}>
                  <Image src={media.thumbnail}/>
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
              <Image src={media.thumbnail}/>
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
