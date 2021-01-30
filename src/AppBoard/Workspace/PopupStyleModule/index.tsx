import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Container } from '@material-ui/core';
import {observer} from "mobx-react";
import { PageAction } from 'Base/PageUtils/PageAction';
import { OPEN_PAGE_ACTION, GO_BACK_ACTION } from "Base/PageUtils/ACTIONs";
import { Page } from '../Page';
import { PopupPage } from './PopupPage';
import { IPageJumper } from 'Base/Model/IPageJumper';
import { useMemo } from 'react';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
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
  const appStore = useDragItStore();
  const pageId = /*appStore.pageId ||*/ module.entryPage?.id;
  const [popupPageId, setPopupPageId] = useState<string|undefined>();
  const [pageParams, setPageParams] = useState<IPageJumper>();
  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case OPEN_PAGE_ACTION:
        setPageParams(action.pageJumper)
        setPopupPageId(action.pageJumper?.id);        
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
  let maxWidth = page?.max_width ==='false' ? false : page?.max_width;
  maxWidth = maxWidth === '' || maxWidth === undefined ? 'lg' : maxWidth;

  return (
    <Container className={classes.root} maxWidth = {maxWidth}>
      {
        page &&
        <Page 
          page={page}
          onPageAction = {hanlePageAction}
          pageJumper = {pageParams}
          hideDebug = {!!popupPage}
        />
      }
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
