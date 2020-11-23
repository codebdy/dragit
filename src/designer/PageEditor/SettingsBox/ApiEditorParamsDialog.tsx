import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import intl from "react-intl-universal";
import PropsDialog from 'base/PropsInputs/PropsDialog';
import MetaListInput, { MetaItem } from 'base/PropsInputs/MetaListInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'column',
      width:'100%',
    },

  }),
);

function paramsToArray(params:any):Array<MetaItem>{
  let rtArray:Array<MetaItem> = [];
  if(!params){
    return rtArray
  }

  for(var key in params){
    rtArray.push(
      {
        slug:key,
        label:params[key],
      }
    )
  }
    
  return rtArray
}

function arrayToParams(array : Array<MetaItem>):any{
  if(!array || array.length === 0){
    return;
  }

  let rtValue = {} as any;

  array.forEach(item=>{
    rtValue[item.slug] = item.label;
  })

  return rtValue;
}

export default function ApiEditorParamsDialog(
  props:{
    value:any,
    onChange:(value:any)=>void,
  }
){
  const {value, onChange} = props;
  const classes = useStyles();
  const [paramsArray, setParamsArray] = useState(paramsToArray(value));
  const [defaultValue] = useState(value)

  const handleSaveParams = ()=>{
    onChange(arrayToParams(paramsArray));
  }

  const handleChange = (valueArray:Array<MetaItem>)=>{
    setParamsArray(valueArray);
  }

  const handleOnCancel = ()=>{
    setParamsArray(paramsToArray(defaultValue));
  }
 
  return (
    <PropsDialog 
      label={intl.get('params') + ' ···'} 
      title = {intl.get('edit-params')} 
      onSave = {handleSaveParams}
      onCancel = {handleOnCancel}
    >
      <div className = {classes.root}>
        <MetaListInput 
          value={paramsArray}  
          onChange = {handleChange}
          slugLabel = {intl.get('param')}
          valueLabel = {intl.get('value')}
        />        
      </div>

    </PropsDialog>
  )
}
