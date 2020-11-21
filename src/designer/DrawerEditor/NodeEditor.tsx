import React, { Fragment, useEffect, useState } from 'react';
import { Grid, TextField, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import IMenuItem from 'base/IMenuItem';
import { RXNode } from 'base/RXNode';
import intl from "react-intl-universal";

export default function NodeEditor(
  props:{
    node:RXNode<IMenuItem>,
    onChange:(node:RXNode<IMenuItem>, field:string, value:any)=>void,
  }
){
  const {node, onChange} = props;
  const [type, setType] = useState(node.meta.type);
  const [title, setTitle] = useState(node.meta.title);

  useEffect(()=>{
    setType(node.meta.type);
    setTitle(node.meta.title);
  },[node])


  const handleTitleChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const newTitle = event.target.value as any;
    setTitle(newTitle);
    onChange(node, 'title', newTitle);
  }

  return (
    <Fragment>
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
      {
        type !== 'divider' &&
        <Fragment>
          <Grid item xs={6}>
            <TextField 
              variant="outlined" 
              label = {intl.get('name')} 
              size="small"
              value = {title || ''}
              onChange = {handleTitleChange}
            />
          </Grid>

        </Fragment>
      }
    </Fragment>
  )
}
