import React from 'react';
import {observer} from 'mobx-react';
import { useModelStore } from "../../Base/ModelTree/ModelProvider";
import { useFieldStore } from "./useFieldStore";

const withFormField = (Component:any)=>{
  const WithFormField = observer((props:any)=>{
    const {field, onlyShow, forwardedRef, empertyValue, rule, helperText, graphiQL, ...rest} = props;
    const fieldStore = useFieldStore({name:field, props});
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
      loading={fieldStore?.loading || modelStore?.loading}
      value={fieldStore?.value === undefined ? (empertyValue || '') : fieldStore?.value}
      {...rest}
      error={!! error}
      helperText = {error || helperText}
      onChange={handleChange}
      //onBlur={handleBlur}
      name = {field}
    />;
    return (
      compent
    )
  })
  return React.forwardRef((props, ref) => {
    return <WithFormField {...props} forwardedRef={ref} />;
  });
}

export default withFormField