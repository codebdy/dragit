import React, { useState } from 'react';
import {observer} from "mobx-react-lite";
import { useAppStore } from 'store/helpers/useAppStore';
import { getModulePageBySlug } from './common/getModulePageBySlug';
import { ModuleProps } from './common/ModuleProps';
import { Page } from './common/Page';

export const JumpStyleModule = observer((
  props:ModuleProps
)=>{
  const {module} = props;
  const appStore = useAppStore();
  const [pageSlug/*, setPageSlug*/] = useState(appStore.pageSlug || module.entryPage?.slug);


  return (
    <Page page={getModulePageBySlug(module, pageSlug)} />
  )
})
