import React, { Fragment } from 'react';
import { resolveNode } from 'components/resoveNode';
import { RXElement } from './RXElement';
import { PageActionHandle } from './PageAction';
import { DeepMap, FieldError } from 'react-hook-form';

export interface RxForm{
  register:(Ref:any, validateRule?:any)=>void,
  errors:DeepMap<Record<string, any>, FieldError>,
  formModel:any,
}


export default function ElementRender(props:{element:RXElement, rxForm:RxForm, onPageAction: PageActionHandle}){
  const {element, rxForm, onPageAction} = props;
  const onClickAction = element.meta.props?.onClick;
  const Element = resolveNode(element.meta.name);
  const handleOnClick = ()=>{
    if(!onClickAction){
      return
    }
    onPageAction(onClickAction);
  };

  //const field = element.meta.props?.field;
  let metaProps = element.meta.props? element.meta.props :{};
  const {rxText, field, withActions, ...rest} = metaProps as any;

  let elementProps:any = {...rest,  onClick:handleOnClick}
  const value = field && rxForm.formModel && rxForm.formModel[field];

  if(field){
    let error = rxForm.errors && rxForm.errors[field];
    console.log('errors', rxForm.errors)
    elementProps = {
      ...elementProps,
      name: field,
      value: value || '',
      error: error ? true : undefined,
      inputRef: rxForm.register({ required: "This is required.", maxLength: {
        value: 10,
        message: "This input exceed maxLength."
      } }),
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
          <ElementRender key={child.id} element={child} rxForm={rxForm} onPageAction={onPageAction}/>
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
