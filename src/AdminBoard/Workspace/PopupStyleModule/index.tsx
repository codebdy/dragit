import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Container } from '@material-ui/core';
import {observer} from "mobx-react-lite";
import { ModuleProps } from '../common/ModuleProps';
import { PageAction, OPEN_PAGE_ACTION, GO_BACK_ACTION } from 'base/PageAction';
import { useAppStore } from 'store/helpers/useAppStore';
import { getModulePageById } from '../common/getModulePageById';
import { Page } from '../Page';
import { PopupPage } from './PopupPage';
import { IPageJumper } from 'base/Model/IPageJumper';
import { useMemo } from 'react';

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
  const [pageId] = useState(appStore.pageId || module.entryPage?.id);
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
  console.log(popupPage, popupPageId);
  const handleClose = ()=>{
    setPopupPageId(undefined);
  }

  return (
    <Container className={classes.root} maxWidth = {page?.maxWidth ==='false' ? false : page?.maxWidth}>
      <Page 
        page={page}
        onPageAction = {hanlePageAction}
        pageParams = {pageParams}
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
