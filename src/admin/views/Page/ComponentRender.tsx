import React, { Fragment } from 'react';
import { RXElement } from './RXElement';
import { PageActionHandle } from './PageAction';
import { useFormContext } from 'react-hook-form';
import { ValidateRule } from 'designer/Attrebutebox/AttributeBoxValidateArea';
import intl from 'react-intl-universal';
import { resolveComponent } from 'base/DragRX';

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

export default function ComponentRender(props:{component:RXElement, formModel:any, onPageAction: PageActionHandle}){
  const {component, formModel, onPageAction} = props;
  const onClickAction = component.meta.props?.onClick;
  const Component = resolveComponent(component.meta);
  const {control, errors} = useFormContext();
  const handleOnClick = ()=>{
    if(!onClickAction){
      return
    }
    onPageAction(onClickAction);
  };

  //const field = element.meta.props?.field;
  let metaProps = component.meta.props? component.meta.props :{};
  const {rxText, rule, field, withActions, ...rest} = metaProps as any;

  let elementProps:any = {...rest,  onClick:handleOnClick}
  let value = field && formModel && formModel[field];

  if(field){
    let error = errors && errors[field];
    //field === 'medias' && console.log('ElementRender',field)
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

  const elementView = (component.children && component.children.length > 0) || rxText ?
    (<Component {...elementProps}>
      {rxText}
      {component.children?.map((child: RXElement)=>{
        return (
          <ComponentRender key={child.id} component={child} formModel={formModel} onPageAction={onPageAction}/>
        )
      })}
    </Component>)
    :
    <Component {...elementProps} />

  return(
    <Fragment>
    { elementView }
    </Fragment>
  )
}
