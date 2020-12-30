import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import { IPage } from 'base/Model/IPage';
import { IMeta } from 'base/Model/IMeta';
import { RXNode } from 'base/RXNode/RXNode';
import ComponentRender from 'AdminBoard/Workspace/Page/ComponentRender';
import { GO_BACK_ACTION, PageAction, SUBMIT_ACTION, SUBMIT_AND_NOT_CLOSE_ACTION } from 'base/PageAction';
import { gql, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { IPageJumper } from 'base/Model/IPageJumper';
import { ModelProvider } from './Store/ModelProvider';
import { ModelStore } from './Store/ModelStore';
import { IPageMutation } from 'base/Model/IPageMutation';
import { useShowAppoloError } from 'store/helpers/useInfoError';

export const Page = observer((
  props:{
    page?:IPage,
    pageParams?:IPageJumper,
    onPageAction?: (pageAction:PageAction)=> void,
  }
)=>{
  const {page, pageParams, onPageAction} = props;
  const [pageStore] = useState(new ModelStore());
  const [mutation, setMutation] = useState<IPageMutation>();
  const queryName = page?.schema?.query?.name;

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
    const refshNode = pageStore.getModelNode(mutation?.refreshNode)
    const QUERY_GQL = gql`
      mutation ($input:${mutation?.variableType}){
        ${mutation?.name}(${mutation?.variableName}:$input){
          ${refshNode?.toFieldsGQL()}
        }
      }
    `;
    return QUERY_GQL;
  }

  const [excuteQuery, { loading:queryLoading, error, data }] = useLazyQuery(createQueryGQL(), {
    variables: { ...page?.schema?.query?.variables, id: pageParams?.dataId},
    notifyOnNetworkStatusChange: true
  });

  const [excuteMutation, {error:muetationError}] = useMutation(createMutationGQL(mutation),{
    onCompleted:(data)=>{
      //setFolderLoading(false);
      if(mutation?.goback){
        onPageAction && onPageAction({name:GO_BACK_ACTION})
      }
    }});
  
  useEffect(()=>{
    if(mutation){
      const submitNode = pageStore.getModelNode(mutation.submitNode)
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
      case SUBMIT_ACTION:
        //setCloseAfterSubmit(true);
        //setSubmit(true);
        //isDirty.value = false;
        return;
      
      case SUBMIT_AND_NOT_CLOSE_ACTION:
        if(action.mutation){
          setMutation(action.mutation)
        }        
        return;
    }

    onPageAction && onPageAction(action);
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
    </ModelProvider>
  )
})
