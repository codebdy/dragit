import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import { IPage } from 'base/Model/IPage';
import { IMeta } from 'base/Model/IMeta';
import { RXNode } from 'base/RXNode/RXNode';
import ComponentRender from 'AdminBoard/views/Page/ComponentRender';
import { PageAction, SUBMIT_ACTION, SUBMIT_AND_NOT_CLOSE_ACTION } from 'base/PageAction';
import { gql, useLazyQuery } from '@apollo/react-hooks';
import { IPageJumper } from 'base/Model/IPageJumper';
import { PageStore } from './PageStore';
import { PageProvider } from './PageProvider';

export const Page = observer((
  props:{
    page?:IPage,
    pageParams?:IPageJumper,
    onPageAction?: (pageAction:PageAction)=> void,
  }
)=>{
  const {page, pageParams, onPageAction} = props;
  //const [pageLayout, setPageLayout] = useState<Array<RXNode<IMeta>>>([]);
  const [pageStore] = useState(new PageStore());
  const createQueryGQL = ()=>{
    const QUERY_GQL = gql`
      query ($id:ID!){
        ${page?.schema?.query}(id:$id){
          id
          ${pageStore.toFieldsGQL()}
        }
      }
    `;
    return QUERY_GQL;
  }
  const [excuteQuery, { called, loading:queryLoading, error, data }] = useLazyQuery(createQueryGQL(), {
    variables: { id: pageParams?.dataId},
    notifyOnNetworkStatusChange: true
  });

  useEffect(()=>{
    pageStore.parsePage(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page]);

  const hanlePageAction = (action:PageAction)=>{
    switch (action.name){
      case SUBMIT_ACTION:
        //setCloseAfterSubmit(true);
        //setSubmit(true);
        //isDirty.value = false;
        return;
      
      case SUBMIT_AND_NOT_CLOSE_ACTION:
        //setCloseAfterSubmit(false);
        //setSubmit(true);
        //isDirty.value = false;
        return;
    }

    onPageAction && onPageAction(action);
  }


  const handleDirty = ()=>{

  }
  return (
    <PageProvider value = {pageStore}>
      {
        pageStore.pageLayout?.map((child:RXNode<IMeta>)=>{
          return (
            <ComponentRender 
              key={child.id} 
              component={child} 
              onPageAction={hanlePageAction}
              onDirty = {handleDirty}
            />
          )
        })
      }
    </PageProvider>
  )
})
