import React from 'react';
import { makeStyles, Theme, createStyles, Typography, Container, Tabs, Tab } from '@material-ui/core';
import {observer} from "mobx-react-lite";
import { ModuleProps } from '../common/ModuleProps';
import { useState } from 'react';
import { useAppStore } from 'store/helpers/useAppStore';
import { Page } from '../common/Page';
import { PageAction, OPEN_PAGE_ACTION, GO_BACK_ACTION } from 'base/PageAction';
import { getModulePageBySlug } from '../common/getModulePageBySlug';
import { LeftDrawerWidthPlaceholder } from 'AdminBoard/Sidebar/LeftDrawer/LeftDrawerWidthPlaceholder';
import { TabStyleModuleBar } from './TabStyleModuleBar';

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
  const [pageSlug, setPageSlug] = useState(appStore.pageSlug || module.entryPage?.slug);
  const [pageParams, setPageParams] = useState<any>();
  const handleSelectChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelected(newValue);
  };
  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case OPEN_PAGE_ACTION:
        //setPageSlug(action.page?.pageSlug);
        //setPageParams(action.page)
        return;        
      case GO_BACK_ACTION:
        //setPageSlug(module.entryPage?.slug);
        return;
    }
  }
  const page = getModulePageBySlug(module, pageSlug);

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
            <Tab className={classes.tab} label={<Typography variant="subtitle1">文章列表</Typography>} />
            <Tab className={classes.tab} label={<Typography variant="subtitle1">草稿箱</Typography>} />
            <Tab className={classes.tab} label={<Typography variant="subtitle1">分类</Typography>} />
            <Tab className={classes.tab} label={<Typography variant="subtitle1">标签</Typography>} />
          </Tabs>
      </TabStyleModuleBar>
      <LeftDrawerWidthPlaceholder />
      <Container>
        <Page 
          page={page}
          onPageAction = {hanlePageAction}
          pageParams = {pageParams}
        />
      </Container>
    </div>
  )
})
