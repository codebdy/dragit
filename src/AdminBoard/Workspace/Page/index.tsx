import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react";
import { IPage } from 'Base/Model/IPage';
import { IMeta } from 'Base/Model/IMeta';
import { RXNode } from 'Base/RXNode/RXNode';
import { ComponentRender } from 'Base/PageUtils/ComponentRender';
import { PageAction } from 'Base/PageUtils/PageAction';
import { GO_BACK_ACTION, RESET_ACTION, SUBMIT_MUTATION } from "Base/PageUtils/ACTIONs";
import { gql, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { IPageJumper } from 'Base/Model/IPageJumper';
import { ModelProvider } from '../../../Base/ModelTree/ModelProvider';
import { ModelStore } from '../../../Base/ModelTree/ModelStore';
import { IPageMutation } from 'Base/Model/IPageMutation';
import { Dialog } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import intl from 'react-intl-universal';
import { AUTH_DEBUG } from 'Base/authSlugs';
import { useAppStore } from 'Store/Helpers/useAppStore';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { useLoggedUser } from 'Store/Helpers/useLoggedUser';
import { ActionStore, ActionStoreProvider } from 'Base/PageUtils/ActionStore';
import ActionHunter from 'Base/PageUtils/ActionHunter';
import { usePageQueryGQL } from './usePageQueryGQL';
import { Debug } from './Debug';
import { PageStore, PageStoreProvider } from 'Base/PageUtils/PageStore';
import { createMutationGQL } from './createMutationGQL';

export const Page = observer((
  props:{
    page:IPage,
    pageJumper?:IPageJumper,
    hideDebug?:boolean,
    onPageAction?: (pageAction:PageAction)=> void,
  }
)=>{
  const [openAlert, setOpentAlert] = useState(false);
  const {page, pageJumper, hideDebug, onPageAction} = props;
  const [actionStore] = useState(new ActionStore());
  const [modelStore] = useState(new ModelStore());  
  const [pageStore, setPage] = useState<PageStore>();
  const [mutation, setMutation] = useState<IPageMutation>();
  const queryName = page?.schema?.query;
  const appStore = useAppStore();
  const loggedUser = useLoggedUser();

  useEffect(()=>{
    setPage(new PageStore(page));
  },[page]);

  useEffect(()=>{
    pageStore?.setSelectModelComponentRxid('');
    modelStore.clearFields();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page, pageJumper])

  const queryGQL = usePageQueryGQL(modelStore, pageStore, queryName, pageJumper);
  
  const [excuteQuery, { loading:queryLoading, error, data }] = useLazyQuery(gql`${queryGQL.gql}`, {
    variables: { ...queryGQL.variables },
    notifyOnNetworkStatusChange: true,
    fetchPolicy:'no-cache'
  });

  const [excuteMutation, {error:muetationError}] = useMutation(
    gql`${createMutationGQL(mutation, modelStore)}`,
    {
      onCompleted:(data)=>{
        if(mutation){
          const submitNode = modelStore.getModelNode(mutation.submitNode);
          submitNode?.updateDefaultValue();
          if(mutation?.refreshNode){
            const refreshNode = modelStore.getModelNode(mutation?.refreshNode)
            refreshNode?.setModel({[mutation?.refreshNode]:data[mutation.name]})             
            refreshNode?.setLoading(false);          
          }

          submitNode?.clearDirty();
          setMutation(undefined);
        }

        appStore.setSuccessAlert(true)
        if(mutation?.goback){
          onPageAction && onPageAction({name:GO_BACK_ACTION})
        }
      }
    }
  );
  
  useEffect(()=>{
    if(mutation){
      const submitNode = modelStore.getModelNode(mutation.submitNode)
      const refreshNode = modelStore.getModelNode(mutation?.refreshNode) 
      refreshNode?.setLoading(true);
      excuteMutation({variables:{[mutation.variableName]:submitNode?.toInputValue()}}); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mutation])
  
  useEffect(()=>{
    if(queryName){
      excuteQuery();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page]);

  useEffect(()=>{
    modelStore.setLoading(queryLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryLoading]);

  useEffect(()=>{
    if(data && queryName){
      modelStore.setModel(data[queryName]);      
    }
    else{
      modelStore.setModel(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useShowAppoloError(error||muetationError);

  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case SUBMIT_MUTATION:
        const submitNode = modelStore.getModelNode(action.mutation?.submitNode)
        console.assert(submitNode, 'Page内错误，提交节点不存在：' + action.mutation?.submitNode);
        if(submitNode?.validate()){
          if(action.mutation){
            setMutation(action.mutation)
          }           
        }
        else{
          setOpentAlert(true);
        }
       
        return;
      case GO_BACK_ACTION:
        if(modelStore?.isDirty()){
          appStore.confirmAction(intl.get('changing-not-save-message'), ()=>{
            onPageAction && onPageAction({name:GO_BACK_ACTION})
          })
          return;
        }
        break;
      case RESET_ACTION:
        if(action.resetNodes){
          action.resetNodes.forEach(nodeName =>{
            const resetNode = modelStore.getModelNode(nodeName);
            resetNode?.reset();          
          })
        }
        else{
          modelStore.reset();
        }

        return;
    }
    onPageAction && onPageAction(action);
  }

  const handleCloseAlert = ()=>{
    setOpentAlert(false);
  }

  return (
    <PageStoreProvider value = {pageStore}>
      <ActionStoreProvider value = {actionStore}>
        <ModelProvider value = {modelStore}>
          <ActionHunter onPageAction = {hanlePageAction} />
          {
            pageStore?.pageLayout?.map((child:RXNode<IMeta>)=>{
              return (
                <ComponentRender 
                  key={child.id} 
                  node={child} 
                />
              )
            })
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
          {
            loggedUser.authCheck(AUTH_DEBUG) && !hideDebug &&
            <Debug onRefreshVariables={()=>{}}/>
          }
        </ModelProvider>
      </ActionStoreProvider>
    </PageStoreProvider>
  )
})
