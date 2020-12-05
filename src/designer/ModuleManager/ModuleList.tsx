import React, { Fragment, useEffect, useState } from 'react';
import { createStyles, Fab, IconButton, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import { API_ADD_MODULE, API_ADD_MODULE_CATEGORY, API_CHANGE_CATEGORY, API_CHANGE_MODULE, API_GET_MODULES, API_REMOVE_MODULE, API_REMOVE_MODULE_CATEGORY } from 'APIs/modules';
import { useAxios } from 'base/Hooks/useAxios';
import { Skeleton, TreeItem, TreeView } from '@material-ui/lab';
import axios, { AxiosRequestConfig } from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItemLabel from './TreeItemLabel';
import { Add } from '@material-ui/icons';
import { IModuleCategory } from 'base/Model/IModuleCategory';
import { IModule } from 'base/Model/IModule';
import Scrollbar from 'admin/common/Scrollbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    treeRoot: {
      padding:theme.spacing(1),
    },
    addArea:{
      display:'flex',
      justifyContent:'center',
      //padding:theme.spacing(1),
    },
    item:{
      margin:theme.spacing(0.5, 0),
    }
  }),
);

export default function ModuleList(props:{
  onSelect:(moduleId: number)=>void
}) {
  const {onSelect} = props;
  const classes = useStyles();
  const [selectedId, setSelected] = useState(-1);
  const [loadingConfig, setLoadingConfig] = React.useState<AxiosRequestConfig>(API_GET_MODULES);
  const [moduleCategories, loading] = useAxios<IModuleCategory[]>(loadingConfig);
  const [categories, setCategories] = useState<IModuleCategory[]>([]);
  //const [, operateLoading] = useAxios<ItemMeta>(operateConfig);
  const [operateLoading, setOperateLoading] = useState(false);

  useEffect(()=>{
    if(moduleCategories){
      setCategories(moduleCategories);
    }
  }, [moduleCategories])

  const handleClick = (id:number)=>{
    setSelected(id);
    onSelect(id);
  }

  const submitOperate = (request:AxiosRequestConfig)=>{
    setOperateLoading(true);
    axios( request ).then(res => {
      setOperateLoading(false);
      //操作成功后重新加载
      setLoadingConfig({...API_GET_MODULES});
    })
    .catch(error => {
      console.log('server error:ModuleList', error);
      setOperateLoading(false);
    })  
  }

  const handleChangeCategoryName = (name:string|undefined, category:IModuleCategory)=>{
    submitOperate(
      {
        ...API_CHANGE_CATEGORY,
        params:{
          id:category.id,
          name:name,
        }
      }
    );
  }

  const handleChangeModuleName = (name:string|undefined, module:IModule)=>{
    submitOperate(
      {
        ...API_CHANGE_MODULE,
        params:{
          id:module.id,
          name:name,
        }
      }
    );
  }

  const onHandleAddCategory = ()=>{
    submitOperate( {
      ...API_ADD_MODULE_CATEGORY,
      params:{
        name:'New Category'
      }
    })
  }

  const handleAddModule = (cagegoryId:number)=>{
    submitOperate(
      {
        ...API_ADD_MODULE,
        params:{
          name:'New Module',
          cagegoryId:cagegoryId,
        }
      }
    );   
  }

  const handleRemoveCategory = (id:number)=>{
    submitOperate(
      {
        ...API_REMOVE_MODULE_CATEGORY,
        params:{
          id:id,
        }
      }
    );    
  }

  const handleRemoveModule = (id:number)=>{
    submitOperate(
      {
        ...API_REMOVE_MODULE,
        params:{
          id:id,
        }
      }
    );    
  }

  const showSkeleton = loadingConfig === API_GET_MODULES && loading;

  return (
    <Fragment>
      {
        showSkeleton ?
        <div style={{margin:'16px'}}>
          {
           (new Array(5).fill('')).map((i,index)=>{
              return (<Skeleton key={index} animation="wave" height={50}/>)
            })
          }

        </div>
        :
        <Fragment>
          {
            (loading || operateLoading)&&
            <LinearProgress />
          }
          <div style={{flex:1, display:'flex', flexFlow:'column'}}>
            <Scrollbar>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                className = {classes.treeRoot}
                disableSelection
                selected = {'' + selectedId}
              >
                {
                  categories?.map(((category,index)=>{
                    return(
                      <TreeItem 
                        key = {'category-' + category.id}
                        nodeId= {'category-' + category.id}
                        label = {
                          <TreeItemLabel
                            label = {category.name}
                            onChangeName = {(name?:string)=>handleChangeCategoryName(name, category)}
                            onRemove = {()=>{handleRemoveCategory(category.id)}}
                            actions={
                              <IconButton edge="end" aria-label="comments" size="small"
                                onClick = {()=>handleAddModule(category.id)}
                              >
                                <Add fontSize="small"/>
                              </IconButton>
                            }
                          />                        
                        }
                      >
                        {
                          category.modules?.map((module)=>{
                            return (
                              <TreeItem
                                key = {module.id} 
                                nodeId={module.id.toString()} 
                                className = {classes.item}
                                label = {
                                  <TreeItemLabel label = {module.name}
                                    onChangeName = {(name?:string)=>handleChangeModuleName(name, module)}
                                    onRemove = {()=>{handleRemoveModule(module.id)}}
                                  />
                                }
                                onClick = {()=>handleClick(module.id)}
                              />
                            )
                          })
                        }
                      </TreeItem>                  
                    )
                  }))

                }
              </TreeView>
              <div className={classes.addArea}>
                <Fab color="primary" size="small" 
                  onClick = {onHandleAddCategory}
                >
                  <Add />
                </Fab>
              </div>          
            </Scrollbar>
          </div>

        </Fragment>
  
      }
    </Fragment>

  );
}
