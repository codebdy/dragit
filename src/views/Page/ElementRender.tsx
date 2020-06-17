import React from 'react';
import { resolveNode } from 'designer/Core/resoveNode';
import { RXElement } from './RXElement';

export default function ElementRender(props:{element:RXElement}){
  const {element} = props;

  return(React.createElement(
    resolveNode(element.meta.name),
    {
      ...element.meta.props
    },
    element.children?.map((child: RXElement)=>{
      return (
        <ElementRender key={child.id} element={child} />
      )
    })
    )
  )
}
