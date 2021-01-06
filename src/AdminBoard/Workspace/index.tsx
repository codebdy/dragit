import React, { useEffect } from "react";
import {observer} from 'mobx-react-lite';
import { useAppStore, useDesigner, useLeftDrawer } from "store/helpers/useAppStore";
import { gql, useQuery } from "@apollo/react-hooks";
import PageSkeleton from "AdminBoard/Workspace/common/ModuleSkeleton";
import { JUMP_STYLE_MODULE, POPUP_STYLE_MODULE, TAB_STYLE_MODULE } from "utils/consts";
import { JumpStyleModule } from "./JumpStyleModule";
import { Fragment } from "react";
import { PopupStyleModule } from "./PopupStyleModule";
import { TabStyleModule } from "./TabStyleModule";
import { Container, createStyles, Fab, Hidden, makeStyles, Theme } from "@material-ui/core";
import { useShowAppoloError } from "store/helpers/useInfoError";
import { PageEditor } from "design/PageEditor";
import MdiIcon from "components/common/MdiIcon";
import { useLoggedUser } from "store/helpers/useLoggedUser";
import { AUTH_DEBUG } from "base/authSlugs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      flexFlow:'column',
      background:theme.palette.background.default,
      color:theme.palette.text.primary,
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      //left: '280px',
      zIndex:theme.zIndex.snackbar + 1,
      transition:'left 0.3s',
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
  const leftDrawer = useLeftDrawer();
  const classes = useStyles();
  const loggedUser = useLoggedUser();
  const { loading, error, data } = useQuery(QUERY_MODULE, {variables:{slug:appStore.moduleSlug}});
  useShowAppoloError(error);

  useEffect(()=>{
    appStore.setModule(data?.moduleBySlug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  const module = appStore.module;

  const fabLeft = leftDrawer.isMini ? leftDrawer.compactWidth : leftDrawer.fullWidth;

  return (
    <div className = {classes.root}>
      {
        loading?
        <Container><PageSkeleton /></Container>
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
      {
        loggedUser.authCheck(AUTH_DEBUG)&&
        <Hidden smDown>
          <Fab className={classes.fab} size="small" aria-label="GraphQL Debug" style={{left:(fabLeft + 8) + 'px'}}>
            <MdiIcon iconClass="mdi-graphql" color={'#e10098'} />
          </Fab>
        </Hidden>      
      }

    </div>
  )
})