import React from 'react';
import {observer} from 'mobx-react-lite';
import { ModelProvider, useFieldStore, useModelStore } from "./Store/ModelProvider";
import { ModelFieldStore } from "./Store/ModelFieldStore";

const withFormField = (Component:any)=>{
  const WithFormField = observer((props:any)=>{
    const {field, onlyShow, forwardedRef, empertyValue, rule, helperText, ...rest} = props;
    const fieldStore = useFieldStore(field);
    const modelStore =  useModelStore();

    const handleChange = (e:any) => {
      let newValue = e?.target?.value;
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
    const compent = <Component
      ref={forwardedRef}
      loading={fieldStore?.loading || modelStore.loading}
      value={fieldStore?.value || empertyValue || ''}
      {...rest}
      error={!! error}
      helperText = {error || helperText}
      onChange={handleChange}
      //onBlur={handleBlur}
    />;
    return (
      fieldStore instanceof ModelFieldStore?
      <ModelProvider value = {fieldStore as any}>
        {compent}
      </ModelProvider>
      :
      compent
    )
  })
  return React.forwardRef((props, ref) => {
    return <WithFormField {...props} forwardedRef={ref} />;
  });
}

export default withFormField