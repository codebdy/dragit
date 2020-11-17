import React, { useState } from 'react';
import { TableRow, TableCell, Checkbox, Tooltip, IconButton, TextField } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import intl from 'react-intl-universal';

export interface PageMeta{
  id:number,
  title?:string, 
  API?:string, 
  isFormPage?:boolean
}

export default function ModulePageRow(
  props:{
    page:PageMeta, 
    isIndexPage:boolean,
    onChangePage:(newPage:PageMeta)=>void,
    onRemove:(id:number)=>void,
  }
){
  const{page, isIndexPage, onChangePage, onRemove} = props;
  const[titleEditing, setTitleEditing] = useState(false);
  const[apiEditing, setApiEditing] = useState(false);
  const[title, setTitle] = useState(page.title);
  const[api, setApi] = useState(page.API);

  const handleBeginEdit = ()=>{
    setTitleEditing(true);
    setApiEditing(true);
  }

  const handleFinishEdit = ()=>{
    setTitleEditing(false);
    setApiEditing(false);
    onChangePage({...page, title:title, API:api});
  }

  return (
  <TableRow>
    <TableCell
      onDoubleClick = {e=>setTitleEditing(true)}
    >
      {
        titleEditing?
        <TextField
          autoFocus 
          value = {title} 
          size = "small" 
          variant = "outlined"
          onKeyUp = {e=>{
              if(e.keyCode === 13) {
                handleFinishEdit()
              }
            }
          }
          onChange = {e=>setTitle(e.target.value)}         
        />
        :
        <span>{title}</span>
      }
    </TableCell>
    <TableCell
      onDoubleClick = {e=>setApiEditing(true)}
    >
    {
        apiEditing?
        <TextField
          autoFocus 
          value = {api} 
          size = "small" 
          variant = "outlined"
          onKeyUp = {
            e=>{
              if(e.keyCode === 13) {
                handleFinishEdit()
              }
            }
          }
          onChange = {e=>setApi(e.target.value)}         
        />
        :
        <span>{api}</span>
      }
    </TableCell>
    <TableCell>
      <Checkbox
        checked = {page.isFormPage}
        color="primary"
        inputProps={{ 'aria-label': 'Is form page' }}
      />
    </TableCell>
    <TableCell>
      <Checkbox
        checked = {isIndexPage}
        color="primary"
        inputProps={{ 'aria-label': 'Is index page' }}
      />
    </TableCell>
    <TableCell align="right">
      {
        titleEditing||apiEditing?
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
                           
      <Tooltip title={intl.get('design-layout')} arrow placement="top">
        <IconButton aria-label="design"
                                         
        >
          <MdiIcon iconClass="mdi-pencil-ruler" size={16}/>
        </IconButton>
      </Tooltip>
      <Tooltip title={intl.get('delete')} arrow placement="top">
        <IconButton aria-label="delete"
          onClick={e=>onRemove(page.id)}                                
        >
          <MdiIcon iconClass="mdi-delete" size={16}/>
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
  )
}
