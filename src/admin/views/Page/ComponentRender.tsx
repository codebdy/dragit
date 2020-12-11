import React, { Fragment } from 'react';
import { RXNode } from '../../../base/RXNode/RXNode';
import { PageActionHandle } from '../../../base/PageAction';
import { resolveComponent } from 'base/DragRX';
import withFormField from './withFormField';
import { IMeta } from 'base//Model/IMeta';
import { makeSpaceStyle } from 'base/HOCs/withMargin';

export default function ComponentRender(
  props:{
    component:RXNode<IMeta>, 
    onPageAction: PageActionHandle,
    onDirty:()=>void,
  }){
  const {component, onPageAction, onDirty} = props;
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
  const {
    rxText, 
    withActions,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    style, 
    ...rest
  } = metaProps as any;

  let elementProps:any = {
    ...rest,
    style:{
      ...style,
      marginTop: makeSpaceStyle(marginTop),
      marginRight: makeSpaceStyle(marginRight),
      marginBottom: makeSpaceStyle(marginBottom),
      marginLeft: makeSpaceStyle(marginLeft),
    },
    onClick:handleOnClick
  }

  if(component.meta.props?.field){
    elementProps.onDirty = onDirty;
  }

  if(withActions){
    elementProps.onAction = onPageAction;
  }

  const elementView = (component.children && component.children.length > 0) || rxText ?
    (<Component {...elementProps}>
      {rxText}
      {component.children?.map((child: RXNode<IMeta>)=>{
        return (
          <ComponentRender key={child.id} component={child} onPageAction={onPageAction} onDirty = {onDirty}/>
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
