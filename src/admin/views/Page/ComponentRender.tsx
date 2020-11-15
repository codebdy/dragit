import React, { Fragment } from 'react';
import { RXElement } from './RXElement';
import { PageActionHandle } from './PageAction';
import { resolveComponent } from 'base/DragRX';
import withFormField from './withFormField';

export default function ComponentRender(props:{component:RXElement, formModel:any, onPageAction: PageActionHandle}){
  const {component, formModel, onPageAction} = props;
  const onClickAction = component.meta.props?.onClick;
  let Component = resolveComponent(component.meta);
  Component = component.meta.props?.field ? withFormField(Component) : Component;
  const handleOnClick = ()=>{
    if(!onClickAction){
      return
    }
    onPageAction(onClickAction);
  };

  let metaProps = component.meta.props? component.meta.props :{};
  const {rxText, rule, withActions, ...rest} = metaProps as any;

  let elementProps:any = {...rest,  onClick:handleOnClick}

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
