import React, { useEffect } from "react";
import ElementRender from "./ElementRender";
import { RXElement } from "./RXElement";
import * as Yup from 'yup';
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { thunkPageSchema } from "store/page/thunks";
import { withRouter } from 'react-router-dom';
import { Container } from "@material-ui/core";
import PageSkeleton from "./PageSkeleton";
import { GO_BACK_ACTION, JUMP_TO_PAGE_ACTION, PageAction, PageJumper } from './PageAction';

import { FormProvider, useForm } from "react-hook-form";

const PageView = (props:{match: any, history:any })=>{
  const{history} = props;
  const{moduleId, pageId, dataId} = props.match.params;
  const selectPage = (state: RootState) => state.page;
  const pageInStore = useSelector(selectPage);
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('PageView useEffect:', moduleId, pageId, dataId);
    dispatch(
      thunkPageSchema({moduleId:moduleId,pageId:pageId, dataId:dataId})
     );

  },[dispatch, moduleId, pageId, dataId]);
  
  const methods = useForm({mode: 'all'});
  const {handleSubmit} = methods;
  const onSubmit = (data: any) => console.log('数据提交',data);
  
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

  return (
    <Container>
      <FormProvider {...methods}>
        { pageInStore.schemaLoading ?
          <PageSkeleton />
        :
          <form onSubmit={handleSubmit(onSubmit)}>
          {
              pageInStore.schema?.map((child:RXElement)=>{
                return (
                  <ElementRender 
                    key={child.id} 
                    element={child} 
                    formModel={pageInStore.model}
                    onPageAction={formActionHandle}
                  />
                )
              })
          }
          </form>
        }
      </FormProvider>
    </Container>
  )
}

export default withRouter(PageView)