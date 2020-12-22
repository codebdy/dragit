import React, { Fragment, useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import { IPage } from 'base/Model/IPage';
import { IMeta } from 'base/Model/IMeta';
import { RXNode } from 'base/RXNode/RXNode';
import { RXNodeRoot } from 'base/RXNode/Root';
import { cloneObject } from 'utils/cloneObject';
import ComponentRender from 'AdminBoard/views/Page/ComponentRender';

export const Page = observer((
  props:{
    page?:IPage
  }
)=>{
  const {page} = props;
  const [pageLayout, setPageLayout] = useState<Array<RXNode<IMeta>>>([]);

  useEffect(()=>{
    const layout = page?.schema?.layout || [];
    let root = new RXNodeRoot<IMeta>();
    root.parse(cloneObject(layout));

    setPageLayout(root.children);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page])
  const formActionHandle = ()=>{

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
              onPageAction={formActionHandle}
              onDirty = {handleDirty}
            />
          )
        })
      }
    </Fragment>
  )
})
