import React, { Fragment } from 'react';
import { Grid, TextField, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import IMenuItem, { IMenuChip } from 'Base/Model/IMenuItem';
import { RxNode } from 'rx-drag/models/RxNode';
import intl from "react-intl-universal";
import ChipEditor from './ChipEditor';
import BadgeEditor from './BadgeEditor';
import {MultiSelectBox} from 'Components/Inputs/Select/MultiSelectBox';
import {observer} from 'mobx-react';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';

export const NodeEditor = observer((
  props:{
    node:RxNode<IMenuItem>,
    onChange:(node:RxNode<IMenuItem>, field:string, value:any)=>void,
  }
)=>{
  const {node, onChange} = props;
  const {type, title, icon, pageId, auths} = node.meta;
  const studioStore = useAppStudioStore();

  const handleChangeType = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const newType = event.target.value as any;
    onChange(node, 'type', newType);
  }

  const handleChangePage = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const newPageId = event.target.value as any;
    onChange(node, 'pageId', newPageId);
  }

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
            onChange={handleChangeType}
            label = {intl.get('type')}
          >
          <MenuItem value="item">
            {intl.get('page')}
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
        {
          type === 'item' && 
          <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel>{intl.get("page")}</InputLabel>
          <Select
            label = {intl.get("page")}
            value={pageId || ''}
            onChange={handleChangePage}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              studioStore?.rxApp?.pages?.map(page=>{
                return(
                  <MenuItem key = {page.id} value={page.id}>{page.name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl> 
        }
      </Grid>
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
        <MultiSelectBox fullWidth label={intl.get('authority')} 
          variant="outlined" 
          size="small"
          items = {studioStore?.rxApp?.auths || []}
          value = {auths || []}
          onChange = {handleChangeAuths}
        />
      </Grid>
    </Grid>
  )
})
