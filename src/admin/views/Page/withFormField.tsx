import { ValidateRule } from 'designer/PageEditor/Attrebutebox/ValidateArea';
import React, { useContext, useEffect } from 'react';
import useFieldValue from './useFieldValue';
import intl from 'react-intl-universal';
import { RowModelContext } from '../../../components/OneToManyPortlet/RowModelContext';
import useFieldError from './useFieldError';
import { useFormContext } from './Form/RXForm';

function metaRuleToRegisterRules(rule:ValidateRule){
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
        // eslint-disable-next-line no-eval
        value:eval(rule.pattern||''),
        message:rule.errorMessage
      }
    }

  }
  return rtRules;
}

const withFormField = (Component:any)=>{
  const WithFormField = (props:any)=>{
    const modelContext = useContext(RowModelContext);
    const {register, setValue, validate} = useFormContext();
    const {field, forwardedRef, empertyValue, rule, helperText, ...rest} = props;
    const fieldName = modelContext.parentField ? `${modelContext.parentField}[${modelContext.rowIndex}].${field}`: field;
    
    const [value, loading] = useFieldValue(field);    
    const [inputValue, setInputValue] = React.useState(value);
    const fieldError = useFieldError(field);
    //const [error, setError] = React.useState(fieldError && fieldError.message);
    const registerRule = rule && metaRuleToRegisterRules(rule);

    useEffect(()=>{
      register(field, registerRule)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
      setInputValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    //console.log('useFormField', value);

    const handleChange = (e:any) => {
      let newValue = e?.target?.value;
      setInputValue(newValue);
      setValue(fieldName, newValue);
    }

    const handleBlur = ()=>{
      validate(fieldName);
    }

    return (
      <Component
        ref={forwardedRef}
        name = {fieldName}
        loading={loading}
        value={inputValue || empertyValue || ''}
        {...rest}
        error={!!fieldError}
        helperText = {fieldError || helperText}
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