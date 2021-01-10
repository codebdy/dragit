import { IMedia } from 'base/Model/IMedia';
import React from 'react';
import Image from 'components/common/Image';
import noImage from 'assets/img/no-image.png';
import withFormField from 'components/common/withFormField';
import withSkeleton from 'base/HOCs/withSkeleton';
import { RXInputProps } from 'base/RXInputProps';
import { useDesign } from 'design/PageEditor/useDesign';

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