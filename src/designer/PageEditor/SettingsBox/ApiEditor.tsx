import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Grid, TextField, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { AxiosRequestConfig } from 'axios';
import intl from "react-intl-universal";

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
  const [api, setApi] = useState<AxiosRequestConfig>(props.value ||{});

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
              value={'' || 'get'}
              //onChange={handleActionChange}
            >
              <MenuItem value={'get'}>get</MenuItem>
              <MenuItem value={'post'}>post</MenuItem>
            </Select>
          </FormControl>             
        </Grid>
        <Grid item className = {classes.item}>
          <TextField fullWidth label = "URL" variant = "outlined"  size = "small" />
        </Grid>
        <Grid item className = {classes.item}>
          <div>
            Params
          </div>
        </Grid>
        <Grid container item className = {classes.item}>
          <Grid item xs={6}>
            <TextField fullWidth variant = "outlined"  size = "small" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth variant = "outlined"  size = "small" />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
