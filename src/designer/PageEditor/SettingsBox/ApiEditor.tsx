import React from 'react';
import { makeStyles, Theme, createStyles, Grid, TextField, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { AxiosRequestConfig } from 'axios';
import intl from "react-intl-universal";
import ApiEditorParamsDialog from './ApiEditorParamsDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      
    },
    content:{
      //paddingLeft:theme.spacing(2),
    },
    item:{
      margin:theme.spacing(2,0,2,1),
    }
  }),
);

export default function ApiEditor(
  props:{
    value?: AxiosRequestConfig
    onChange: (api:AxiosRequestConfig)=>void,
  }
){
  const {onChange} = props;
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
      <div>{intl.get("api")}</div>
      <div className = {classes.content}>
        <Grid item className = {classes.item}>
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
        <Grid item className = {classes.item}>
          <TextField 
            fullWidth 
            label = "URL" 
            variant = "outlined"  
            size = "small" 
            multiline rows={3} 
            value = {api.url || ''}
            onChange = {handleChangeUrl}
          />
        </Grid>
        <Grid  item className = {classes.item}>
          <ApiEditorParamsDialog value = {api.params} onChange = {handleChangeParams}/>
        </Grid>
      </div>
    </div>
  )
}
