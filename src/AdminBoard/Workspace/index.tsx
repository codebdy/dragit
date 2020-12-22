import React, { useEffect } from "react";
import { makeStyles, createStyles, Theme, Container } from "@material-ui/core";
import {observer} from 'mobx-react-lite';
import gql from 'graphql-tag';
import { useAppStore } from "store/helpers/useAppStore";
import { useQuery } from "@apollo/react-hooks";
import PageSkeleton from "AdminBoard/Workspace/ModuleSkeleton";
import { DRAWER_STYLE_MODULE, JUMP_STYLE_MODULE, POPUP_STYLE_MODULE, TAB_STYLE_MODULE } from "utils/consts";
import { JumpStyleModule } from "./JumpStyleModule";
import { Fragment } from "react";
import { PopupStyleModule } from "./PopupStyleModule";
import { DrawerStyleModule } from "./DrawerStyleModule";
import { TabStyleModule } from "./TabStyleModule";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1',
      display:'flex',
      flexFlow:'column',
    },

  }),
);

const QUERY_MODULE = gql`
  query ($slug: String!){
    moduleBySlug(slug:$slug){
      id
      slug
      name
      moduleType
      maxWidth
      pages{
        id
        slug
        name
        schema
        auths
      }
      entryPage{
        id
        slug
      }
    }
  }
`;

export const Workspace = observer(()=>{
  const classes = useStyles();
  const appStore = useAppStore();
  const { loading, error, data } = useQuery(QUERY_MODULE, {variables:{slug:appStore.moduleSlug}});

  useEffect(()=>{
    appStore.setErrorMessage(error?.message)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error])

  console.log('Workspace', data, appStore.moduleSlug)
  const module = data?.moduleBySlug;
  return (
    <Container className={classes.root} maxWidth = {module?.maxWidth ==='false' ? false : module?.maxWidth}>
    {
      loading?
      <PageSkeleton />
      :
      <Fragment>
        {
          data?.moduleBySlug?.moduleType === JUMP_STYLE_MODULE &&
          <JumpStyleModule module={data?.moduleBySlug} />
        }
        {
          data?.moduleBySlug?.moduleType === POPUP_STYLE_MODULE &&
          <PopupStyleModule module={data?.moduleBySlug} />
        }
        {
          data?.moduleBySlug?.moduleType === DRAWER_STYLE_MODULE &&
          <DrawerStyleModule module={data?.moduleBySlug} />
        }
        {
          data?.moduleBySlug?.moduleType === TAB_STYLE_MODULE &&
          <TabStyleModule module={data?.moduleBySlug} />
        }
      </Fragment>
    }
    </Container>
  )
})