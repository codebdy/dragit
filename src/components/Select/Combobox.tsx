import React, { useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { SelectItems } from './SelectBox';
import axios from 'axios';

const Combobox = React.forwardRef((
  props:{
    value?:string|[],
    multiple?:boolean,
    onChange:any,
    itemKey?:string,
    itemName?:string,
    data:SelectItems,  
  },
  ref:any
)=>{
  const{value, 
    multiple, 
    onChange, 
    itemName = 'name',
    data,
    ...rest
  } = props;

  const {
    fromUrl,
    url,
  } = data;

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

    onChange && (onChange(newValue && newValue.length === 0 ? '' : newValue));
  }

  return (
    <Autocomplete
      multiple = {multiple}
      options = {options}
      freeSolo
      loading = {loading}

      value = {inputValue}
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

export default Combobox
