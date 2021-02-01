import React from 'react';
import {observer} from "mobx-react";
import { IPageAction } from 'Base/Model/IPageAction';
import { Page } from '.';
import PageDialog from './PageDialog';
import PageDrawer from './PageDrawer';
import { Fragment } from 'react';
import { useAppBoardStore } from 'AppBoard/store/AppBoardStore';

export const PopupPage = observer((
  props:{
    pageJumper?:any,
    onPageAction?: (pageAction:IPageAction)=> void,
    onClose:()=>void,
  }
)=>{
  const {pageJumper, onPageAction, onClose } = props;
  const isDrawerStyle = pageJumper?.openStyle === 'DRAWER';
  const appBoardStore = useAppBoardStore();
  const page = appBoardStore.getPage(pageJumper?.pageId);
   return (
    <Fragment>
      {
        page && !isDrawerStyle &&
        <PageDialog
          maxWidth = {page?.max_width}
          open={!!page}
          onClose={onClose}
          title = {page?.name}
        >
          <Page 
            page={page}
            onPageAction = {onPageAction}
            pageJumper = {pageJumper}
          />
        </PageDialog>      
      }{
        isDrawerStyle && page &&
        <PageDrawer
          title = {page?.name}
          onClose = {onClose}
          open={!!page}
          width = {page?.width}
        >
          <Page 
            page={page}
            onPageAction = {onPageAction}
            pageJumper = {pageJumper}
          />
        </PageDrawer>
      }
    </Fragment>
  )
})
