import React, { Fragment } from 'react';
import { resolveNode } from 'designer/Core/resoveNode';
import { RXElement } from './RXElement';
import { FormActionHandle } from './FormAction';

export default function ElementRender(props:{element:RXElement, formik:any, onFormAction: FormActionHandle}){
  const {element, formik, onFormAction} = props;
  const onClickAction = element.meta.props?.onClick;
  const Element = resolveNode(element.meta.name);
  const handleOnClick = ()=>{
    if(!onClickAction){
      return
    }
    onFormAction(onClickAction);
  }

  return(
    <Fragment>
    {(element.children && element.children.length > 0) || element.meta.text ?
      (<Element {...element.meta.props} onClick = {handleOnClick}>
        {element.meta.text}
        {element.children?.map((child: RXElement)=>{
          return (
            <ElementRender key={child.id} element={child} formik={formik} onFormAction={onFormAction}/>
          )
        })}
      </Element>)
      :
      <Element {...element.meta.props} />
    }
    </Fragment>
  )
}
