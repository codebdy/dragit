import React, { Fragment, useEffect, useState } from 'react';
import { ItemMeta } from 'designer/Common/EditableList';
import { createStyles, Fab, IconButton, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import { API_ADD_MODULE, API_CHANGE_MODULE, API_GET_MODULES, API_REMOVE_MODULE } from 'APIs/modules';
import { useAxios } from 'base/Hooks/useAxios';
import { Skeleton, TreeItem, TreeView } from '@material-ui/lab';
import { AxiosRequestConfig } from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItemLabel from './TreeItemLabel';
import { Add } from '@material-ui/icons';
import { IModuleCategory } from 'base/Model/IModuleCategory';

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
  const [operateConfig, setOperateConfig] = React.useState<AxiosRequestConfig>();
  const [moduleCategories, loading] = useAxios<IModuleCategory[]>(loadingConfig);
  const [, operateLoading] = useAxios<ItemMeta>(operateConfig);

  const handleClick = (id:number)=>{
    setSelected(id);
    onSelect(id);
  }

  const handleOnChange = (newTitle:string, id:number)=>{
    setOperateConfig(
      {
        ...API_CHANGE_MODULE,
        params:{
          id:id,
          title:newTitle,
        }
      }
    );
  }

  const handleRemove = (id:number)=>{
    setLoadingConfig(
      {
        ...API_REMOVE_MODULE,
        params:{
          id:id,
        }
      }
    );    
  }

  const handleAdd = ()=>{
    setLoadingConfig(
      {
        ...API_ADD_MODULE,
        params:{
          title:'New Module'
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
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            className = {classes.treeRoot}
            disableSelection
            selected = {'' + selectedId}
          >
            {
              moduleCategories?.map(((category,index)=>{
                return(
                  <TreeItem 
                    key = {'category-' + category.id}
                    nodeId= {'category-' + category.id}
                    label = {
                      <TreeItemLabel
                        label = {category.name}
                        actions={
                          <IconButton edge="end" aria-label="comments" size="small">
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
                              <TreeItemLabel label = {module.name} />
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
          {
            /*<EditableList items = {items || []} 
              onChange = {handleOnChange}
              onRemove = {handleRemove}
              onAdd = {handleAdd}
              onSelect = {onSelect}
            /> */ 
          }
          <div className={classes.addArea}>
            <Fab color="primary" size="small" 
              //onClick = {onAdd}
            >
              <Add />
            </Fab>
          </div>
        </Fragment>
  
      }
    </Fragment>

  );
}
