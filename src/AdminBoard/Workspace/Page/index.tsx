import React, { Fragment, useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import { IPage } from 'base/Model/IPage';
import { IMeta } from 'base/Model/IMeta';
import { RXNode } from 'base/RXNode/RXNode';
import { RXNodeRoot } from 'base/RXNode/Root';
import { cloneObject } from 'utils/cloneObject';
import ComponentRender from 'AdminBoard/views/Page/ComponentRender';
import { PageAction, SUBMIT_ACTION, SUBMIT_AND_NOT_CLOSE_ACTION } from 'base/PageAction';

export const Page = observer((
  props:{
    page?:IPage,
    pageParams?:any,
    onPageAction?: (pageAction:PageAction)=> void,
  }
)=>{
  const {page, /*pageParams,*/ onPageAction} = props;
  const [pageLayout, setPageLayout] = useState<Array<RXNode<IMeta>>>([]);

  useEffect(()=>{
    const layout = page?.schema?.layout || [];
    let root = new RXNodeRoot<IMeta>();
    root.parse(cloneObject(layout));

    setPageLayout(root.children);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page])
  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case SUBMIT_ACTION:
        //setCloseAfterSubmit(true);
        //setSubmit(true);
        //isDirty.value = false;
        return;
      
      case SUBMIT_AND_NOT_CLOSE_ACTION:
        //setCloseAfterSubmit(false);
        //setSubmit(true);
        //isDirty.value = false;
        return;
    }

    onPageAction && onPageAction(action);
  }


  const handleDirty = ()=>{

  }
  return (
    <Fragment>
      {
        pageLayout?.map((child:RXNode<IMeta>)=>{
          return (
            <ComponentRender 
              key={child.id} 
              component={child} 
              onPageAction={hanlePageAction}
              onDirty = {handleDirty}
            />
          )
        })
      }
    </Fragment>
  )
})
