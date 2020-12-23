import React, { Fragment, useEffect, useState } from "react";
import ComponentRender from "./ComponentRender";
import { RXNode } from "../../../base/RXNode/RXNode";
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Container, createStyles, Dialog, makeStyles, Theme } from "@material-ui/core";
import PageSkeleton from "../../Workspace/common/ModuleSkeleton";
import { GO_BACK_ACTION, OPEN_PAGE_ACTION, PageAction, SUBMIT_ACTION, SUBMIT_AND_NOT_CLOSE_ACTION } from '../../../base/PageAction';

import { IMeta } from "base//Model/IMeta";
import { RXNodeRoot } from "base/RXNode/Root";
import { resolvePageUrl } from "utils/resolvePageUrl";
import { AxiosRequestConfig } from "axios";
import { useAxios } from "base/Hooks/useAxios";
import PageForm from "./Form/PageForm";
import { Alert, AlertTitle } from "@material-ui/lab";
import intl from "react-intl-universal";
import ConfirmDialog from "base/Widgets/ConfirmDialog";
import { useDesigner } from "store/helpers/useAppStore";
import { useLoggedUser } from "store/helpers/useLoggedUser";
import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";
import { cloneObject } from "utils/cloneObject";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display:'flex',
      flexFlow:'column',
    },
  })
);

// 定义查询语句
const QUERY_PAGE_META = gql`
  query pageQuery($moduleSlug: String!, $pageSlug: String){
    modulePage(moduleSlug:$moduleSlug, pageSlug:$pageSlug){
      id
      slug
      name
      schema
    }
  }
`;
const PageView = ()=>{
  const classes = useStyles();
  const history =  useHistory();
  const match = useRouteMatch();
  const{moduleSlug, pageSlug, id} = match.params as any;

  const { loading:loadingPageMeta , error, data } = useQuery(QUERY_PAGE_META, {variables:{moduleSlug, pageSlug}});

  const [pageLayout, setPageLayout] = useState<Array<RXNode<IMeta>>>([]);
  //const [pageMeta, loadingPage, error] = usePageMeta(moduleSlug, pageSlug,);
  const [submitRequest, setSubmitRequest] = useState<AxiosRequestConfig>();
  const [submitResult/*, submiting*/] = useAxios(submitRequest, true);
  //指示提交表单的标识，表单提交后置为false
  const [submit, setSubmit] = useState(false);
  const [openAlert, setOpentAlert] = useState(false);
  const [closeAfterSubmit, setCloseAfterSubmit] = useState(false);
  const [isDirty] = useState({value:false});
  const [backConfirmOpen, setBackConfirmOpen] = useState(false);

  //usePageModel(pageMeta?.schema, id);
  //const dispatch = useDispatch();
  const loggedUser = useLoggedUser();
  const designer = useDesigner();

  useEffect(() => {
    console.log('PageView useEffect:', moduleSlug, pageSlug, id);
    if(!id){
      //dispatch(setModelAction(undefined));
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[moduleSlug, pageSlug, id]);
  
  useEffect(()=>{
    if(data){
      console.log('PageView', data);
      let schema = cloneObject(data.modulePage.schema?.layout);
      let root = new RXNodeRoot<IMeta>();
      root.parse(schema);
      setPageLayout(root.children);
      designer.setPageSlug(data.modulePage.slug);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(()=>{
    if(submitResult &&  closeAfterSubmit){
      history.goBack();
    }

    if(submitResult && !closeAfterSubmit){
      //console.log(submitResult);
      //dispatch(setModelAction(submitResult));
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
    setSubmit(false);
    //if(pageMeta?.schema?.apiForSave){
    //  setSubmitRequest({...pageMeta?.schema?.apiForSave, data});      
    //}
  };

  const handleSubmitError = ()=>{
    setOpentAlert(true);
    setSubmit(false);
  }

  const handleCloseAlert = ()=>{
    setOpentAlert(false);
  }

  const handleBackConfirm = ()=>{
    history.goBack();
    isDirty.value = false;
    setBackConfirmOpen(false);
  }
  
  const formActionHandle = (action:PageAction)=>{
    switch (action.name){
      case OPEN_PAGE_ACTION:
        const url = resolvePageUrl(action.page);
        history.push(url);
        return;
        
      case GO_BACK_ACTION:
        if(isDirty.value){
          setBackConfirmOpen(true);
        }
        else{
          history.goBack();
        }
        return;
      
      case SUBMIT_ACTION:
        setCloseAfterSubmit(true);
        setSubmit(true);
        isDirty.value = false;
        return;
      
      case SUBMIT_AND_NOT_CLOSE_ACTION:
        setCloseAfterSubmit(false);
        setSubmit(true);
        isDirty.value = false;
        return;
    }
    
  }

  const handleDirty = ()=>{
    isDirty.value = true;
  }

  let pageContent:any = loadingPageMeta ?
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
              onDirty = {handleDirty}
            />
          )
        })
      }
    </Fragment>
  pageContent = loggedUser?.authCheck(...data?.modulePage?.schema?.auths || [])&&pageContent;
  return (
    <Container className = {classes.root}>
      {
        data?.modulePage?.schema?.isFormPage 
        ?
          <PageForm 
            onSubmit = {handleSubmit} 
            submit={submit} 
            onSubmitError = {handleSubmitError}
          >
            {pageContent}
          </PageForm>
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
        <ConfirmDialog 
          message = {intl.get('changing-not-save-message')}
          open = {backConfirmOpen}
          onCancel ={()=>{setBackConfirmOpen(false)}}
          onConfirm = {handleBackConfirm}
        /> 
    </Container>
  )
}

export default PageView