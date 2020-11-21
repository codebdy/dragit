import React, { Fragment } from 'react';
import { Grid, TextField, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Switch } from '@material-ui/core';
import IMenuItem from 'base/IMenuItem';
import { RXNode } from 'base/RXNode';
import intl from "react-intl-universal";
import PrimaryText from 'base/PropsInputs/PrimaryText';

export default function BadgeEditor(
  props:{
  }
){

  return (
    <Fragment>
      <Grid container item xs={6}>
        <FormControlLabel
          control={
            <Switch
              //checked={inputValue}
              //onChange={handleChange}
              color="primary"
            />
          }
          style={{margin:'2px'}}
          label={<PrimaryText>{intl.get('menu-badge')}</PrimaryText>}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField 
          fullWidth
          variant="outlined" 
          label = {intl.get('field')} 
          size="small"
          //value = {title || ''}
          //onChange = {handleTitleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel>{intl.get('size')}</InputLabel>
          <Select
            value={'' || 'medium'}
            //onChange={handleChangeType}
            label = {intl.get('size')}
          >
            <MenuItem value="small">
              Small
            </MenuItem>
            <MenuItem value="medium">
              Medium
            </MenuItem>          
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel>{intl.get('color')}</InputLabel>
          <Select
            value={'' || 'medium'}
            //onChange={handleChangeType}
            label = {intl.get('color')}
          >
            <MenuItem value="small">
              Small
            </MenuItem>
            <MenuItem value="medium">
              Medium
            </MenuItem>          
          </Select>
        </FormControl>
      </Grid>
    
    </Fragment>  
  )
}
