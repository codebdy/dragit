import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import { useAppStore } from 'store/helpers/useAppStore';
import { getModulePageById } from './common/getModulePageById';
import { ModuleProps } from './common/ModuleProps';
import { Page } from './Page';
import { GO_BACK_ACTION, OPEN_PAGE_ACTION, PageAction } from 'base/PageAction';
import { makeStyles, Theme, createStyles, Container } from '@material-ui/core';
import { IPageJumper } from 'base/Model/IPageJumper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1',
      display:'flex',
      flexFlow:'column',
    },

  }),
);

export const JumpStyleModule = observer((
  props:ModuleProps
)=>{
  const {module} = props;
  const classes = useStyles();
  const appStore = useAppStore();
  const [pageId, setPageId] = useState(appStore.pageId || module.entryPage?.id);
  const [pageParams, setPageParams] = useState<IPageJumper>();
  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case OPEN_PAGE_ACTION:
        setPageParams(action.page)        
        setPageId(action.page?.pageId);
        return;        
      case GO_BACK_ACTION:
        setPageId(module.entryPage?.id);
        return;
    }
  }

  useEffect(()=>{
    setPageId(appStore.pageId || module.entryPage?.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[module]);

  const page = getModulePageById(module, pageId);

  return (
    <Container className={classes.root} maxWidth = {page?.maxWidth ==='false' ? false : page?.maxWidth}>
      <Page 
        page={page}
        onPageAction = {hanlePageAction}
        pageParams = {pageParams}
      />
    </Container>
  )
})
