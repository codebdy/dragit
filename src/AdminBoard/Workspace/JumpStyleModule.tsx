import React, { useState } from 'react';
import {observer} from "mobx-react-lite";
import { useAppStore } from 'store/helpers/useAppStore';
import { getModulePageBySlug } from './common/getModulePageBySlug';
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
  const [pageSlug, setPageSlug] = useState(appStore.pageSlug || module.entryPage?.slug);
  const [pageParams, setPageParams] = useState<IPageJumper>();
  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case OPEN_PAGE_ACTION:
        setPageParams(action.page)        
        setPageSlug(action.page?.pageSlug);
        return;        
      case GO_BACK_ACTION:
        setPageSlug(module.entryPage?.slug);
        return;
    }
  }

  const page = getModulePageBySlug(module, pageSlug);

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
