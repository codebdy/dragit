import React, { Fragment, useEffect, useState } from "react";
import ComponentRender from "./ComponentRender";
import { RXNode } from "../../../base/RXNode/RXNode";
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Container } from "@material-ui/core";
import PageSkeleton from "./PageSkeleton";
import { GO_BACK_ACTION, JUMP_TO_PAGE_ACTION, PageAction } from './PageAction';

import usePageMeta from "./usePageMeta";
import usePageModel from "./useFecthPageModel";
import { useDispatch } from "react-redux";
import { setDesingerPageAction } from "store/designer/actions";
import { IMeta } from "base//Model/IMeta";
import { RXNodeRoot } from "base/RXNode/Root";
import { resolvePageUrl } from "utils/resolvePageUrl";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "base/Hooks/useAxios";
import { API_SUBMIT_MODEL } from "APIs/model";
import { setModelAction } from "store/page/actions";
import PageForm from "./Form/PageForm";

const PageView = ()=>{
  const history =  useHistory();
  const match = useRouteMatch();
  const{moduleSlug, pageSlug, id} = match.params as any;

  const [pageLayout, setPageLayout] = useState<Array<RXNode<IMeta>>>([]);
  const [pageMeta, loadingPage, error] = usePageMeta(moduleSlug, pageSlug,);
  const [submitRequest, setSubmitRequest] = useState<AxiosRequestConfig>();
  const [submitResult/*, submiting*/] = useAxios(submitRequest, true);

  usePageModel(pageMeta?.jsonSchema, id);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('PageView useEffect:', moduleSlug, pageSlug, id, pageMeta);
    if(!id){
      dispatch(setModelAction(undefined));
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[moduleSlug, pageSlug, id]);
  
  useEffect(()=>{
    if(pageMeta){
      let schema = pageMeta.jsonSchema?.layout;
      let root = new RXNodeRoot<IMeta>();
      root.parse(schema);
      setPageLayout(root.children);
      dispatch(setDesingerPageAction(pageMeta.slug))
    }
  }, [dispatch, pageMeta])

  useEffect(()=>{
    if(submitResult &&  pageMeta?.jsonSchema?.closeAfterSubmit){
      history.goBack();
    }

    if(submitResult && !pageMeta?.jsonSchema?.closeAfterSubmit){
      dispatch(setModelAction(submitResult));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitResult])

  useEffect(()=>{
    if(error){
      history.push('/admin/error-404');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const handleSubmit = (data: any) => {
    setSubmitRequest({...API_SUBMIT_MODEL, data});
  };
  
  const formActionHandle = (action:PageAction)=>{
    switch (action.name){
      case JUMP_TO_PAGE_ACTION:
        const url = resolvePageUrl(action.page);
        history.push(url);
        return;
        
      case GO_BACK_ACTION:
        history.goBack();
        return;
        
      //case POST_DATA_ACTION:
      //  console.log('POST_DATA_ACTION', action)
      //  return;
    }
    
  }

  const pageContent = loadingPage ?
    <PageSkeleton />
    :
    <Fragment>
      {
        pageLayout?.map((child:RXNode<IMeta>)=>{
          return (
            <ComponentRender 
              key={child.id} 
              component={child} 
              onPageAction={formActionHandle}
            />
          )
        })
      }
    </Fragment>

return (
    <Container>
      {
        pageMeta?.jsonSchema?.isFormPage 
        ?
          <PageForm onSubmit = {handleSubmit}>
            {pageContent}
          </PageForm>
        :
          pageContent
      }
    </Container>
  )
}

export default PageView