import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { gql, useQuery } from '@apollo/react-hooks';
import { useAppStore } from 'store/helpers/useAppStore';
import intl from 'react-intl-universal';

const MultiSelectBox = React.forwardRef((
  props:{
    value?:Array<string>,
    onChange?:any,
    itemKey?:string,
    itemName?:string,
    fullWidth?:boolean,
    query?:string;
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
    onChange, 
    itemName = 'name',
    fullWidth,
    query,
    items,
    itemKey = 'id',
    groupByField,
    method,
    params,
    ...rest
  } = props;

  let key = query ? itemKey : 'slug';
  let name = query ? itemName : 'label';
  //const mountedRef = useRef(true);
  const [inputValue, setInputValue] = React.useState<Array<any>>(value||[]);

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
  const handleChange = (newValue:any)=>{
    setInputValue( newValue );

    onChange && onChange({
      target:{
        value:newValue,
      }
    });
  }

  return (
    <Autocomplete
      multiple = {true}
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

export default MultiSelectBox;
