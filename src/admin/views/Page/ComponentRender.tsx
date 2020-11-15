import React, { Fragment } from 'react';
import { RXElement } from './RXElement';
import { PageActionHandle } from './PageAction';
import { resolveComponent } from 'base/DragRX';

export default function ComponentRender(props:{component:RXElement, formModel:any, onPageAction: PageActionHandle}){
  const {component, formModel, onPageAction} = props;
  const onClickAction = component.meta.props?.onClick;
  const Component = resolveComponent(component.meta);

  const handleOnClick = ()=>{
    if(!onClickAction){
      return
    }
    onPageAction(onClickAction);
  };

  //const field = element.meta.props?.field;
  let metaProps = component.meta.props? component.meta.props :{};
  const {rxText, rule, withActions, ...rest} = metaProps as any;

  let elementProps:any = {...rest,  onClick:handleOnClick}
  //let value = field && formModel && formModel[field];

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
