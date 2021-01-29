import React, { useEffect } from "react";
import {observer} from 'mobx-react';
import { gql, useQuery } from "@apollo/react-hooks";
import { JumpStyleModule } from "./JumpStyleModule";
import { Fragment } from "react";
import { PopupStyleModule } from "./PopupStyleModule";
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useDragItStore, useDesigner } from "Store/Helpers/useDragItStore";
import { useShowAppoloError } from "Store/Helpers/useInfoError";
import { JUMP_STYLE_MODULE, POPUP_STYLE_MODULE } from "Utils/consts";
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
      module_type
      is_drawer_style
      pages{
        id
        name
        max_width
        in_tab_index
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
  const appStore = useDragItStore();
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
        </Fragment>
      }
    </div>
  )
})