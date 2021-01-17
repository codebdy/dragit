import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Container } from '@material-ui/core';
import {observer} from "mobx-react";
import { PageAction } from 'Base/Action/PageAction';
import { OPEN_PAGE_ACTION, GO_BACK_ACTION } from "Base/Action/ACTIONs";
import { Page } from '../Page';
import { PopupPage } from './PopupPage';
import { IPageJumper } from 'Base/Model/IPageJumper';
import { useMemo } from 'react';
import { useAppStore } from 'Store/Helpers/useAppStore';
import { getModulePageById } from '../Common/getModulePageById';
import { ModuleProps } from '../Common/ModuleProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'flex',
      flexFlow:'column',
    },
  }),
);


export const PopupStyleModule = observer((
  props:ModuleProps
)=>{
  const {module} = props;
  const classes = useStyles();
  const appStore = useAppStore();
  const pageId = appStore.pageId || module.entryPage?.id;
  const [popupPageId, setPopupPageId] = useState<string|undefined>();
  const [pageParams, setPageParams] = useState<IPageJumper>();
  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case OPEN_PAGE_ACTION:
        setPageParams(action.page)
        setPopupPageId(action.page?.id);        
        return;        
      case GO_BACK_ACTION:
        setPopupPageId(undefined);
        return;
    }
  }

  const page = useMemo(()=>getModulePageById(module, pageId),[module, pageId]);
  const popupPage = useMemo(()=>getModulePageById(module, popupPageId),[module, popupPageId]);
  const handleClose = ()=>{
    setPopupPageId(undefined);
  }

  return (
    <Container className={classes.root} maxWidth = {page?.maxWidth ==='false' ? false : page?.maxWidth}>
      <Page 
        page={page}
        onPageAction = {hanlePageAction}
        pageParams = {pageParams}
        hideDebug = {!!popupPage}
      />
      <PopupPage 
        page = {popupPage}
        isDrawerStyle = {module.isDrawerStyle} 
        onPageAction = {hanlePageAction}
        pageParams = {pageParams}
        onClose={handleClose}
      />
    </Container>
  )
})
