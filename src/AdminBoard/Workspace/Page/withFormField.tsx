import { IValidateRule } from "base/Model/IValidateRule";
import React, { useContext, useEffect } from 'react';
import useFieldValue from '../../views/Page/useFieldValue';
import intl from 'react-intl-universal';
import useFieldError from '../../views/Page/useFieldError';
import { useFormContext } from '../../views/Page/Form/useFormContext';
import useFieldName from '../../views/Page/useFieldName';
import { SubModelContext } from 'components/OneToOnePortlet/SubModelContext';

function metaRuleToRegisterRules(rule:IValidateRule){
  let rtRules:any = {};
  if(rule.required){
    rtRules['required'] = intl.get('msg-required');
  }
  if(rule.valueType === "string"){
    rule.minLength && (rtRules['minLength'] = {
      value:rule.minLength,
      message:intl.get('msg-min-length')
    });    
    rule.maxLength && (rtRules['maxLength'] = {
      value:rule.maxLength,
      message:intl.get('msg-max-length')
    });

    rule.min && (rtRules['min'] = {
      value:rule.min,
      message:intl.get('msg-min')
    });
    rule.min && (rtRules['max'] = {
      value:rule.max,
      message:intl.get('msg-max')
    });

    if(rule.ruleType === "email"){
      rtRules['pattern'] = {
        value:/^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/i,
        message:rule.errorMessage || intl.get('msg-email')
      }
    }
    if(rule.ruleType === "url"){
      rtRules['pattern'] = {
        value:/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/i,
        message:rule.errorMessage || intl.get('msg-email')
      }
    }
    if(rule.ruleType === "custumized" && rule.pattern){
      rtRules['pattern'] = {
        value:RegExp(rule.pattern||''),
        message:rule.errorMessage
      }
    }

  }
  return rtRules;
}

const withFormField = (Component:any)=>{
  const WithFormField = (props:any)=>{

    const {field, forwardedRef, empertyValue, rule, helperText, onDirty, ...rest} = props;

    const fieldName = useFieldName(field);
    const subModelContext = useContext(SubModelContext);
    
    const [value, loading] = useFieldValue(field);    
    const [inputValue, setInputValue] = React.useState(value);
    const fieldError = useFieldError(fieldName);
    const [error, setError] = React.useState(fieldError && fieldError.message);
    const registerRule = rule && metaRuleToRegisterRules(rule);

    //useEffect(()=>{
    //  register(fieldName, registerRule)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //},[]);

    useEffect(()=>{
      setError(fieldError);
    },[fieldError]);

    //针对1对1面板
    useEffect(()=>{
      if(subModelContext.parentField && !subModelContext.model){
        //setValue(subModelContext.parentField, {});
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[field, subModelContext.parentField, subModelContext.model]);

    useEffect(()=>{
      setInputValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const handleChange = (e:any) => {
      let newValue = e?.target?.value;
      setInputValue(newValue);
      //setValue(fieldName, newValue);
      onDirty && onDirty();
    }

    const handleBlur = ()=>{
      //const newError = validate(fieldName);
      //setError(newError)
    }

    return (
      <Component
        ref={forwardedRef}
        name = {fieldName}
        loading={loading}
        value={inputValue || empertyValue || ''}
        {...rest}
        error={!!error}
        helperText = {error || helperText}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    )
  }
  return React.forwardRef((props, ref) => {
    return <WithFormField {...props} forwardedRef={ref} />;
  });
}

export default withFormField