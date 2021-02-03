import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { gql, useQuery } from '@apollo/react-hooks';

import { useShowAppoloError } from 'Store/Helpers/useInfoError';

export const MultiSelectBox = React.forwardRef((
  props:{
    value?:Array<any>,
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
    params?:any,
    loading?:boolean,
  },
  ref:any
)=>{
  const{
    value, 
    onChange, 
    itemKey = 'id',    
    itemName = 'name',
    fullWidth,
    query,
    items,
    loading,
    groupByField,
    method,
    params,
    ...rest
  } = props;

  let key =itemKey;
  let name =itemName;

  const QUERY_DATA = gql`
  query {
    ${query}{
      id
      ${itemName}
      ${groupByField}
    }
  }`;
  const { loading:queryLoading, error: queryError, data } = useQuery(QUERY_DATA);
  useShowAppoloError(queryError)

  const itemsData = (query? (data&&data[query])||[] : items) as any;
  const handleChange = (event:any, newValue:any)=>{
    onChange && onChange({
      target:{
        value:newValue||[],
      }
    });
  }

  return (
    <Autocomplete
      multiple = {true}
      options = {itemsData||[]}
      loading = {loading || queryLoading }
      ref = {ref}
      value = {value||[]}
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
        for(var i = 0; i < itemsData?.length; i++){
          const groupNanme = itemsData[i][groupByField||''];
          const label = itemsData[i][name];
          if(itemsData[i][itemKey] === option[itemKey]){
            return groupNanme ? groupNanme + '>' + label : label
          }
        }
      }}

      renderOption={(option) => {
        for(var i = 0; i < itemsData?.length; i++){
          if(itemsData[i][itemKey] === option[itemKey]){
            return itemsData[i][name]
          }
        }
      }}

      groupBy = {(option) => option[groupByField||'']}
      onChange={handleChange}
    />

  )
})

//const MultiSelectBoxAny = withFormField(MultiSelectBox) as any;

//export default MultiSelectBoxAny;
