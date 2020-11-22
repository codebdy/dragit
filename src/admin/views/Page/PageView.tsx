import React, { Fragment, useEffect, useState } from "react";
import ComponentRender from "./ComponentRender";
import { RXNode } from "../../../base/RXNode/RXNode";
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Container, Dialog } from "@material-ui/core";
import PageSkeleton from "./PageSkeleton";
import { GO_BACK_ACTION, JUMP_TO_PAGE_ACTION, PageAction, PageJumper } from './PageAction';

import { FormProvider, useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@material-ui/lab";
import intl from "react-intl-universal";
import usePageMeta from "./usePageMeta";
import usePageModel from "./usePageModel";
import { useDispatch } from "react-redux";
import { setDesingerPageAction } from "store/designer/actions";
import { IMeta } from "base/IMeta";
import { RXNodeRoot } from "base/RXNode/Root";

const PageView = ()=>{
  const history =  useHistory();
  const match = useRouteMatch()
  const{moduleId, pageId, id} = match.params as any;
  const methods = useForm({mode: 'all'});
  const {handleSubmit, errors, clearErrors} = methods;

  const [pageLayout, setPageLayout] = useState<Array<RXNode<IMeta>>>([]);
  const [pageMeta, loadingPage] = usePageMeta(moduleId, pageId,)
  
  usePageModel(pageMeta?.jsonSchema, id);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('PageView useEffect:', moduleId, pageId, id);
    clearErrors();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[moduleId, pageId, id]);
  
  useEffect(()=>{
    if(pageMeta){
      let schema = pageMeta.jsonSchema?.layout;
      let root = new RXNodeRoot<IMeta>();
      root.parse(schema);
      setPageLayout(root.children);
      dispatch(setDesingerPageAction(pageMeta.id))
    }
  }, [dispatch, pageMeta])

  const onSubmit = (data: any) => console.log('数据提交',data);
  const onValidate = ()=>{
    setSubmitted(true);
  }
  const [submitted, setSubmitted] = React.useState(false);
  
  const resolvePageUrl=(page:PageJumper)=>{
    return `/admin/module/${page.moduleId}/${page.pageId}` + (page.dataId ? '/' + page.dataId : '' );
  }
  
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

  const handleCloseAlert = ()=>{
    setSubmitted(false);
  }

  const openAlert = Object.keys(errors).length > 0 && submitted;

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
      <FormProvider {...methods}>      
        {
          pageMeta?.jsonSchema?.isFormPage 
          ?
            <form onSubmit={handleSubmit(onSubmit, onValidate)}>
              {pageContent}
            </form>
          :
            pageContent
        }

      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="error"  onClose={handleCloseAlert}>
          <AlertTitle>{intl.get('error')}</AlertTitle>
          {intl.get('input-error')} — <strong>{intl.get('please-confirm')}</strong>
        </Alert>      
      </Dialog>

      </FormProvider>    
    </Container>
  )
}

export default PageView