import React, { Fragment } from 'react';
import { Grid, TextField, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Switch } from '@material-ui/core';
import { IMenuChip } from 'Base/Model/IMenuItem';
import intl from "react-intl-universal";
import PrimaryText from 'Design/PageEditor/AttrebuteBox/PropsInputs/PrimaryText';

export default function ChipEditor(
  props:{
    chip:IMenuChip|undefined,
    onChange:(chip:IMenuChip|undefined)=>void
  }
){
  const {chip, onChange} = props;

  const hasChip = !!chip;
  const {label, size, color} = chip||{};

  const handleSwitchChange =  (event: React.ChangeEvent<HTMLInputElement>)=>{
    if(event.target.checked){
      onChange({size:'small', color:'default'});
    }
    else{
      onChange(undefined);
    }
  }

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    let newValue = event.target.value as any;
    onChange({...chip, label:newValue});
  }

  const handleChangeSize = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let newValue = event.target.value as any;
    onChange({...chip, size:newValue});
  }

  const handleChangeColor = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let newValue = event.target.value as any;
    onChange({...chip, color:newValue});
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
          label={<PrimaryText>{intl.get('menu-chip')}</PrimaryText>}
        />
      </Grid>
      {
        hasChip ? 
        <Fragment>
          <Grid item xs={6}>
            <TextField 
              fullWidth
              variant="outlined" 
              label = {intl.get('text')} 
              size="small"
              value = {label || ''}
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
