import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Container } from '@material-ui/core';
import {observer} from "mobx-react-lite";
import { ModuleProps } from '../common/ModuleProps';
import { PageAction, OPEN_PAGE_ACTION, GO_BACK_ACTION } from 'base/PageAction';
import { useAppStore } from 'store/helpers/useAppStore';
import { getModulePageBySlug } from '../common/getModulePageBySlug';
import { Page } from '../Page';
import { PopupPage } from './PopupPage';
import { IPageJumper } from 'base/Model/IPageJumper';

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
  const [pageSlug] = useState(appStore.pageSlug || module.entryPage?.slug);
  const [popupSlug, setPopupSlug] = useState<string|undefined>();
  const [pageParams, setPageParams] = useState<IPageJumper>();
  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case OPEN_PAGE_ACTION:
        setPageParams(action.page)
        setPopupSlug(action.page?.pageSlug);        
        return;        
      case GO_BACK_ACTION:
        setPopupSlug(undefined);
        return;
    }
  }

  const page = getModulePageBySlug(module, pageSlug);
  const popupPage = getModulePageBySlug(module, popupSlug);
  const handleClose = ()=>{
    setPopupSlug(undefined);
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
