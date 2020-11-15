import { ValidateRule } from 'designer/Attrebutebox/AttributeBoxValidateArea';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useFieldValue from '../../admin/views/Page/useFieldValue';
import useModelLoading from '../../admin/views/Page/useModelLoading';
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
    const {control, errors} = useFormContext();
    const {field, defaultValue, rule, ...rest} = props
    const loading = useModelLoading();
    const error = errors && errors[field];
    const value = useFieldValue(field);
    return (
      loading ? 
      <Component loading={loading} {...rest} /> 
      :
      <Controller
        as={Component}
        name = {field}
        control = {control}
        defaultValue = {value || defaultValue || ''}
        loading={loading}
        value={value}
        {...rest}
        rules = {rule && metaRuleToRegisterRules(rule)}
        error={error ? true : undefined}
      />
    )
  }

  return (props: any) => {
    return <WithFormField {...props} />;
  };
}

export default withFormField