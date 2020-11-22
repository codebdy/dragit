import React from 'react';
import {  Grid, LinearProgress } from '@material-ui/core';
import PrimaryText from 'base/PropsInputs/PrimaryText';
import intl from 'react-intl-universal';
import { ModuleMeta } from './ModuleContent';
import ModulePageTable from './ModulePageTable';
import { API_UPDATE_MODULE_PAGE, API_REMOVE_MODULE_PAGE, API_ADD_MODULE_PAGE, API_UPDATE_MODULE_INDEX_PAGE } from 'APIs/modules';
import { useAxios } from 'base/Hooks/useAxios';
import { IPage } from 'base/IPage';
import PageEditor from 'designer/PageEditor';


export default function ModulePages(props:{module:ModuleMeta}){
  //const {module} = props;
  const [designedPage, setDesignedPage] = React.useState<IPage>();
  const [operateConfig, setOperateConfig] = React.useState<any>();
  const [operateModule, operateLoading] = useAxios<ModuleMeta>(operateConfig);
  
  const module = operateModule || props.module;

  const handleChangePage = (page:IPage)=>{
    setOperateConfig({
      ...API_UPDATE_MODULE_PAGE,
      params:{
        moduleId:module.id
      },
      data:{
        page:page
      }
    })
  }

  const handleRemove = (pageId:number)=>{
    setOperateConfig({
      ...API_REMOVE_MODULE_PAGE,
      params:{
        moduleId:module.id,
        pageId
      }
    })
  }

  const handleAddPage = ()=>{
    setOperateConfig({
      ...API_ADD_MODULE_PAGE,
      params:{
        moduleId:module.id,
        title:'New Page',
      }
    })    
  }

  const handelChangeIndexPage = (pageId:number, indexed:boolean)=>{
    setOperateConfig({
      ...API_UPDATE_MODULE_INDEX_PAGE,
      params:{
        moduleId:module.id,
        indexPageId: indexed ? pageId : -1,
      }
    })  
  }

  const handelDesign = (page:IPage)=>{
    setDesignedPage(page);
  }

  const handleDesignerClose = ()=>{
    setDesignedPage(undefined);
  }

  return (
      <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item>
          <h2>
            <PrimaryText>
              {intl.get('module-pages')}
            </PrimaryText>
          </h2>
        </Grid>
        {operateLoading && <LinearProgress />}
        <Grid item xs={12}>
          <ModulePageTable 
            pages = {module.pages || []} 
            onChangePage = {handleChangePage}
            onRemovePage = {handleRemove}
            indexPageId = {module.indexPageId || -1}
            onAddPage = {handleAddPage}
            onChangeIndexPage = {handelChangeIndexPage}
            onDesign = {handelDesign}
          />
        </Grid>
        {designedPage &&
          <PageEditor 
            pageId = {designedPage.id} 
            onClose = {handleDesignerClose}
          ></PageEditor>
        }
      </Grid>
  )
}
