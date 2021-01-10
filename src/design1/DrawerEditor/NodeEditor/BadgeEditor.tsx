import React, { Fragment } from 'react';
import { Grid, TextField, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Switch } from '@material-ui/core';
import { IMenuBadge } from 'base1/Model/IMenuItem';
import intl from "react-intl-universal";
import PrimaryText from 'base1/PropsInputs/PrimaryText';

export default function BadgeEditor(
  props:{
    badge:IMenuBadge|undefined,
    onChange:(badge:IMenuBadge|undefined)=>void
  }
){
  const {badge, onChange} = props;

  const hasChip = !!badge;
  const {field, size, color} = badge||{};

  const handleSwitchChange =  (event: React.ChangeEvent<HTMLInputElement>)=>{
    if(event.target.checked){
      onChange({size:'small', color:'default', field:''});
    }
    else{
      onChange(undefined);
    }
  }

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    let newValue = event.target.value as any;
    onChange({...badge, field:newValue});
  }

  const handleChangeSize = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let newValue = event.target.value as any;
    onChange({...badge, size:newValue});
  }

  const handleChangeColor = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let newValue = event.target.value as any;
    onChange({...badge, color:newValue});
  }

  return (
    <Fragment>
      <Grid container item xs={6}>
        <FormControlLabel
          control={
            <Switch
              checked={hasChip}
              onChange={handleSwitchChange}
              color="primary"
            />
          }
          style={{margin:'2px'}}
          label={<PrimaryText>{intl.get('menu-badge')}</PrimaryText>}
        />
      </Grid>
      {
        hasChip ? 
        <Fragment>
          <Grid item xs={6}>
            <TextField 
              fullWidth
              variant="outlined" 
              label = {intl.get('field')} 
              size="small"
              value = {field || ''}
              onChange = {handleLabelChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>{intl.get('size')}</InputLabel>
              <Select
                value={size || 'small'}
                onChange={handleChangeSize}
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
                value={color || 'default'}
                onChange={handleChangeColor}
                label = {intl.get('color')}
              >
                <MenuItem value="default">
                  Default
                </MenuItem>
                <MenuItem value="primary">
                  Primary
                </MenuItem>          
                <MenuItem value="secondary">
                  Secondary
                </MenuItem>          
              </Select>
            </FormControl>
          </Grid>
        </Fragment>
        :<Grid item xs={6}></Grid>
      }

    
    </Fragment>  
  )
}
