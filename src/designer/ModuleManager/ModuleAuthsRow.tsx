import React, { useState } from 'react';
import { IconButton, TableCell, TableRow, TextField, Tooltip } from '@material-ui/core';
import { IAuth } from 'base/Model/IAuth';
import MdiIcon from 'components/common/MdiIcon';
import intl from 'react-intl-universal';

export default function ModuleAuthsRow(
  props:{
    auth:IAuth,
    onChange:(auth:IAuth)=>void,
    onRemove:(id:number)=>void,
  }
){
  const {auth, onChange, onRemove} = props;
  const[nameEditing, setNameEditing] = useState(false);
  const[slugEditing, setSlugEditing] = useState(false);
  const[name, setName] = useState(auth.name);
  const[slug, setSlug] = useState(auth.slug);

  const handleBeginEdit = ()=>{
    setNameEditing(true);
    setSlugEditing(true);
  }

  const handleFinishEdit = ()=>{
    setNameEditing(false);
    setSlugEditing(false);
    onChange({...auth, name:name, slug:slug});
  }

  return (
    <TableRow>
      <TableCell onDoubleClick = {e=>setSlugEditing(true)}>
      {
        slugEditing?
        <TextField
          autoFocus 
          value = {slug || ''} 
          size = "small" 
          variant = "outlined"
          onKeyUp = {e=>{
              if(e.keyCode === 13) {
                handleFinishEdit()
              }
            }
          }
          onChange = {e=>setSlug(e.target.value)}         
        />
        :
        <span>{slug}</span>
      }
      </TableCell>
      <TableCell onDoubleClick = {e=>setNameEditing(true)}>
      {
        nameEditing?
        <TextField
          autoFocus 
          value = {name || ''} 
          size = "small" 
          variant = "outlined"
          onKeyUp = {e=>{
              if(e.keyCode === 13) {
                handleFinishEdit()
              }
            }
          }
          onChange = {e=>setName(e.target.value)}         
        />
        :
        <span>{name}</span>
      }
      </TableCell>
      <TableCell align="right">
        {
          nameEditing || slugEditing?
          <Tooltip title={intl.get('finish-edit')} arrow placement="top">
            <IconButton aria-label="Finish edit"
              onClick = {handleFinishEdit}                                 
            >
              <MdiIcon iconClass="mdi-pencil-remove" size={16}/>
            </IconButton>
          </Tooltip>
          :
          <Tooltip title={intl.get('edit')} arrow placement="top">
          <IconButton aria-label="edit"
            onClick = {handleBeginEdit}                                 
          >
            <MdiIcon iconClass="mdi-pencil" size={16}/>
          </IconButton>
        </Tooltip>          
        }
                            
        <Tooltip title={intl.get('delete')} arrow placement="top">
          <IconButton aria-label="delete"
            onClick={e=>onRemove(auth.id)}                                
          >
            <MdiIcon iconClass="mdi-delete" size={16}/>
          </IconButton>
        </Tooltip>

      </TableCell>
    </TableRow>
  )
}
