import React from 'react';
import { resolveNode } from 'designer/Core/resoveNode';
import { RXElement } from './RXElement';

export default function ElementRender(props:{element:RXElement}){
  const {element} = props;

  const Element = resolveNode(element.meta.name);

  return(
    <Element {...element.meta.props}>
      {element.meta.text}
      {element.children?.map((child: RXElement)=>{
        return (
          <ElementRender key={child.id} element={child} />
        )
      })}
    </Element>
  )
}
