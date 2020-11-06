import React, { Fragment } from 'react';
import { resolveNode } from 'components/resoveNode';
import { RXElement } from './RXElement';
import { PageActionHandle } from './PageAction';
import { useFormContext } from 'react-hook-form';

export interface RxForm{
  formModel:any,
}


export default function ElementRender(props:{element:RXElement, rxForm:RxForm, onPageAction: PageActionHandle}){
  const {element, rxForm, onPageAction} = props;
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
  let value = field && rxForm.formModel && rxForm.formModel[field];

  if(field){
    let error = errors && errors[field];
    //console.log('errors', rxForm.errors, value)
    elementProps = {
      ...elementProps,
      name: field,
      value: value || '',
      control:control,
      error: error ? true : undefined,
      rules: rule && { required: "This is required.", maxLength: {
        value: 10,
        message: "This input exceed maxLength."
      } },
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
