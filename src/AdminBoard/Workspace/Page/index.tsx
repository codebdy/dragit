import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import { IPage } from 'base1/Model/IPage';
import { IMeta } from 'base1/Model/IMeta';
import { RXNode } from 'base1/RXNode/RXNode';
import ComponentRender from 'base1/ComponentRender';
import { GO_BACK_ACTION, PageAction, RESET_ACTION, SUBMIT_MUTATION } from 'base1/PageAction';
import { gql, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { IPageJumper } from 'base1/Model/IPageJumper';
import { ModelProvider } from '../../../base1/ModelTree/ModelProvider';
import { ModelStore } from '../../../base1/ModelTree/ModelStore';
import { IPageMutation } from 'base1/Model/IPageMutation';
import { useShowAppoloError } from 'store1/helpers1/useInfoError';
import { useAppStore } from 'store1/helpers1/useAppStore';
import { Dialog } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import ConfirmDialog from 'base1/Widgets/ConfirmDialog';
import intl from 'react-intl-universal';
import { RXNodeRoot } from 'base1/RXNode/Root';
import { cloneObject } from 'utils/cloneObject';
import { AUTH_DEBUG } from 'base1/authSlugs';
import { useLoggedUser } from 'store1/helpers1/useLoggedUser';
import GraphQLDebug from '../GraphQLDebug';
import { PageGQLProvider } from 'base1/GraphQL/PageGQLProvider';
import { PageGQLStore } from 'base1/GraphQL/PageGQLStore';

export const Page = observer((
  props:{
    page?:IPage,
    pageParams?:IPageJumper,
    hideGQLDebug?:boolean,
    onPageAction?: (pageAction:PageAction)=> void,
  }
)=>{
  const [openAlert, setOpentAlert] = useState(false);
  const [backConfirmOpen, setBackConfirmOpen] = useState(false);
  const {page, pageParams, hideGQLDebug, onPageAction} = props;
  const [pageLayout, setPageLayout] = useState<Array<RXNode<IMeta>>>();
  const [modelStore] = useState(new ModelStore());  
  const [gqlStore] = useState(new PageGQLStore());
  const [mutation, setMutation] = useState<IPageMutation>();
  const queryName = page?.schema?.query?.name;
  const appStore = useAppStore();
  const loggedUser = useLoggedUser();
  
  const createQueryGQL = ()=>{
    const QUERY_GQL = gql`
      query ($id:ID){
        ${queryName}(id:$id)
          ${modelStore.toFieldsGQL()}
        
      }
    `;
    return QUERY_GQL;
  }
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

  const [excuteQuery, { loading:queryLoading, error, data }] = useLazyQuery(createQueryGQL(), {
    variables: { ...page?.schema?.query?.variables, id: pageParams?.dataId},
    notifyOnNetworkStatusChange: true
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
          setBackConfirmOpen(true);
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

  const handleBackConfirm = ()=>{
    onPageAction && onPageAction({name:GO_BACK_ACTION})
    setBackConfirmOpen(false);
  }

  return (
    <ModelProvider value = {modelStore}>
      <PageGQLProvider value = {gqlStore}>
        {
          pageLayout?.map((child:RXNode<IMeta>)=>{
            return (
              <ComponentRender 
                key={child.id} 
                component={child} 
                onPageAction={hanlePageAction}
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
        <ConfirmDialog 
          message = {intl.get('changing-not-save-message')}
          open = {backConfirmOpen}
          onCancel ={()=>{setBackConfirmOpen(false)}}
          onConfirm = {handleBackConfirm}
        /> 
        {
          loggedUser.authCheck(AUTH_DEBUG) && !hideGQLDebug &&
          <GraphQLDebug/>
        }
      </PageGQLProvider>
    </ModelProvider>
  )
})
