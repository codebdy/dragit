import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { gql, useQuery } from '@apollo/react-hooks';
import { useAppStore } from 'store/helpers/useAppStore';
import intl from 'react-intl-universal';

const Combobox = React.forwardRef((
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
  const { loading, error: queryError, data } = useQuery(QUERY_DATA);
  const appStore = useAppStore();
  
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
      loading = {!!loading }
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

export default Combobox;
