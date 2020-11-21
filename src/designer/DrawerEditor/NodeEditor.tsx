import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Grid, TextField, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import IMenuItem from 'base/IMenuItem';
import { RXNode } from 'base/RXNode';
import intl from "react-intl-universal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({


  }),
);

export default function NodeEditor(
  props:{
    node:RXNode<IMenuItem>,
  }
){
  const {node} = props;
  const {title, type} = node.meta;

  const classes = useStyles();

  const handleChangeType = ()=>{
    
  }

  return (
    <Fragment>
      <Grid item xs={6}>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel>{intl.get('type')}</InputLabel>
          <Select
            value={type || 'item'}
            onChange={handleChangeType}
            label = {intl.get('type')}
          >
          <MenuItem value="item">
            {intl.get('module-index')}
          </MenuItem>
          <MenuItem value="group">
            {intl.get('fold-group')}
          </MenuItem>          
          <MenuItem value="subheader">
            {intl.get('subheader')}
          </MenuItem>

          <MenuItem value="divider">
            {intl.get('divider')}
          </MenuItem>

        </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField 
          variant="outlined" 
          label = {intl.get('name')} 
          size="small"
          value = {title || ''}
        />
      </Grid>
    </Fragment>
  )
}
