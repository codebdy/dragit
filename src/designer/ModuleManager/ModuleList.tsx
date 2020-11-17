import React, { Fragment } from 'react';
import EditableList, { ItemMeta } from 'designer/Common/EditableList';
import { LinearProgress } from '@material-ui/core';
import { API_CHANGE_MODULE, API_GET_MODULES, API_REMOVE_MODULE } from 'APIs/modules';
import { useAxios } from 'base/Hooks/useAxios';

export default function ModuleList() {
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

  return (
    <Fragment>
      {
        loading &&
        <LinearProgress />
      }
      <EditableList items = {items || []} 
        onChange = {handleOnChange}
        onRemove = {handleRemove}
      />      
    </Fragment>

  );
}
