import React from 'react';
import {  Grid, LinearProgress } from '@material-ui/core';
import PrimaryText from 'base/PropsInputs/PrimaryText';
import intl from 'react-intl-universal';
import { IModule } from "base/Model/IModule";
import ModulePageTable from './ModulePageTable';
import { IPage } from 'base/Model/IPage';
import { PageEditor } from 'design/PageEditor';
import createId from 'utils/createId';
import { ID } from 'base/Model/graphqlTypes';


export default function ModulePages(props:{module:IModule}){
  //const {module} = props;
  const [designedPage, setDesignedPage] = React.useState<IPage>();
  const [operateConfig, setOperateConfig] = React.useState<any>();
  //const [operateModule, operateLoading] = useAxios<IModule>(operateConfig);
  
  //const module = operateModule || props.module;

  const handleChangePage = (page:IPage)=>{
    /*setOperateConfig({
      ...API_UPDATE_MODULE_PAGE,
      //params:{
      //  moduleId:module.id
      //},
      data:{
        page:page
      }
    })*/
  }

  const handleRemove = (pageId:ID)=>{
   /* setOperateConfig({
      ...API_REMOVE_MODULE_PAGE,
      params:{
        moduleId:module.id,
        pageId
      }
    })*/
  }

  const handleAddPage = ()=>{
    /*setOperateConfig({
      ...API_ADD_MODULE_PAGE,
      params:{
        moduleId:module.id,
        name:'New Page',
        slug:'new-slug' + createId(),
      }
    })    */
  }

  const handelChangeIndexPage = (pageId:ID, indexed:boolean)=>{
    /*setOperateConfig({
      ...API_UPDATE_MODULE_INDEX_PAGE,
      params:{
        moduleId:module.id,
        entry_page_id: indexed ? pageId : -1,
      }
    })  */
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
        <Grid item xs={12}>
          {/*operateLoading && <LinearProgress />
          <ModulePageTable 
            pages = {module.pages || []} 
            onChangePage = {handleChangePage}
            onRemovePage = {handleRemove}
            //entry_page_id = {module.entry_page_id || ''}
            onAddPage = {handleAddPage}
            onChangeIndexPage = {handelChangeIndexPage}
            onDesign = {handelDesign}
          />*/}
        </Grid>
        {designedPage &&
          <PageEditor 
            pageSlug = {designedPage.slug} 
            onClose = {handleDesignerClose}
          ></PageEditor>
        }
      </Grid>
  )
}
