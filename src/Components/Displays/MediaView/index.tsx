import { IMedia } from 'Base/Model/IMedia';
import React from 'react';
import Image from 'Components/Common/Image';
import noImage from 'assets/img/no-image.png';
import withFormField from 'Components/Common/withFormField';
import withSkeleton from 'Base/HOCs/withSkeleton';
import { RXInputProps } from 'Base/RXInputProps';
import { useDesign } from 'rx-drag/store/useDesign';

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