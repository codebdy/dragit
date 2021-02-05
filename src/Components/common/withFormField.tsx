import React, { useState } from 'react';
import {observer} from 'mobx-react';
import { useModelStore } from "../../Base/ModelTree/ModelProvider";
import { useFieldStore } from "./useFieldStore";
import { toJS } from 'mobx';
import { DADA_RXID_CONST } from 'rx-drag/models/RxNode';
import { useEffect } from 'react';

const withFormField = (Component:any)=>{
  const WithFormField = observer((props:any)=>{
    const {[DADA_RXID_CONST]:rxid, rxNode, onlyShow, forwardedRef, empertyValue, rule, helperText, graphiQL, ...rest} = props;
    const modelStore =  useModelStore();
    const fieldStore = useFieldStore(rxNode);
    const [inutValue, setInputValue] = useState( toJS(fieldStore?.value));

    useEffect(()=>{
      setInputValue(toJS(fieldStore?.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fieldStore?.value])
    
    const handleChange = (e:any) => {
      let newValue = toJS(e?.target?.value);
      fieldStore?.setValue(newValue);
      if(fieldStore?.error){
        fieldStore?.validate();        
      }
    }

    /*const handleBlur = (event:any)=>{
      if(event){
        event.stopPropagation();
        fieldStore?.validate();        
      }
    }*/

    const error = fieldStore?.error;
    return (
      <Component
        {...{[DADA_RXID_CONST]:rxid}}
        ref={forwardedRef}
        loading={fieldStore?.loading || modelStore?.loading}
        value={inutValue === undefined ? (empertyValue || '') : inutValue}
        {...rest}
        error={!! error}
        helperText = {error || helperText}
        onChange={handleChange}
        //onBlur={handleBlur}
        name = {rxNode?.meta.field}
      />
    )
  })
  return React.forwardRef((props, ref) => {
    return <WithFormField {...props} forwardedRef={ref} />;
  });
}

export default withFormField