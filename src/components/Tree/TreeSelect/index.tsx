import { createStyles, FilledInput, FormControl, FormHelperText, Input, InputLabel, makeStyles, OutlinedInput, Theme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useAxios } from 'base/Hooks/useAxios';
import { ITreeNode } from 'base/Model/ITreeNode';
import React from 'react';
import ChipsInput from './ChipsInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropDownButton: {
      marginRight:theme.spacing(-1),
    },

    label:{
      padding:theme.spacing(0, 1),
      background: theme.palette.background.paper,
    }

  }),
);

const TreeSelect = React.forwardRef((props:any, ref:any)=>{
  const {label, 
    name, 
    variant, 
    onChange,  
    value,  
    fullWidth, 
    error, 
    helperText, 
    nameKey, 
    multiSelect, 
    height,
    dataApi,
    size, 
    isDeisgning,
    ...rest} = props;
  const classes = useStyles();
  const [rootNodes, loading] = useAxios<Array<ITreeNode>>(dataApi)
  let InputControl = Input;
  if(variant === 'outlined'){
    InputControl = OutlinedInput;
  }
  if(variant === 'filled'){
    InputControl = FilledInput;
  }

  let values = multiSelect ?(value||[]) : (value ? [value]:[]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value
    onChange && onChange({
      target:{
        name:name,
        value:multiSelect ? newValue : (newValue && newValue.length > 0 ? newValue[0] : undefined),        
      }
    });
  }; 

  return (
    <FormControl variant="outlined" error = {error} fullWidth = {fullWidth} ref={ref}>
      <InputLabel htmlFor={name} shrink={values.length > 0} className = {classes.label}>{label}</InputLabel>
      {
        loading?
          <Skeleton animation="wave" height={60} /> 
        :
          <InputControl
            name = {name}
            value={
              {
                values:values,
                rootNodes:rootNodes,
                nameKey:nameKey,
                height:height,
                size:size,
                multiSelect:multiSelect,
                isDeisgning:isDeisgning,
              }
            }
            onChange={handleChange}
            inputProps={{
              'aria-label': label,
            }}
            inputComponent = {
              ChipsInput
            }
            {...rest}
          />
      }
      <FormHelperText id={`${name}-helper-text`}>{helperText}</FormHelperText>
    </FormControl>

  )
})

export default TreeSelect;
