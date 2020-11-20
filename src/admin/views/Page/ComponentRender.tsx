import React, { Fragment } from 'react';
import { RXComponent } from '../../../base/RXComponent';
import { PageActionHandle } from './PageAction';
import { resolveComponent } from 'base/DragRX';
import withFormField from './withFormField';

export default function ComponentRender(props:{component:RXComponent, onPageAction: PageActionHandle}){
  const {component, onPageAction} = props;
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
  const {rxText, withActions, ...rest} = metaProps as any;

  let elementProps:any = {...rest,  onClick:handleOnClick}

  if(withActions){
    elementProps.onAction = onPageAction;
  }

  const elementView = (component.children && component.children.length > 0) || rxText ?
    (<Component {...elementProps}>
      {rxText}
      {component.children?.map((child: RXComponent)=>{
        return (
          <ComponentRender key={child.id} component={child} onPageAction={onPageAction}/>
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
