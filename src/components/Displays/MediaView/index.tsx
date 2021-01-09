import { IMedia } from 'base/Model/IMedia';
import React from 'react';
import Image from 'components/common/Image';
import noImage from 'assets/img/no-image.png';
import withFormField from 'components/common/withFormField';
import withSkeleton from 'base/HOCs/withSkeleton';
import { RXInputProps } from 'base/RXInputProps';

export const MediaView = React.forwardRef((
  props:RXInputProps& {
    value:IMedia,
    width:number,
    isDeisgning?:boolean,
    style?:any,
  },
  ref:any
) =>{
  const {value, width = 60,  error, helperText, name, isDeisgning, style, ...rest} = props;
  return(
    <div style={{...style, width:width}} {...rest} ref={ref}>
      {isDeisgning && `field:${name}`}
      <Image src={value?.thumbnail || noImage} />      
    </div>

  )
})

export default withFormField(withSkeleton(MediaView))