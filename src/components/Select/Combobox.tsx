import React, { useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios, { AxiosRequestConfig } from 'axios';
import withSkeleton from 'base/HOCs/withSkeleton';
import { useBaseItems } from 'base/Hooks/useBaseItems';

const Combobox = React.forwardRef((
  props:{
    value?:string|[],
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
    groupBy?:string,
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
    url,
    ...rest
  } = props;


  let name = fromUrl ? itemName : 'label';
  //const mountedRef = useRef(true);
  const empertyValue = multiple ? []:'';
  const [request] = React.useState<AxiosRequestConfig|undefined>(
    fromUrl?
    {
      method:"get",
      url:url,
    }
    :
    undefined
  )
  const [menuItems, loading] = useBaseItems(request);

  const itemsData = (fromUrl? menuItems : items) as any;
  
  const [inputValue, setInputValue] = React.useState<any>(value||empertyValue);

  let options = itemsData?.map((item:any)=>item[name]);

  /*useEffect(() => {
    if(!fromUrl || !url){
      return;
    }
    setLoading(true);
    axios(
      {
        method:"get",
        url:url,
      }
    ).then(res => {
      if(mountedRef.current){
        setItemsData(res.data);
        setLoading(false);
      }
    })
    .catch(err => {
      setLoading(false);
    })
    
    return () => { 
      mountedRef.current = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);*/

  const handleChange = (newValue:any)=>{
    setInputValue( newValue );

    let value = newValue && newValue.length === 0 ? '' : newValue;
    onChange && onChange({
      target:{
        value:value,
      }
    });
  }

  return (
    <Autocomplete
      multiple = {multiple}
      options = {options||[]}
      loading = {!!loading }
      ref = {ref}
      value = {inputValue}
      freeSolo
      fullWidth = {fullWidth}
      //defaultValue = {value||empertyValue}
      renderInput={(params) => (
        <TextField
          ref={ref}
          {...params}
          {...rest}        
      />
      )}

      onChange={(event, newValue) => {
        handleChange(newValue);
      }}

    />

  )
})

//显式调用报错的缓兵之计，以后再改
let ComboboxAny  =  withSkeleton(Combobox) as any

export default ComboboxAny;
