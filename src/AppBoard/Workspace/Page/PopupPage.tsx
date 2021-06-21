import React from 'react';
import {observer} from "mobx-react";
import { IPageAction } from 'Base/Model/IPageAction';
import { Page } from '.';
import PageDialog from '../../../Base/Widgets/PageDialog';
import {PageDrawer} from './PageDrawer';
import { Fragment } from 'react';
import { useAppBoardStore } from 'AppBoard/store/AppBoardStore';
import { GO_BACK_ACTION } from 'Base/PageUtils/ACTIONs';

export const PopupPage = observer((
  props:{
    open: boolean,
    pageJumper?:any,
    onPageAction?: (pageAction:IPageAction)=> void,
    onClose:()=>void
  }
)=>{
  const {open, pageJumper, onPageAction, onClose } = props;
  const isDrawerStyle = pageJumper?.openStyle === 'DRAWER';
  const appBoardStore = useAppBoardStore();
  const page = appBoardStore.getPage(pageJumper?.pageId);
  const handlePageActon =  (action:IPageAction)=>{
    switch (action.name){
      case GO_BACK_ACTION:
        onClose();
        return;
    }
    onPageAction && onPageAction(action);
  }
   return (
    <Fragment>
      {
        <PageDialog
          maxWidth = {page?.maxWidth}
          open={!isDrawerStyle && open}
          onClose={onClose}
          title = {page?.name}
        >
          {
            page && !isDrawerStyle &&
            <Page 
              page={page}
              onPageAction = {handlePageActon}
              pageJumper = {pageJumper}
            />          
          }

        </PageDialog>      
      }{
        
        <PageDrawer
          title = {page?.name}
          onClose = {onClose}
          open={isDrawerStyle && open}
          width = {page?.width}
        >
          {
            isDrawerStyle && page &&
            <Page 
              page={page}
              onPageAction = {handlePageActon}
              pageJumper = {pageJumper}
            />            
          }

        </PageDrawer>
      }
    </Fragment>
  )
})
