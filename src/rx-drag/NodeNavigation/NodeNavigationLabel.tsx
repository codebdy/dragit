import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

export const ComponentTemplate = observer((
  props:{
    className?:string,
    label?:string,
    onClick?:()=>void,
  }
) => {
  const {className, label, onClick} = props;
  return (
    <div 
      className = {classNames('rx-node-navigation-label', className)}
      onClick = {onClick}
    >
      {label}
    <div className = 'label-arrow'></div>
    </div>
  );
})
