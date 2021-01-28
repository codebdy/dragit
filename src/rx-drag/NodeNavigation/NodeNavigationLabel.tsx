import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

export const NodeNavigationLabel = observer((
  props:{
    className?:string,
    onClick?:()=>void,
    children?:string|JSX.Element
  }
) => {
  const {className, children, onClick} = props;
  return (
    <div 
      className = {classNames('rx-node-navigation-label', className)}
      onClick = {onClick}
    >
      {children}
    <div className = 'label-arrow'></div>
    </div>
  );
})
