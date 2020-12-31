import React from 'react';
import {observer} from 'mobx-react-lite';
import { ModelProvider, useFieldStore, useModelStore } from "./Store/ModelProvider";
import { ModelFieldStore } from "./Store/ModelFieldStore";

const withFormField = (Component:any)=>{
  const WithFormField = observer((props:any)=>{

    const {field, onlyShow, forwardedRef, empertyValue, rule, helperText, ...rest} = props;

    //const fieldName = useFieldName(field);
    //const subModelContext = useContext(SubModelContext);
    const fieldStore = useFieldStore(field);
    const modelStore =  useModelStore();
    //const [value, loading] = useFieldValue(field);    
    //const [inputValue, setInputValue] = React.useState(value);
    //const fieldError = useFieldError(fieldName);
    //const [error, setError] = React.useState(fieldError && fieldError.message);
    //const registerRule = rule && metaRuleToRegisterRules(rule);

    //useEffect(()=>{
    //  register(fieldName, registerRule)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //},[]);

    //useEffect(()=>{
    //  setError(fieldError);
    //},[fieldError]);

    //针对1对1面板
    //useEffect(()=>{
    //  if(subModelContext.parentField && !subModelContext.model){
        //setValue(subModelContext.parentField, {});
    //  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //},[field, subModelContext.parentField, subModelContext.model]);

    //useEffect(()=>{
    //  setInputValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //}, [value])

    const handleChange = (e:any) => {
      let newValue = e?.target?.value;
      fieldStore?.setValue(newValue);
      if(fieldStore?.error){
        fieldStore?.validate();        
      }
    }

    const handleBlur = ()=>{
      fieldStore?.validate();
    }
    const error = fieldStore?.error;
    const compent = <Component
      ref={forwardedRef}
      //name = {field}
      loading={fieldStore?.loading || modelStore.loading}
      value={fieldStore?.value || empertyValue || ''}
      {...rest}
      error={!! error}
      helperText = {error || helperText}
      onChange={handleChange}
      onBlur={handleBlur}
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