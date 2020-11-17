import React, { Fragment } from 'react';
import EditableList, { ItemMeta } from 'designer/Common/EditableList';
import { LinearProgress } from '@material-ui/core';
import { API_ADD_MODULE, API_CHANGE_MODULE, API_GET_MODULES, API_REMOVE_MODULE } from 'APIs/modules';
import { useAxios } from 'base/Hooks/useAxios';
import { Skeleton } from '@material-ui/lab';

export default function ModuleList(props:{
  onSelect:(moduleId: number)=>void
}) {
  const {onSelect} = props;
  const [loadingConfig, setLoadingConfig] = React.useState(API_GET_MODULES);
  const [items, loading] = useAxios<ItemMeta[]>(loadingConfig);

  const handleOnChange = (newTitle:string, id:number)=>{
    setLoadingConfig(
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
            loading &&
            <LinearProgress />
          }
          <EditableList items = {items || []} 
            onChange = {handleOnChange}
            onRemove = {handleRemove}
            onAdd = {handleAdd}
            onSelect = {onSelect}
          />      
        </Fragment>
  
      }
    </Fragment>

  );
}
