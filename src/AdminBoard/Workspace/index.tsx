import React, { useEffect } from "react";
import {observer} from 'mobx-react';
import { gql, useQuery } from "@apollo/react-hooks";
import { JumpStyleModule } from "./JumpStyleModule";
import { Fragment } from "react";
import { PopupStyleModule } from "./PopupStyleModule";
import { TabStyleModule } from "./TabStyleModule";
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import { PageEditor } from "Design/PageEditor";
import { useAppStore, useDesigner } from "Store/Helpers/useAppStore";
import { useShowAppoloError } from "Store/Helpers/useInfoError";
import { JUMP_STYLE_MODULE, POPUP_STYLE_MODULE, TAB_STYLE_MODULE } from "Utils/consts";
import ModuleSkeleton from "./Common/ModuleSkeleton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      flexFlow:'column',
      background:theme.palette.background.default,
      color:theme.palette.text.primary,
    },
  }),
);

const QUERY_MODULE = gql`
  query ($slug: String!){
    moduleBySlug(slug:$slug){
      id
      slug
      name
      moduleType:module_type
      isDrawerStyle:is_drawer_style
      pages{
        id
        name
        maxWidth:max_width
        inTabIndex:in_tab_index
        width
        schema
        auths
      }
      entryPage{
        id
      }
    }
  }
`;

export const Workspace = observer(()=>{
  const appStore = useAppStore();
  const designer = useDesigner();

  const classes = useStyles();
  
  const { loading, error, data } = useQuery(QUERY_MODULE, {variables:{slug:appStore.moduleSlug}});
  useShowAppoloError(error);

  useEffect(()=>{
    appStore.setModule(data?.moduleBySlug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  const module = appStore.module;

  return (
    <div className = {classes.root}>
      {
        loading?
        <Container><ModuleSkeleton /></Container>
        :
        <Fragment>
          {
            module?.moduleType === JUMP_STYLE_MODULE &&
            <JumpStyleModule module={module} />
          }
          {
            module?.moduleType === POPUP_STYLE_MODULE &&
            <PopupStyleModule module={module} />
          }
          {
            module?.moduleType === TAB_STYLE_MODULE &&
            <TabStyleModule module={module} />
          }
        </Fragment>
      }
      {
        designer.pageId &&
        <PageEditor pageId = {designer.pageId} onClose={()=>{designer.close()}} />        
      }
    </div>
  )
})