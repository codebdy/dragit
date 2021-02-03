import React from 'react';
import { RXInputProps } from 'Base/RXInputProps';
import withFormField from 'Components/common/withFormField';
import { useDesign } from 'rx-drag/store/useDesign';

const Hidden = React.forwardRef((
  props: RXInputProps& {
    display?:'inline'|'block',
    style?:any,
  },
  ref:any
)=>{
  const {name, loading, value, error, helperText, onChange,  ...rest} = props;
  const {isDesigning} = useDesign();

  return (
    isDesigning
    ? <div 
        ref={ref}
        {...rest}
      >
        {`Hidden:${name}`}
      </div>
    : <></>
  )
})

export default withFormField(Hidden)