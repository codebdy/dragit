import React, { Fragment } from 'react';
import { resolveNode } from 'components/resoveNode';
import { RXElement } from './RXElement';
import { PageActionHandle } from './PageAction';
import { useFormContext } from 'react-hook-form';
import { ValidateRule } from 'designer/Attrebutebox/AttributeBoxValidateArea';
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

export default function ElementRender(props:{element:RXElement, formModel:any, onPageAction: PageActionHandle}){
  const {element, formModel, onPageAction} = props;
  const onClickAction = element.meta.props?.onClick;
  const Element = resolveNode(element.meta.name);
  const {control, errors} = useFormContext();
  const handleOnClick = ()=>{
    if(!onClickAction){
      return
    }
    onPageAction(onClickAction);
  };

  //const field = element.meta.props?.field;
  let metaProps = element.meta.props? element.meta.props :{};
  const {rxText, rule, field, withActions, ...rest} = metaProps as any;

  let elementProps:any = {...rest,  onClick:handleOnClick}
  let value = field && formModel && formModel[field];

  if(field){
    let error = errors && errors[field];
    //console.log('errors', rxForm.errors, value)
    elementProps = {
      ...elementProps,
      name: field,
      value: value || '',
      control:field && control,
      error: error ? true : undefined,
      rules: rule && metaRuleToRegisterRules(rule),
      helperText: error? error.message : metaProps.helperText,
    }
  }
  if(withActions){
    elementProps.onAction = onPageAction;
  }

  const elementView = (element.children && element.children.length > 0) || rxText ?
    (<Element {...elementProps}>
      {rxText}
      {element.children?.map((child: RXElement)=>{
        return (
          <ElementRender key={child.id} element={child} formModel={formModel} onPageAction={onPageAction}/>
        )
      })}
    </Element>)
    :
    <Element {...elementProps} />

  return(
    <Fragment>
    { elementView }
    </Fragment>
  )
}
