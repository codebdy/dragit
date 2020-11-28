import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { AxiosRequestConfig } from 'axios';
import withSkeleton from 'base/HOCs/withSkeleton';
import { useBaseItems } from 'base/Hooks/useBaseItems';

const MultiSelect = React.forwardRef((
  props:{
    value?:[],
    multiple?:boolean,
    onChange?:any,
    itemKey?:string,
    itemName?:string,
    fullWidth?:boolean,
    fromUrl?:boolean;
    items?:Array<any>;
    url?:string,
    label?:string, 
    variant?:any, 
    size?:any,
    groupByField?:string,
    method?:any,
    params?:any
  },
  ref:any
)=>{
  const{value, 
    multiple, 
    onChange, 
    itemName = 'name',
    fullWidth,
    fromUrl,
    items,
    itemKey = 'id',
    groupByField,
    method,
    params,
    url,
    ...rest
  } = props;

  let key = fromUrl ? itemKey : 'slug';
  let name = fromUrl ? itemName : 'label';
  //const mountedRef = useRef(true);
  const [request] = React.useState<AxiosRequestConfig|undefined>(
    fromUrl?
    {
      method: method,
      params: params,
      url:url,
    }
    :
    undefined
  )
  const [menuItems, loading] = useBaseItems(request);
  const itemsData = (fromUrl? menuItems : items) as any;  
  const [inputValue, setInputValue] = React.useState<Array<any>>([]);

  useEffect(()=>{
    setInputValue(keysToItem(value||[]))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsData, value])
  const keysToItem = (values:Array<any>)=>{
    if(!itemsData){
      return [];
    }
    return values.map((oneValue:any)=>{
        for(var i = 0; i < itemsData.length; i++){
          // eslint-disable-next-line eqeqeq
          if(itemsData[i][key] == oneValue){
            return itemsData[i];
          }
        }
        return {};        
      })
  }

  const handleChange = (newValue:any)=>{
    setInputValue( newValue );

    onChange && onChange({
      target:{
        value:newValue?.map((value:any)=>value[key]),
      }
    });
  }

  return (
    <Autocomplete
      multiple = {multiple}
      options = {itemsData||[]}
      loading = {!!loading }
      ref = {ref}
      value = {inputValue}

      fullWidth = {fullWidth}
      //defaultValue = {value||empertyValue}
      renderInput={(params) => (
        <TextField
          ref={ref}
          {...params}
          {...rest}        
      />
      )}

      getOptionSelected = {(option, value)=>{
        return option[key] === value[key]
      }}

      getOptionLabel={(option) => {
        return option[name]
      }}

      groupBy = {(option) => option.module}
      onChange={(event, newValue) => {
        handleChange(newValue);
      }}

    />

  )
})

//显式调用报错的缓兵之计，以后再改
let MultiSelectBox  =  withSkeleton(MultiSelect) as any

export default MultiSelectBox;
