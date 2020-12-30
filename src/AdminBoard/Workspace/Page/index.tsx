import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import { IPage } from 'base/Model/IPage';
import { IMeta } from 'base/Model/IMeta';
import { RXNode } from 'base/RXNode/RXNode';
import ComponentRender from 'AdminBoard/Workspace/Page/ComponentRender';
import { GO_BACK_ACTION, PageAction, SUBMIT_MUTATION } from 'base/PageAction';
import { gql, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { IPageJumper } from 'base/Model/IPageJumper';
import { ModelProvider } from './Store/ModelProvider';
import { ModelStore } from './Store/ModelStore';
import { IPageMutation } from 'base/Model/IPageMutation';
import { useShowAppoloError } from 'store/helpers/useInfoError';
import { useAppStore } from 'store/helpers/useAppStore';
import { Dialog } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import ConfirmDialog from 'base/Widgets/ConfirmDialog';
import intl from 'react-intl-universal';

export const Page = observer((
  props:{
    page?:IPage,
    pageParams?:IPageJumper,
    onPageAction?: (pageAction:PageAction)=> void,
  }
)=>{
  const [openAlert, setOpentAlert] = useState(false);
  const [backConfirmOpen, setBackConfirmOpen] = useState(false);
  const {page, pageParams, onPageAction} = props;
  const [pageStore] = useState(new ModelStore());
  const [mutation, setMutation] = useState<IPageMutation>();
  const queryName = page?.schema?.query?.name;
  const appStore = useAppStore();

  const createQueryGQL = ()=>{
    const QUERY_GQL = gql`
      query ($id:ID){
        ${queryName}(id:$id){
          ${pageStore.toFieldsGQL()}
        }
      }
    `;
    return QUERY_GQL;
  }
  const createMutationGQL = (mutation?: IPageMutation)=>{
    if(!mutation){
      return gql`mutation{emperty}`;
    }
    //console.log('createQueryGQL',pageStore.toFieldsGQL())
    const refreshNode = pageStore.getModelNode(mutation?.refreshNode)
    const MUTATION_GQL = gql`
      mutation ($${mutation?.variableName}:${mutation?.variableType}){
        ${mutation?.name}(${mutation?.variableName}:$${mutation?.variableName}){
          ${refreshNode?.toFieldsGQL()}
        }
      }
    `;
    return MUTATION_GQL;
  }

  const [excuteQuery, { loading:queryLoading, error, data }] = useLazyQuery(createQueryGQL(), {
    variables: { ...page?.schema?.query?.variables, id: pageParams?.dataId},
    notifyOnNetworkStatusChange: true
  });

  const [excuteMutation, {error:muetationError}] = useMutation(createMutationGQL(mutation),{
    onCompleted:(data)=>{
      appStore.setSuccessAlert(true)
      if(mutation?.goback){
        onPageAction && onPageAction({name:GO_BACK_ACTION})
      }
    }});
  
  useEffect(()=>{
    if(mutation){
      const submitNode = pageStore.getModelNode(mutation.submitNode)
      console.log('mutation variables', submitNode?.toInputValue());
      excuteMutation({variables:{[mutation.variableName]:submitNode?.toInputValue()}});      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mutation])
  
  useEffect(()=>{
    pageStore.parsePage(page);
    if(queryName){
      excuteQuery();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page]);

  useEffect(()=>{
    pageStore.setLoading(queryLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryLoading]);

  useEffect(()=>{
    if(data && queryName){
      pageStore.setModel(data[queryName]);      
    }
    else{
      pageStore.setModel(undefined);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useShowAppoloError(error||muetationError);

  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case SUBMIT_MUTATION:
        if(pageStore.validate()){
          if(action.mutation){
            setMutation(action.mutation)
          }           
        }
        else{
          setOpentAlert(true);
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
    <ModelProvider value = {pageStore}>
      {
        pageStore.pageLayout?.map((child:RXNode<IMeta>)=>{
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
    </ModelProvider>
  )
})
