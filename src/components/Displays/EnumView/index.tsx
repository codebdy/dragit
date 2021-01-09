import Chip from '@material-ui/core/Chip';
import withSkeleton from 'base/HOCs/withSkeleton';
import withFormField from 'components/common/withFormField';
import React from 'react';
import { first } from 'utils/ArrayHelper';

export interface ChipMeta{
  name:string,
  label:string,
  value: 'default' | 'primary' | 'secondary' | undefined
}

const EnumView = React.forwardRef((
  props:{value:string, metas:[ChipMeta]},
  ref:any
) =>{
  const {value, metas} = props;
  const selectedMeta:ChipMeta|undefined = first(metas?.filter(meta=>meta.name === value))
  return(
    value
    ?
    <Chip label={selectedMeta ? selectedMeta.label : value} color = {selectedMeta && selectedMeta.value} size = "small" />
    :
    <span></span>
  )
})

export default withFormField(withSkeleton(EnumView));