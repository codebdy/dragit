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

function retrigger(value:any, rule:any){
  if(rule.required){
    if(!value){
      return rule.required;
    }
  }

  if(rule.minLength){
    if(value && value.length < rule.minLength.value){
      return rule.minLength.message;
    }
  }

  if(rule.maxLength){
    if(value && value.length > rule.maxLength.value){
      return rule.maxLength.message;
    }
  }

  if(rule.min){
    if(value && value < rule.min.value){
      return rule.min.message
    }
  }

  if(rule.max){
    if(value && value > rule.max.value){
      return rule.max.message
    }
  }

  if(rule.pattern){
    if(value && !rule.pattern.value.test(value)){
      return rule.pattern.message
    }
  }

}

const withFormField = (Component:any)=>{
  const WithFormField = (props:any)=>{
    const {register, setValue, getValues , errors} = useFormContext();
    const {field, forwardedRef, empertyValue, rule, helperText, ...rest} = props;
    const value = useFieldValue(field);    
    const [inputValue, setInputValue] = React.useState(value);
    const [error, setError] = React.useState(errors[field] && errors[field].message);
    const loading = useModelLoading();
    const registerRule = rule && metaRuleToRegisterRules(rule);

    React.useEffect(() => {
      register(field, registerRule); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register])

    React.useEffect(() => {
      const currentValue = getValues(field) || value;
      setValue(field, currentValue);  
      setInputValue(currentValue )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const handleChange = (e:any) => {
      let newValue = e.target.value;
      setInputValue(newValue);
      setValue(field, newValue);
      error && setError(retrigger(inputValue, registerRule));
    }

    const handleBlur = ()=>{
      setError(retrigger(inputValue, registerRule));
    }

    return (
      <Component
        ref={forwardedRef}
        name = {field}
        loading={loading}
        value={inputValue || empertyValue || ''}
        {...rest}
        error={error ? true : undefined}
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