import { IMedia } from 'base1/Model/IMedia';
import React from 'react';
import Image from 'components1/common/Image';
import noImage from 'assets/img/no-image.png';
import withFormField from 'components1/common/withFormField';
import withSkeleton from 'base1/HOCs/withSkeleton';
import { RXInputProps } from 'base1/RXInputProps';
import { useDesign } from 'design1/PageEditor/useDesign';

export const MediaView = React.forwardRef((
  props:RXInputProps& {
    value:IMedia,
    width:number,
    style?:any,
  },
  ref:any
) =>{
  const {value, width = 60,  error, helperText, name, style, ...rest} = props;
  const {isDesigning} = useDesign();
  
  return(
    <div style={{...style, width:width}} {...rest} ref={ref}>
      {isDesigning && `field:${name}`}
      <Image src={value?.thumbnail || noImage} />      
    </div>

  )
})

export default withFormField(withSkeleton(MediaView))