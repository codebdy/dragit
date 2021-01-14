import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react";
import { IPage } from 'Base/Model/IPage';
import { IMeta } from 'Base/Model/IMeta';
import { RXNode } from 'Base/RXNode/RXNode';
import ComponentRender from 'Base/ComponentRender';
import { PageAction } from 'Base/Action/PageAction';
import { GO_BACK_ACTION, RESET_ACTION, SUBMIT_MUTATION } from "Base/Action/ACTIONs";
import { gql, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { IPageJumper } from 'Base/Model/IPageJumper';
import { ModelProvider } from '../../../Base/ModelTree/ModelProvider';
import { ModelStore } from '../../../Base/ModelTree/ModelStore';
import { IPageMutation } from 'Base/Model/IPageMutation';
import { Dialog } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import intl from 'react-intl-universal';
import { RXNodeRoot } from 'Base/RXNode/Root';
import { AUTH_DEBUG } from 'Base/authSlugs';
import { PageGQLProvider } from 'Base/GraphQL/PageGQLProvider';
import { PageGQLStore } from 'Base/GraphQL/PageGQLStore';
import { useAppStore } from 'Store/Helpers/useAppStore';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { useLoggedUser } from 'Store/Helpers/useLoggedUser';
import { cloneObject } from 'Utils/cloneObject';
import { ActionStore, ActionStoreProvider } from 'Base/Action/ActionStore';
import ActionHunter from 'Base/Action/ActionHunter';
import { usePageQueryGQL } from './usePageQueryGQL';
import { Debug } from './Debug';

export const Page = observer((
  props:{
    page?:IPage,
    pageParams?:IPageJumper,
    hideGQLDebug?:boolean,
    onPageAction?: (pageAction:PageAction)=> void,
  }
)=>{
  const [openAlert, setOpentAlert] = useState(false);
  const {page, pageParams, hideGQLDebug, onPageAction} = props;
  const [pageLayout, setPageLayout] = useState<Array<RXNode<IMeta>>>();
  const [actionStore] = useState(new ActionStore());
  const [modelStore] = useState(new ModelStore());  
  const [gqlStore] = useState(new PageGQLStore());
  const [mutation, setMutation] = useState<IPageMutation>();
  const queryName = page?.schema?.query;
  const appStore = useAppStore();
  const loggedUser = useLoggedUser();

  const queryGQL = usePageQueryGQL(modelStore, gqlStore, queryName, pageParams);
  
  const createMutationGQL = (mutation?: IPageMutation)=>{
    if(!mutation){
      return gql`mutation{emperty}`;
    }

    const refreshNode = modelStore.getModelNode(mutation?.refreshNode)    
    const gqlText = `
        mutation ($${mutation?.variableName}:${mutation?.variableType}){
        ${mutation?.name}(${mutation?.variableName}:$${mutation?.variableName})
          ${refreshNode?.toFieldsGQL()}
      }
    `
    //console.log('mueationQueryGQL',gqlText)
    const MUTATION_GQL = gql`${gqlText}`;
    return MUTATION_GQL;
  }

  const [excuteQuery, { loading:queryLoading, error, data }] = useLazyQuery(gql`${queryGQL.gql}`, {
    variables: { ...queryGQL.variables },
    notifyOnNetworkStatusChange: true,
    fetchPolicy:'no-cache'
  });

  const [excuteMutation, {error:muetationError}] = useMutation(
    createMutationGQL(mutation),
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
          console.log('mutation result', data, mutation.name)
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
      console.log('mutation variables', mutation.submitNode,modelStore, submitNode?.toInputValue());
      refreshNode?.setLoading(true);
      excuteMutation({variables:{[mutation.variableName]:submitNode?.toInputValue()}}); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mutation])
  
  useEffect(()=>{
    const layout = page?.schema?.layout || [];
    let root = new RXNodeRoot<IMeta>();
    root.parse(cloneObject(layout));
    setPageLayout(root.children);
    //pageStore.parsePage(page);
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
    <ActionStoreProvider value = {actionStore}>
      <ModelProvider value = {modelStore}>
        <PageGQLProvider value = {gqlStore}>
          <ActionHunter onPageAction = {hanlePageAction} />
          {
            pageLayout?.map((child:RXNode<IMeta>)=>{
              return (
                <ComponentRender 
                  key={child.id} 
                  component={child} 
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
            loggedUser.authCheck(AUTH_DEBUG) && !hideGQLDebug &&
            <Debug/>
          }
        </PageGQLProvider>
      </ModelProvider>
    </ActionStoreProvider>
  )
})
