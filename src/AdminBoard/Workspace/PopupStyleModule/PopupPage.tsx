import React from 'react';
import {observer} from "mobx-react-lite";
import { PageAction } from 'Base/PageAction';
import { Page } from '../Page';
import PageDialog from './PageDialog';
import PageDrawer from './PageDrawer';
import { IPage } from 'Base/Model/IPage';
import { Fragment } from 'react';

export const PopupPage = observer((
  props:{
    page?:IPage, 
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
          maxWidth = {page?.maxWidth}
          open={!!page}
          onClose={onClose}
          title = {page?.name}
        >
          <Page 
            page={page}
            onPageAction = {onPageAction}
            pageParams = {pageParams}
          />
        </PageDialog>      
      }{
        isDrawerStyle&&
        <PageDrawer
          title = {page?.name}
          onClose = {onClose}
          open={!!page}
          width = {page?.width}
        >
          <Page 
            page={page}
            onPageAction = {onPageAction}
            pageParams = {pageParams}
          />
        </PageDrawer>
      }
    </Fragment>
  )
})
