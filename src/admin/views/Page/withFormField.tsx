import { ValidateRule } from 'designer/Attrebutebox/AttributeBoxValidateArea';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import useFieldValue from './useFieldValue';
import useModelLoading from './useModelLoading';
import intl from 'react-intl-universal';

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
    const {register, setValue, control, errors} = useFormContext();
    const {field, forwardedRef, empertyValue, rule, ...rest} = props;
    const value = useFieldValue(field);    
    const [inputValue, setInputValue] = React.useState(value);
    const loading = useModelLoading();
    React.useEffect(() => {
      register(field, rule); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register])

    React.useEffect(() => {
      setValue(field, value);  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const handleChange = (e:any) => {
      let newValue = e.target.value;
      setInputValue(newValue)
      setValue(field, newValue);
    }


    const error = errors && errors[field];

    return (
      <Component
        ref={forwardedRef}
        name = {field}
        control = {control}
        loading={loading}
        value={inputValue || empertyValue || ''}
        {...rest}
        rules = {rule && metaRuleToRegisterRules(rule)}
        error={error ? true : undefined}
        onChange={handleChange}
      />
    )
  }
  return React.forwardRef((props, ref) => {
    return <WithFormField {...props} forwardedRef={ref} />;
  });
}

export default withFormField