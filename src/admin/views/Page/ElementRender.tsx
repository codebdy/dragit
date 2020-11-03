import React, { Fragment } from 'react';
import { resolveNode } from 'components/resoveNode';
import { RXElement } from './RXElement';
import { PageActionHandle } from './PageAction';

export default function ElementRender(props:{element:RXElement, formik:any, onPageAction: PageActionHandle}){
  const {element, formik, onPageAction} = props;
  const onClickAction = element.meta.props?.onClick;
  const Element = resolveNode(element.meta.name);
  const handleOnClick = ()=>{
    if(!onClickAction){
      return
    }
    onPageAction(onClickAction);
  };

  //const field = element.meta.props?.field;

  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = formik;
  let metaProps = element.meta.props? element.meta.props :{};
  const {rxText, field, withActions, ...rest} = metaProps as any;

  let elementProps:any = {...rest,  onClick:handleOnClick}
  const value = field && values && values[field];

  if(field){
    elementProps = {
      ...elementProps,
      name: field,
      value: value || '',
      onChange:  (e:any)=>{
        //console.log('eeee',e, e.id, e.name)
        //解决警告 Formik called `handleChange`, but you forgot to pass an `id` or `name` attribute to your input:undefined
        //if(e.id || e.name){
          handleChange(e)          
        //}
      },
      error:   errors[field] && touched[field],
      onBlur:  (e:any)=>{
        e.target.id = field
        handleBlur(e)
      }
      ,
      helperText: (errors[field] && touched[field]) && errors[field],
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
          <ElementRender key={child.id} element={child} formik={formik} onPageAction={onPageAction}/>
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
