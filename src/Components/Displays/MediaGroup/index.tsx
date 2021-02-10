import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { IRxMedia } from 'Base/Model/IRxMedia';
import { RXInputProps } from 'Base/RXInputProps';
import React from 'react';

export const MediaGroup = (
  props:RXInputProps&{
    count?:number,
    max?:number,
    value?:Array<IRxMedia>,
    spacing?:"medium"|"small"|number,
  }
) => {
  const {count, max, value, error, helperText, spacing = "medium", ...rest} = props;

  const medias = value instanceof Array ? value :[];

  return (
    <AvatarGroup max={max} {...rest} spacing = {spacing}>
      {
        medias?.map((media:IRxMedia, index)=>{
          return (
            ((count && index + 1 <=count)|| !count) &&
            <Avatar key = {media.id} alt= {media.alt} src={media.thumbnail} />
          )
        })
         
      }
    </AvatarGroup>
  );
}
