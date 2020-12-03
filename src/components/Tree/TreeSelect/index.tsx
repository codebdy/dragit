import { createStyles, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, Switch, Theme } from '@material-ui/core';
import withSkeleton from 'base/HOCs/withSkeleton';
import React from 'react';
import ChipsInput from './ChipsInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropDownButton: {
      marginRight:theme.spacing(-1),
    },

  }),
);

const TreeSelect = React.forwardRef((props:any, ref:any)=>{
  const {label, name, onChange,  value,  fullWidth, error, helperText, ...rest} = props;
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.checked
    onChange && onChange({
      target:{
        name:name,
        value:newValue,        
      }
    });
  }; 
  
  return (
    <FormControl variant="outlined" >
      <InputLabel htmlFor={name} shrink={!!value} style={{background:'#fff'}}>{label}</InputLabel>
      <OutlinedInput
        id={name}
        //value={values.weight}
        onChange={handleChange}

        inputProps={{
          'aria-label': label,
        }}
        inputComponent = {ChipsInput}
        labelWidth={0}
      />
      <FormHelperText id={`${name}-helper-text`}>helperText</FormHelperText>
    </FormControl>

  )
})


export default withSkeleton(TreeSelect);
