import React, { useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';
import withSkeleton from 'base/HOCs/withSkeleton';

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
  const mountedRef = useRef(true);
  const [loading, setLoading] = React.useState(false);

  const empertyValue = multiple ? []:'';
  
  const [itemsData, setItemsData] = React.useState(items||[]);
  const [inputValue, setInputValue] = React.useState<any>(value||empertyValue);

  let options = itemsData.map((item:any)=>item[name]);

  useEffect(() => {
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
  },[]);

  const handleChange = (newValue:any)=>{
    setInputValue( newValue );

    onChange && (onChange(newValue && newValue.length === 0 ? '' : newValue));
  }

  return (
    <Autocomplete
      multiple = {multiple}
      options = {options}
      loading = {loading}
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
