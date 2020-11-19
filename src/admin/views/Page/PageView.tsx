import React, { Fragment, useEffect } from "react";
import ComponentRender from "./ComponentRender";
import { RXElement } from "./RXElement";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { thunkPageSchema } from "store/page/thunks";
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Container, Dialog } from "@material-ui/core";
import PageSkeleton from "./PageSkeleton";
import { GO_BACK_ACTION, JUMP_TO_PAGE_ACTION, PageAction, PageJumper } from './PageAction';

import { FormProvider, useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@material-ui/lab";
import intl from "react-intl-universal";

const PageView = ()=>{
  const history =  useHistory();
  const match = useRouteMatch()
  const{moduleId, pageId, dataId} = match.params as any;
  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);
  const dispatch = useDispatch()
  const methods = useForm({mode: 'all'});
  const {handleSubmit, errors, clearErrors} = methods;

  useEffect(() => {
    console.log('PageView useEffect:', moduleId, pageId, dataId);
    dispatch(
      thunkPageSchema({moduleId:moduleId,pageId:pageId, dataId:dataId})
     );
     clearErrors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[moduleId, pageId, dataId]);
  

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

  const pageContent =  pageInStore.schemaLoading ?
      <PageSkeleton />
      :
      <Fragment>
        {
          pageInStore.schema?.map((child:RXElement)=>{
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
          pageInStore.pageJson?.settings?.isFormPage 
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