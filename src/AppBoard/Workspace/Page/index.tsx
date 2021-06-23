import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react";
import { IRxPage } from 'Base/Model/IRxPage';
import { IMeta } from 'Base/RXNode/IMeta';
import { RxNode } from 'rx-drag/models/RxNode';
import { ComponentRender } from 'Base/PageUtils/ComponentRender';
import { IPageAction } from 'Base/Model/IPageAction';
import { GO_BACK_ACTION, OPEN_PAGE_ACTION, RESET_ACTION, SUBMIT_MUTATION } from "Base/PageUtils/ACTIONs";
import { IPageJumper } from 'Base/Model/IPageJumper';
import { ModelProvider } from '../../../Base/ModelTree/ModelProvider';
import { Dialog } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import intl from 'react-intl-universal';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import { useLoggedUser } from 'Store/Helpers/useLoggedUser';
import { ActionStore, ActionStoreProvider } from 'Base/PageUtils/ActionStore';
import ActionHunter from 'Base/PageUtils/ActionHunter';
import { Debug } from './Debug';
import { PageStore, PageStoreProvider } from 'Base/PageUtils/PageStore';
import { RXModel } from 'Base/ModelTree/RXModel';
import { PopupPage } from './PopupPage';
import useLayzyMagicPost from 'Data/useLayzyMagicPost';
import { AUTH_DEBUG } from 'Base/authSlugs';
import { MagicPostBuilder } from 'Data/MagicPostBuilder';
import { MagicQueryMeta } from 'Data/MagicQueryMeta';
import { MagicQueryBuilder } from 'Data/MagicQueryBuilder';
import { useMagicQuery } from 'Data/useMagicQuery';
import bus from 'Base/bus';
import { EVENT_DATA_CHANGE } from 'Base/events';
import { DataChangeType } from 'Data/DataChangeArg';

export const Page = observer((
  props:{
    page:IRxPage,
    pageJumper?:IPageJumper,
    hideDebug?:boolean,
    onPageAction?: (pageAction:IPageAction)=> void,
  }
)=>{
  const {page, pageJumper, hideDebug, onPageAction} = props;
  const [openAlert, setOpentAlert] = useState(false);
  const [actionStore, setActionStore] = useState<ActionStore>();
  const [modelStore, setModelStore] = useState<RXModel>(); 
  const [pageStore, setPageStore] = useState<PageStore>();
  const [popupPageJumper, setPopupPageJumper] = useState<IPageJumper>();
  //避免关闭闪烁，添加一个显示状态
  const [showPopup, setShowPopup] = useState(false);
  const dragItStore = useDragItStore();
  const loggedUser = useLoggedUser();
  const queryMeta = (page?.query) ? new MagicQueryMeta(page.query) : undefined;

  useEffect(()=>{
    const pgStore = new PageStore(page, pageJumper);
    setPageStore(pgStore);
    setActionStore(new ActionStore());
    
    if(pgStore?.rootNode){
      setModelStore(new RXModel(pgStore.rootNode, 'root'));        
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page, pageJumper])

  const { loading, error, data, mutate } = useMagicQuery(
    queryMeta && pageJumper?.dataId
      ? new MagicQueryBuilder(page.query)
          .setGetOne()
          .addCondition('id', pageJumper?.dataId)
      : undefined
  );

  useEffect(()=>{
    modelStore?.setLoading(loading);
  }, [loading, modelStore]);

  useEffect(()=>{
    if(data){
      modelStore?.initWithModel(data.data);      
    }
  },[data, modelStore]);

  const [excuteMutation, {error:muetationError, loading:mutating}] = useLayzyMagicPost<any>(
    {
      onCompleted:(data)=>{
        const mutation = pageStore?.submittingMutation;
        if(mutation){
          const submitNode = modelStore?.getModelNode(mutation.submitNode);
          submitNode?.updateDefaultValue();
          if(mutation?.refreshNode){
            const refreshNode = modelStore?.getModelNode(mutation?.refreshNode)
            //refreshNode?.initWithModel({[mutation?.refreshNode]:data[mutation.name]})             
            refreshNode?.setLoading(false);          
          }
          const model = mutation.model || queryMeta?.model;
          data && bus.emit(
            EVENT_DATA_CHANGE,
            {
              changeType: pageJumper?.dataId ? DataChangeType.UPDATE : DataChangeType.CREATE, 
              model: model,
              data: model ? data[model] : undefined
            }
          )

          //如果全局提交，则更新缓存
          if(!mutation?.submitNode){
            mutate(data);
          }

          submitNode?.clearDirty();
          pageStore?.setSubmittingMutation(undefined);
        }

        dragItStore.setSuccessAlert(true)
        if(mutation?.goback){
          onPageAction && onPageAction({name:GO_BACK_ACTION})
        }
      },
      onError:()=>{
        const refesheNode = modelStore?.getModelNode(pageStore?.submittingMutation?.refreshNode) 
        refesheNode?.setLoading(false);
        pageStore?.setSubmittingMutation(undefined);
      }
    }
  );
  
  useShowServerError(error || muetationError);

  const hanlePageAction = (action:IPageAction)=>{
    switch (action.name){
      case OPEN_PAGE_ACTION:
        if(action.pageJumper?.openStyle === 'POPUP' || action.pageJumper?.openStyle === 'DRAWER'){
          setShowPopup(true);
          setPopupPageJumper(action.pageJumper)
          return;
        }
        onPageAction && onPageAction(action);
        return; 
      case SUBMIT_MUTATION:
        const submitNode = modelStore?.getModelNode(action.mutation?.submitNode)
        console.assert(submitNode, 'Page内错误，提交节点不存在：' + action.mutation?.submitNode);
        if(mutating||pageStore?.submittingMutation){
          console.error('有节点提交尚未完成，等完成再试');
        }
        if(submitNode?.validate()){
          if(action.mutation){
            pageStore?.setSubmittingMutation(action.mutation);
            const refreshNode = modelStore?.getModelNode(action.mutation.refreshNode) 
            refreshNode?.setLoading(true);
            const data = new MagicPostBuilder()
              .setModel(action.mutation.model || queryMeta?.model || '')
              .setSingleData(
                submitNode?.toInputValue()
              )
              .toData();
            excuteMutation({data});
          }           
        }
        else{
          setOpentAlert(true);
        }
        return;
      case GO_BACK_ACTION:
        if(modelStore?.isDirty()){
          dragItStore.confirmAction(intl.get('changing-not-save-message'), ()=>{
            onPageAction && onPageAction({name:GO_BACK_ACTION})
          })
          return;
        }
        break;
      case RESET_ACTION:
        if(action.resetNodes){
          action.resetNodes.forEach(nodeName =>{
            const resetNode = modelStore?.getModelNode(nodeName);
            resetNode?.reset();          
          })
        }
        else{
          modelStore?.reset();
        }
        return;
    }
    onPageAction && onPageAction(action);
  }

  const handleCloseAlert = ()=>{
    setOpentAlert(false);
  }

  const handleClosePopupPage = ()=>{
    setShowPopup(false)
  }

  return (
    <PageStoreProvider value = {pageStore}>
      <ActionStoreProvider value = {actionStore}>
        <ModelProvider value = {modelStore}>
          <ActionHunter onPageAction = {hanlePageAction} />
          {
            pageStore?.pageLayout?.map((child:RxNode<IMeta>)=>{
              return (
                <ComponentRender 
                  key={child.id} 
                  node={child} 
                />
              )
            })
          }
          <PopupPage 
            onPageAction = {onPageAction}
            open = {showPopup}
            pageJumper = {popupPageJumper}
            onClose={handleClosePopupPage}
          /> 
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
            <Debug />
          }
        </ModelProvider>
      </ActionStoreProvider>
    </PageStoreProvider>
  )
})
