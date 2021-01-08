import React, { Fragment } from 'react';
import { Grid, TextField, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import IMenuItem, { IMenuChip } from 'base/Model/IMenuItem';
import { RXNode } from 'base/RXNode/RXNode';
import intl from "react-intl-universal";
import ChipEditor from './ChipEditor';
import BadgeEditor from './BadgeEditor';
import MultiSelectBox from 'components/Inputs/Select/MultiSelectBox';

export default function NodeEditor(
  props:{
    node:RXNode<IMenuItem>,
    onChange:(node:RXNode<IMenuItem>, field:string, value:any)=>void,
  }
){
  const {node, onChange} = props;
  const type = node.meta.type;
  const {title, icon, auths} = node.meta;


  const handleTitleChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const newTitle = event.target.value as any;
    onChange(node, 'title', newTitle);
  }

  const handleIconChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const newValue = event.target.value as any;
    onChange(node, 'icon', newValue);
  }

  const handleChangeChip = (chip:IMenuChip|undefined) =>{
    onChange(node, 'chip', chip);
  }

  const handleChangeBadge = (badge:IMenuChip|undefined) =>{
    onChange(node, 'badge', badge);
  }

  const handleChangeAuths = (event: React.ChangeEvent<{ value: unknown }>)=>{
    onChange(node, 'auths', event.target.value);
  }

  return (
    <Grid container spacing = {2}>
      <Grid item xs={6}>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel>{intl.get('type')}</InputLabel>
          <Select
            value={type || 'item'}
            //onChange={handleChangeType}
            label = {intl.get('type')}
            disabled
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
      <Grid item xs={6}></Grid>
      {
        type !== 'divider' &&
        <Fragment>
          <Grid item xs={6}>
            <TextField 
              fullWidth
              variant="outlined" 
              label = {intl.get('name')} 
              size="small"
              value = {title || ''}
              onChange = {handleTitleChange}
            />
          </Grid>
          {
            type !== 'subheader' &&
            <Fragment>
              <Grid item xs={6}>
                <TextField 
                  fullWidth
                  variant="outlined" 
                  label = {intl.get('icon')} 
                  size="small"
                  value = {icon || ''}
                  onChange = {handleIconChange}
                />
              </Grid>
              <ChipEditor chip = {node.meta.chip} onChange={handleChangeChip}/> 
              <BadgeEditor badge = {node.meta.badge} onChange={handleChangeBadge}/>       
            </Fragment>
          }
        </Fragment>
      }
      <Grid item xs={12}>
        <MultiSelectBox label={'权限'} 
          variant="outlined" 
          size="small"
          //dataApi = {API_GET_AUTHS}
          itemKey = "slug"
          groupByField = "module"
          value = {auths || []}
          onChange = {handleChangeAuths}
        />
      </Grid>
    </Grid>
  )
}
