import React, { useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { SelectItems } from './SelectInput';
import axios from 'axios';

const ComboboxInput = React.forwardRef((
  props:{
    value?:string|[],
    //label?:string,
    //variant?:string,
    multiple?:boolean,
    freeSolo?:boolean,
    onChange:any,
    //required?:boolean,
    itemKey?:string,
    itemName?:string,
    data:SelectItems,  
  },
  ref:any
)=>{
  const{value, 
    //label, 
    //variant, 
    multiple, 
    freeSolo,
    onChange, 
    //withoutEmpertyItem, 
    itemKey = 'id',
    itemName = 'name',
    data,
    ...rest
  } = props;

  const {
    fromUrl,
    //items,
    url,
  } = data;

  let key = fromUrl ? itemKey : 'slug';
  let name = fromUrl ? itemName : 'label';
  const mountedRef = useRef(true);
  const [loading, setLoading] = React.useState(false);

  const empertyValue = multiple ? []:'';
  
  const [items, setItems] = React.useState(data.items||[]);
  const [inputValue, setInputValue] = React.useState<any>(value||empertyValue);

  let options = items.map((item:any)=>item[name]);

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
        setItems(res.data);
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
    let changedValue = multiple?
        newValue.map((item:any)=>{return item && item[key]})
        :
        (newValue && newValue[key]);
    onChange(changedValue && changedValue.length === 0 ? undefined : changedValue);
  }

  return (
    <Autocomplete
      multiple = {multiple}
      options = {options}
      freeSolo
      loading = {loading}

      value = {inputValue}
      
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

export default ComboboxInput
