import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { gql, useQuery } from '@apollo/react-hooks';
import { useAppStore } from 'Store/Helpers/useAppStore';
import intl from 'react-intl-universal';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';

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
  }`;
  const { loading, error: queryError, data } = useQuery(QUERY_DATA);
  useShowAppoloError(queryError)

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
        for(var i = 0; i < itemsData.length; i++){
          if(itemsData[i][itemKey] === option[itemKey]){
            return itemsData[i][name]
          }
        }
      }}

      groupBy = {(option) => option.module}
      onChange={(event, newValue) => {
        handleChange(newValue);
      }}

    />

  )
})

export default MultiSelectBox;
