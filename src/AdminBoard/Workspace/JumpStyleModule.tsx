import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import { Fragment } from 'react';
import { useAppStore } from 'store/helpers/useAppStore';
import { getModulePageBySlug } from './common/getModulePageBySlug';
import { cloneObject } from 'utils/cloneObject';
import ComponentRender from 'AdminBoard/views/Page/ComponentRender';
import { IMeta } from 'base/Model/IMeta';
import { RXNode } from 'base/RXNode/RXNode';
import { RXNodeRoot } from 'base/RXNode/Root';
import { ModuleProps } from './common/ModuleProps';

export const JumpStyleModule = observer((
  props:ModuleProps
)=>{
  const {module} = props;
  const appStore = useAppStore();
  const [pageSlug/*, setPageSlug*/] = useState(appStore.pageSlug || module.entryPage?.slug);
  const [pageLayout, setPageLayout] = useState<Array<RXNode<IMeta>>>([]);

  useEffect(()=>{
    const layout = getModulePageBySlug(module, pageSlug)?.schema?.layout || [];
    let root = new RXNodeRoot<IMeta>();
    root.parse(cloneObject(layout));

    setPageLayout(root.children);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageSlug])

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
