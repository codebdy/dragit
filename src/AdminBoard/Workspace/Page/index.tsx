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
import { useAppStore } from 'store/helpers/useAppStore';
import intl from 'react-intl-universal';

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
  const appStore = useAppStore();
  const queryName = page?.schema?.query?.name;

  const createQueryGQL = ()=>{
    //console.log('createQueryGQL',pageStore.toFieldsGQL())
    const QUERY_GQL = gql`
      query ($id:ID){
        ${queryName}(id:$id){
          id
          ${pageStore.toFieldsGQL()}
        }
      }
    `;
    return QUERY_GQL;
  }
  const [excuteQuery, { loading:queryLoading, error, data }] = useLazyQuery(createQueryGQL(), {
    variables: { ...page?.schema?.query?.variables, id: pageParams?.dataId},
    notifyOnNetworkStatusChange: true
  });

  console.log('data',queryLoading, error, data)

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

  useEffect(()=>{
    if(error){
      appStore.infoError(intl.get('server-error'), error?.message)
      console.log(error);      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error])

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
