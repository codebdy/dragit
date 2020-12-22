import React, { useState } from 'react';
import {observer} from "mobx-react-lite";
import { useAppStore } from 'store/helpers/useAppStore';
import { getModulePageBySlug } from './common/getModulePageBySlug';
import { ModuleProps } from './common/ModuleProps';
import { Page } from './common/Page';
import { GO_BACK_ACTION, JUMP_TO_PAGE_ACTION, PageAction } from 'base/PageAction';

export const JumpStyleModule = observer((
  props:ModuleProps
)=>{
  const {module} = props;
  const appStore = useAppStore();
  const [pageSlug, setPageSlug] = useState(appStore.pageSlug || module.entryPage?.slug);
  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case JUMP_TO_PAGE_ACTION:
        setPageSlug(action.pageSlug);
        return;        
      case GO_BACK_ACTION:
        setPageSlug(module.entryPage?.slug);
        return;
    }
  }

  return (
    <Page 
      page={getModulePageBySlug(module, pageSlug)}
      onPageAction = {hanlePageAction}
    />
  )
})
