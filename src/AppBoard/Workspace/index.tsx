import React from "react";
import {observer} from 'mobx-react';
import {Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useAppBoardStore } from "AppBoard/store/AppBoardStore";
import { useRouteMatch } from "react-router-dom";
import { Page } from "./Page";
import { IRxPage } from "Base/Model/IRxPage";

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
  const match = useRouteMatch();
  const{pageId, id} = match.params as any;
  const newPageId = pageId ? pageId : appboardStore?.rxApp?.entry_page_id;
  let page:IRxPage = undefined as any;

  appboardStore?.rxApp?.pages?.forEach(pg=>{
    if(pg.id === newPageId){
      page = pg;
    }
  })

  const hanlePageAction = ()=>{
    
  }

  return (
    <div className = {classes.root}>      
      {
        page &&
        <Container className={classes.container} maxWidth = {page?.max_width ==='false' ? false : page?.max_width}>
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