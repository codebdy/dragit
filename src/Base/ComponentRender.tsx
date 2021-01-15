import React, { Fragment } from 'react';
import { RXNode } from './RXNode/RXNode';
import { resolveComponent } from 'Base/RxDrag';
import { IMeta } from 'Base/Model/IMeta';
import { makeSpaceStyle } from 'Base/HOCs/withMargin';
import { useLoggedUser } from 'Store/Helpers/useLoggedUser';
import { useActionStore } from './PageUtlis/ActionStore';
import { useAppStore } from 'Store/Helpers/useAppStore';

export function ComponentRender(
  props:{
    component:RXNode<IMeta>
  }){
  const {component} = props;
  const loggedUser = useLoggedUser();
  const onClickAction = component.meta.props?.onClick;
  let Component = resolveComponent(component.meta);

  const appStore = useAppStore();
  const actionStore = useActionStore();
  
  const handleOnClick = ()=>{
    if(onClickAction){
      if(onClickAction.confirmMessage){
        appStore.confirmAction(onClickAction.confirmMessage, ()=>{
          actionStore?.emit(onClickAction);
        })
      }
      else{
        actionStore?.emit(onClickAction);
      }    
    }
  };

  const authChecked = ()=>{
    //如果不设置权限，则所有用户可见
    if(!component.meta.auths || component.meta.auths.length === 0){
      return true;
    }
    return loggedUser?.authCheck(...component.meta.auths||[]);
  }

  let metaProps = component.meta.props? component.meta.props :{};
  const {
    rxText, 
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    style, 
    ...rest
  } = metaProps as any;

  let elementProps:any = {
    'data-rxid':`rx-${component.id}`,
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

  if(component.meta.selfRenderChildren){
    elementProps.childrenNodes = component.children;
  }

  let elementView:any = ((component.children && component.children.length > 0) || rxText)&& !component.meta.selfRenderChildren ?
    (<Component {...elementProps}>
      {rxText}
      {component.children?.map((child: RXNode<IMeta>)=>{
        return (
          <ComponentRender key={child.id} component={child} />
        )
      })}
    </Component>)
    :
    <Component {...elementProps} />

  elementView = authChecked() ? elementView : undefined; 
  return(
    <Fragment>
      { elementView }
    </Fragment>
  )
}
