import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react";
import { Page } from './Page';
import { PageAction } from 'Base/PageUtils/PageAction';
import { GO_BACK_ACTION, OPEN_PAGE_ACTION } from "Base/PageUtils/ACTIONs";
import { makeStyles, Theme, createStyles, Container } from '@material-ui/core';
import { IPageJumper } from 'Base/Model/IPageJumper';
import { getModulePageById } from './Common/getModulePageById';
import { useAppStore } from 'Store/Helpers/useAppStore';
import { ModuleProps } from './Common/ModuleProps';
import { Fragment } from 'react';

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
      {
        page 
        ? <Page 
            page={page}
            onPageAction = {hanlePageAction}
            pageJumper = {pageParams}
          />
        :<Fragment></Fragment>      
      }

    </Container>
  )
})
