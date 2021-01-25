import Chip from '@material-ui/core/Chip';
import withSkeleton from 'Base/HOCs/withSkeleton';
import { IEnumItem } from 'Base/Model/IEnumItem';
import { RXInputProps } from 'Base/RXInputProps';
import withFormField from 'Components/Common/withFormField';
import { useDesign } from 'Design/PageEditor/useDesign';
import React from 'react';
import { first } from 'rx-drag/utils/ArrayHelper';

export interface ChipMeta extends IEnumItem{
  color: 'default' | 'primary' | 'secondary' | undefined
}

const EnumView = React.forwardRef((
  props:RXInputProps&{
    metas:[ChipMeta], 
  },
  ref:any
) =>{
  const {name, value, metas, error, helperText, ...rest} = props;
  const {isDesigning} = useDesign();
  const selectedMeta:ChipMeta|undefined = first(metas?.filter(meta=>meta.value === value))
  const render = value ?
    <Chip label={selectedMeta ? selectedMeta.name : value} color = {selectedMeta && selectedMeta.color} size = "small" {...rest} />
    :
    <span></span>
  return(
    isDesigning?
      <div 
        ref={ref}
        {...rest}
      >
        {`field:${name}`}
      </div>
      :
      render
  )
})

export default withFormField(withSkeleton(EnumView));