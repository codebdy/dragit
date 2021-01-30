import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { gql, useQuery } from '@apollo/react-hooks';
import intl from 'react-intl-universal';
import { useDragItStore } from 'Store/Helpers/useDragItStore';

export const Combobox = React.forwardRef((
  props:{
    value?:string|[],
    multiple?:boolean,
    onChange?:any,
    itemKey?:string,
    itemName?:string,
    fullWidth?:boolean,
    query?:string;
    items?:Array<any>;
    label?:string, 
    variant?:any, 
    size?:any,
    groupBy?:string,
    loading?:boolean,
  },
  ref:any
)=>{
  const{value, 
    multiple, 
    onChange, 
    itemName = 'name',
    fullWidth,
    query,
    items,
    loading,
    ...rest
  } = props;


  let name = query ? itemName : 'label';
  //const mountedRef = useRef(true);
  const empertyValue = multiple ? []:'';
  const QUERY_DATA = gql`
    query {
      ${query}{
        id
        ${itemName}
      }
    }
  `;
  const { loading:queryLoading, error: queryError, data } = useQuery(QUERY_DATA);
  const appStore = useDragItStore();
  
  useEffect(()=>{
    if(queryError){
      appStore.infoError(intl.get('server-error'), queryError?.message)
      console.log( queryError);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryError])
  

  const itemsData = (query? (data&&data[query])||[] : items) as any;
  
  const [inputValue, setInputValue] = React.useState<any>(value||empertyValue);

  let options = itemsData?.map((item:any)=>item[name]);

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
      loading = {loading ||queryLoading }
      ref = {ref}
      value = {inputValue}
      freeSolo
      fullWidth = {fullWidth}
      //defaultValue = {value||empertyValue}
      renderInput={(params) => (
        <TextField
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

