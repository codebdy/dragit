import React, { useEffect, useState } from 'react';
import { Container, Grid, createStyles, makeStyles, Theme, LinearProgress} from '@material-ui/core';
import intl from 'react-intl-universal';
import { Fragment } from 'react';
import { useAxios } from 'base/Hooks/useAxios';
import { API_ADD_MODULE_PAGE, API_GET_MODULE_BY_ID, API_REMOVE_MODULE_PAGE, API_UPDATE_MODULE_INDEX_PAGE, API_UPDATE_MODULE_PAGE } from 'APIs/modules';
import { Skeleton } from '@material-ui/lab';
import ModulePageTable from './ModulePageTable';
import PageEditor from 'designer/PageEditor';
import { IPage } from 'base/IPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skeltonBottom:{
      height: 'calc(100vh - 150px)',
    },
    title:{
      color:theme.palette.text.primary,
    }
  }),
);

export interface ModuleMeta{
  id:number,
  title:string,
  pages?:IPage[],
  indexPageId?:number,
}

export default function ModuleContent(
  props:{
    moduleId:number
  }
){
  const {moduleId} = props;
  const classes = useStyles();
  const [designedPage, setDesignedPage] = React.useState<IPage>();
  const [loadingConfig, setLoadingConfig] = React.useState({
    ...API_GET_MODULE_BY_ID,
    params:{
      id:moduleId
    }
  });

  const [operateConfig, setOperateConfig] = React.useState<any>();
  const [initModule, loading] = useAxios<ModuleMeta>(loadingConfig);
  const [operateModule, operateLoading] = useAxios<ModuleMeta>(operateConfig);
  const [module, setModule] = useState(initModule);

  useEffect(()=>{
    if(loadingConfig.params.id !== moduleId){
      setLoadingConfig(
        {
          ...API_GET_MODULE_BY_ID,
          params:{
            id:moduleId
          }
        }        
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId])

  useEffect(()=>{
    initModule && setModule(initModule);
  },[initModule]);

  useEffect(()=>{
    operateModule && setModule({...operateModule})
  },[operateModule]);

  const handleChangePage = (page:IPage)=>{
    setOperateConfig({
      ...API_UPDATE_MODULE_PAGE,
      params:{
        moduleId
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
        moduleId,
        pageId
      }
    })
  }

  const handleAddPage = ()=>{
    setOperateConfig({
      ...API_ADD_MODULE_PAGE,
      params:{
        moduleId:moduleId,
        title:'New Page',
      }
    })    
  }

  const handelChangeIndexPage = (pageId:number, indexed:boolean)=>{
    setOperateConfig({
      ...API_UPDATE_MODULE_INDEX_PAGE,
      params:{
        moduleId:moduleId,
        indexPageId: indexed ? pageId : -1,
      }
    })  
  }

  const handleDesignerClose = ()=>{
    setDesignedPage(undefined);
  }

  const handelDesign = (page:IPage)=>{
    setDesignedPage(page);
  }

  return (
    <Container>
      {
        loading && 
        <Fragment>
          <Skeleton animation="wave" height={50} width="30%" style={{ marginTop: 6 }} />
          <Skeleton animation="wave" variant="rect" className={classes.skeltonBottom} />
        </Fragment>
      }
      {
        module && !loading ? 
        <Fragment>
          <Grid container spacing={2} justify="space-between" alignItems="center">
            <Grid item>
              <h2 className={classes.title}>
                {intl.get('module-management')} : {module.title}
              </h2>
            </Grid>
          </Grid>
          {operateLoading && <LinearProgress />}
          <Grid container spacing={2}>
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
          </Grid>        
        </Fragment>
        :
        <div></div>
      }
      {designedPage &&
        <PageEditor 
          pageId = {designedPage.id} 
          onClose = {handleDesignerClose}
        ></PageEditor>
      }
    </Container>

  )
}
