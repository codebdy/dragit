import React from "react";
import {observer} from 'mobx-react';
import {Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useAppBoardStore } from "AppBoard/store/AppBoardStore";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Page } from "./Page";
import { IPageAction } from "Base/Model/IPageAction";
import { GO_BACK_ACTION, OPEN_PAGE_ACTION } from "Base/PageUtils/ACTIONs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      flexFlow:'column',
      background:theme.palette.background.default,
      color:theme.palette.text.primary,
    },
    container:{
      flex: '1',
      display:'flex',
      flexFlow:'column',
    }
  }),
);


export const Workspace = observer(()=>{
  const appboardStore = useAppBoardStore();
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const{pageId, id} = match.params as any;
  const newPageId = pageId ? pageId : appboardStore?.rxApp?.entry_page_id;
  let page = appboardStore?.getPage(newPageId);

  const hanlePageAction = (action:IPageAction)=>{
    switch (action.name){
      case OPEN_PAGE_ACTION:
        console.assert(action.pageJumper?.openStyle === 'JUMP', '页面未处理非跳转打开页面名');
        history.push(`/app/${appboardStore.rxApp?.id}/${action.pageJumper?.pageId}/${action.pageJumper?.dataId}`)
        return;        
      case GO_BACK_ACTION:
        history.goBack();
        return;
    }
  }

  let maxWidth = page?.max_width ==='false' ? false : page?.max_width;

  maxWidth = maxWidth === '' || maxWidth === undefined ? 'lg' : maxWidth;

  return (
    <div className = {classes.root}>      
      {
        page &&
        <Container className={classes.container} maxWidth = {maxWidth}>
          <Page 
            page={page}
            onPageAction = {hanlePageAction}
            pageJumper = {{pageId:newPageId, dataId:id}}
          />
        </Container>
      }    
    </div>
  )
})