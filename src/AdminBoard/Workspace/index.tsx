import React, { useEffect } from "react";
import {observer} from 'mobx-react-lite';
import gql from 'graphql-tag';
import { useAppStore } from "store/helpers/useAppStore";
import { useQuery } from "@apollo/react-hooks";
import PageSkeleton from "AdminBoard/Workspace/common/ModuleSkeleton";
import { DRAWER_STYLE_MODULE, JUMP_STYLE_MODULE, POPUP_STYLE_MODULE, TAB_STYLE_MODULE } from "utils/consts";
import { JumpStyleModule } from "./JumpStyleModule";
import { Fragment } from "react";
import { PopupStyleModule } from "./PopupStyleModule";
import { DrawerStyleModule } from "./DrawerStyleModule";
import { TabStyleModule } from "./TabStyleModule";
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";

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
      moduleType
      pages{
        id
        slug
        name
        maxWidth
        schema
        auths
      }
      entryPage{
        slug
      }
    }
  }
`;

export const Workspace = observer(()=>{
  const appStore = useAppStore();
  const classes = useStyles()
  const { loading, error, data } = useQuery(QUERY_MODULE, {variables:{slug:appStore.moduleSlug}});

  useEffect(()=>{
    appStore.setErrorMessage(error?.message)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error])

  const module = data?.moduleBySlug;
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
            module?.moduleType === DRAWER_STYLE_MODULE &&
            <DrawerStyleModule module={module} />
          }
          {
            module?.moduleType === TAB_STYLE_MODULE &&
            <TabStyleModule module={module} />
          }
        </Fragment>
      }
    </div>
  )
})