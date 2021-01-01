import React from 'react';
import { makeStyles, Theme, createStyles, Typography, Container, Tabs, Tab } from '@material-ui/core';
import {observer} from "mobx-react-lite";
import { ModuleProps } from '../common/ModuleProps';
import { useState } from 'react';
import { useAppStore } from 'store/helpers/useAppStore';
import { Page } from '../Page';
import { PageAction, OPEN_PAGE_ACTION, GO_BACK_ACTION } from 'base/PageAction';
import { getModulePageById } from '../common/getModulePageById';
import { LeftDrawerWidthPlaceholder } from 'AdminBoard/Sidebar/LeftDrawer/LeftDrawerWidthPlaceholder';
import { TabStyleModuleBar } from './TabStyleModuleBar';
import { useEffect } from 'react';
import { PopupPage } from '../PopupStyleModule/PopupPage';
import { IPageJumper } from 'base/Model/IPageJumper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex:1,
      flexFlow:'column'
    },
    moduleTitle:{
      alignSelf:"stretch",
      display:'flex',
      alignItems:'center',
      fontSize:'1.5rem',
    },
    tabs:{
      marginLeft: theme.spacing(2),
    },
    tab:{
      padding: theme.spacing(0, 2),
      minWidth:'80px',
    }
  }),
);

export const TabStyleModule = observer((
  props:ModuleProps
)=>{
  const {module} = props;
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const appStore = useAppStore();
  const [pageSlug, setPageSlug] = useState(appStore.pageId || module.entryPage?.slug);
  const [popupSlug, setPopupSlug] = useState<string|undefined>();
  const [pageParams, setPageParams] = useState<IPageJumper>();

  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case OPEN_PAGE_ACTION:
        setPageParams(action.page);
        setPopupSlug(action.page?.pageSlug);
        return;        
      case GO_BACK_ACTION:
        setPopupSlug(undefined);
        return;
    }
  }
  const popupPage = getModulePageById(module, popupSlug);
  const handleClose = ()=>{
    setPopupSlug(undefined);
  }

  const page = getModulePageById(module, pageSlug);

  const indexPages = module?.pages?.filter(page=>page.inTabIndex) || []
  useEffect(()=>{
    if(!indexPages){
      return;
    }
    for(var i = 0; i < indexPages?.length; i++){
      if(indexPages[i].id === module.entryPage?.id){
        setSelected(i);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleSelectChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelected(newValue);
    setPageSlug(indexPages[newValue].slug);
  };
  return (
    <div className={classes.root}>
      <TabStyleModuleBar>
       <div className={classes.moduleTitle}>{module.name}</div>
          <Tabs 
            value={selected} 
            onChange={handleSelectChange}
            indicatorColor = "primary"
            className = {classes.tabs}
          >
            {
              indexPages?.map(page=>{
                return (
                  <Tab key={page.id} className={classes.tab} label={<Typography variant="subtitle1">{page.name}</Typography>} />
                )
              })
            }
          </Tabs>
      </TabStyleModuleBar>
      <LeftDrawerWidthPlaceholder />
      <Container>
        <Page 
          page={page}
          onPageAction = {hanlePageAction}
        />
        <PopupPage 
          page = {popupPage}
          isDrawerStyle = {module.isDrawerStyle} 
          onPageAction = {hanlePageAction}
          pageParams = {pageParams}
          onClose={handleClose}
        />
      </Container>
    </div>
  )
})
