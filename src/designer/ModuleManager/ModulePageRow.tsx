import React, { useState } from 'react';
import { TableRow, TableCell, Checkbox, Tooltip, IconButton, TextField } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import intl from 'react-intl-universal';
import { IPage } from 'base/IPage';

export default function ModulePageRow(
  props:{
    page:IPage, 
    isIndexPage:boolean,
    onChangePage:(newPage:IPage)=>void,
    onRemove:(id:number)=>void,
    onChangeIndexPage:(indexed:boolean)=>void,
    onDesign:()=>void,
  }
){
  const{page, isIndexPage, onChangePage, onRemove, onChangeIndexPage, onDesign} = props;
  const[titleEditing, setTitleEditing] = useState(false);
  const[apiEditing, setApiEditing] = useState(false);
  const[title, setTitle] = useState(page.title);
  //const[api, setApi] = useState(page.api);

  const handleBeginEdit = ()=>{
    setTitleEditing(true);
    setApiEditing(true);
  }

  const handleFinishEdit = ()=>{
    setTitleEditing(false);
    setApiEditing(false);
    onChangePage({...page, title:title});
  }

  const handleChangIndexPage = (event: React.ChangeEvent<HTMLInputElement>)=>{
    let newValue = !isIndexPage;
    onChangeIndexPage(newValue);
  }

  const handleChangeIsFormPage = (event: React.ChangeEvent<HTMLInputElement>)=>{
    let isFormPage = page.jsonSchema?.isFormPage;
    onChangePage({...page, jsonSchema:{...page.jsonSchema, isFormPage:!isFormPage}});
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
          value = {title || ''} 
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
    <TableCell>
      <Checkbox
        checked = {page.jsonSchema?.isFormPage || false}
        color="primary"
        inputProps={{ 'aria-label': 'Is form page' }}
        onChange = {handleChangeIsFormPage}
      />
    </TableCell>
    <TableCell>
      <Checkbox
        checked = {isIndexPage || false}
        color="primary"
        inputProps={{ 'aria-label': 'Is index page' }}
        onChange = {handleChangIndexPage}
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
          onClick = {onDesign}                
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
