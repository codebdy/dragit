import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { IMedia } from 'Base/Model/IMedia';
import { RXInputProps } from 'Base/RXInputProps';
import React from 'react';

export const MediaGroup = (
  props:RXInputProps&{
    max?:number,
    value?:Array<IMedia>
  }
) => {
  const {max, value, error, helperText, ...rest} = props;

  const medias = value instanceof Array ? value :[];

  return (
    <AvatarGroup max={max} {...rest}>
      {
        medias?.map((media:IMedia)=>{
          return (
            <Avatar key = {media.id} alt= {media.alt} src={media.thumbnail} />
          )
        })
         
      }
    </AvatarGroup>
  );
}
