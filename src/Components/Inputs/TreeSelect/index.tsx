import { createStyles, FilledInput, FormControl, FormHelperText, Input, InputLabel, makeStyles, OutlinedInput, Theme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect } from 'react';
import ChipsInput from './ChipsInput';
import intl from 'react-intl-universal';
import { useDesign } from 'rx-drag/store/useDesign';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { useMagicQuery } from 'Data/useMagicQuery';
import { MagicQueryBuilder } from 'Data/MagicQueryBuilder';

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

export const TreeSelect = React.forwardRef((props:any, ref:any)=>{
  const {label, 
    name, 
    variant, 
    onChange,  
    value,  
    fullWidth, 
    error, 
    helperText, 
    nameKey = 'name', 
    multiSelect, 
    height,
    query,
    loading,
    size, 
    ...rest} = props;
  const classes = useStyles();

  const { loading:queryLoading, error: queryError, data } = useMagicQuery(new MagicQueryBuilder().setTreeCommand());
  const appStore = useDragItStore();
  const {isDesigning} = useDesign();
  
  useEffect(()=>{
    if(queryError){
      appStore.infoError(intl.get('server-error'), queryError?.message)
      console.log( queryError);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryError])
  
  let InputControl = Input;
  if(variant === 'outlined'){
    InputControl = OutlinedInput;
  }
  if(variant === 'filled'){
    InputControl = FilledInput;
  }

  let values = multiSelect ?(value||[]) : (value ? [value]:[]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value as any
    onChange && onChange({
      target:{
        name:name,
        value:multiSelect ? newValue?.map((item:any)=>({id:item.id})) : (newValue && newValue.length > 0 ? {id:newValue[0].id} : undefined),        
      }
    });
  }; 

  return (
    <FormControl variant="outlined" error = {error} fullWidth = {fullWidth} ref={ref}>
      <InputLabel htmlFor={name} shrink={values.length > 0} className = {classes.label}>{label}</InputLabel>
      {
        loading || queryLoading?
          <Skeleton animation="wave" height={60} /> 
        :
          <InputControl
            name = {name}
            value={
              {
                values:values,
                rootNodes:(data)||[],
                nameKey:nameKey,
                height:height,
                size:size,
                multiSelect:multiSelect,
                isDesigning:isDesigning,
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
