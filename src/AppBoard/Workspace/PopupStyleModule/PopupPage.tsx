import React from 'react';
import {observer} from "mobx-react";
import { PageAction } from 'Base/PageUtils/PageAction';
import { Page } from '../Page';
import PageDialog from './PageDialog';
import PageDrawer from './PageDrawer';
import { IRxPage } from 'Base/Model/IRxPage';
import { Fragment } from 'react';

export const PopupPage = observer((
  props:{
    page?:IRxPage, 
    pageParams?:any,
    onPageAction?: (pageAction:PageAction)=> void,
    onClose:()=>void,
    isDrawerStyle?:boolean
  }
)=>{
  const {page, pageParams, onPageAction, onClose, isDrawerStyle} = props;

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
            pageJumper = {pageParams}
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
            pageJumper = {pageParams}
          />
        </PageDrawer>
      }
    </Fragment>
  )
})
