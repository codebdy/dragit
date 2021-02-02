import React from 'react';
import { createStyles, Grid, makeStyles, TextField, Theme } from '@material-ui/core';
import { PropsInputProps } from './PropsEditorProps';
import { useState } from 'react';
import { useEffect } from 'react';
import { stringValue } from 'rx-drag/utils/stringValue';
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subItem:{
      marginLeft:theme.spacing(2),
    },
  }),
);

interface IUpdateMutation{
  name?:string;
  variableType?:string;
  variableName?:string;
}

export default function UpdateMutationInput(props:PropsInputProps){
  const {label, value, onChange, ...rest} = props;
  const classes = useStyles();
  const [inputValue, setInputValue] = useState<IUpdateMutation>({} as IUpdateMutation);

  useEffect(()=>{
    setInputValue(value);
  },[value])

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string).trim();
    setInputValue({...inputValue, name:newValue});
  }; 

  const handleVariableNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string).trim();
    setInputValue({...inputValue, variableName:newValue});
  }; 

  const handleVariableTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string).trim();
    setInputValue({...inputValue, variableType:newValue});
  }; 

  const handleBlur = ()=>{
    onChange(inputValue);  
  }

  return (
    <>
      <Grid item xs = {12}>
        <TextField
          label={label}
          value={stringValue(inputValue.name)}
          onChange={handleNameChange}
          onBlur = {handleBlur}
          size="small"
          fullWidth
          variant = "outlined"
          {...rest}
        />
      </Grid>
      <Grid item xs = {12} container spacing = {2} className = {classes.subItem}>
        <Grid item xs = {12} >
          <TextField
            label={intl.get('variable-name')}
            value={stringValue(inputValue.variableName)}
            onChange={handleVariableNameChange}
            onBlur = {handleBlur}
            size="small"
            fullWidth
            variant = "outlined"
            {...rest}
          />
        </Grid>

        <Grid item xs = {12}>
          <TextField
            label={intl.get('variable-type')}
            value={stringValue(inputValue.variableType)}
            onChange={handleVariableTypeChange}
            onBlur = {handleBlur}
            size="small"
            fullWidth
            variant = "outlined"
            {...rest}
          />
        </Grid>

      </Grid>
    </>
  )
}
