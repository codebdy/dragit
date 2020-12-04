import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { AxiosRequestConfig } from 'axios';
import { useBaseItems } from 'base/Hooks/useBaseItems';

const MultiSelect = React.forwardRef((
  props:{
    value?:Array<number|string>,
    multiple?:boolean,
    onChange?:any,
    itemKey?:string,
    itemName?:string,
    fullWidth?:boolean,
    api?:AxiosRequestConfig;
    items?:Array<any>;
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
    api,
    items,
    itemKey = 'id',
    groupByField,
    method,
    params,
    ...rest
  } = props;

  let key = api ? itemKey : 'slug';
  let name = api ? itemName : 'label';
  //const mountedRef = useRef(true);
  const [request] = React.useState<AxiosRequestConfig|undefined>(api)
  const [menuItems, loading] = useBaseItems(request);
  const itemsData = (api? menuItems : items) as any;  
  const [inputValue, setInputValue] = React.useState<Array<any>>([]);

  useEffect(()=>{
    setInputValue(keysToItem(value||[]))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsData, value])
  const keysToItem = (values:Array<any>)=>{
    if(!itemsData || !values){
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

export default MultiSelect;
