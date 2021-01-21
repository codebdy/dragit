import React from 'react';
import { makeStyles, Theme, createStyles, Grid, TextField, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import ApiEditorParamsDialog from './ApiEditorParamsDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
    },
    label:{
      marginTop:theme.spacing(1),
      paddingBottom:theme.spacing(2),
    },
    container:{
      paddingLeft:theme.spacing(2),
    }
  }),
);

export default function ApiEditor(
  props:{
    label?:string,
    value?: any
    onChange: (api:any)=>void,
  }
){
  const {label, onChange} = props;
  const api = props.value ||{};

  const handleChangeParams = (params:any)=>{
    onChange({...api, params:params})
  }

  const handleChangeUrl = (event:React.ChangeEvent<{ value: unknown }>)=>{
    onChange({...api, url:event.target.value as string})
  }

  const handleChangeMethod = (event:React.ChangeEvent<{ value: unknown }>)=>{
    onChange({...api, method:event.target.value as any})
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.label}>{label}</div>
      <Grid container spacing = {2} className={classes.container}>
        <Grid item xs={12}>
          <TextField 
            fullWidth 
            label = "URL" 
            variant = "outlined"  
            size = "small" 
            multiline rows={2} 
            value = {api.url || ''}
            onChange = {handleChangeUrl}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Method</InputLabel>
            <Select
              label ="Method"
              value={api.method || 'get'}
              onChange={handleChangeMethod}
            >
              <MenuItem value={'get'}>get</MenuItem>
              <MenuItem value={'post'}>post</MenuItem>
            </Select>
          </FormControl>             
        </Grid>

        <Grid  item xs={6}>
          <ApiEditorParamsDialog value = {api.params} onChange = {handleChangeParams}/>
        </Grid>
      </Grid>
    </div>
  )
}
