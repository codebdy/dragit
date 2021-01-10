import React, { useState } from 'react';
import { TableRow, TableCell, Checkbox, Tooltip, IconButton, TextField } from '@material-ui/core';
import MdiIcon from 'components1/common/MdiIcon';
import intl from 'react-intl-universal';
import { IPage } from 'Base/Model/IPage';
import { ID } from 'Base/Model/graphqlTypes';

export default function ModulePageRow(
  props:{
    page:IPage, 
    isIndexPage:boolean,
    onChangePage:(newPage:IPage)=>void,
    onRemove:(id:ID)=>void,
    onChangeIndexPage:(indexed:boolean)=>void,
    onDesign:()=>void,
  }
){
  const{page, isIndexPage, onChangePage, onRemove, onChangeIndexPage, onDesign} = props;
  const[titleEditing, setTitleEditing] = useState(false);
  const[slugEditing, setSlugEditing] = useState(false);
  const[title, setTitle] = useState(page.name);
  const[slug, setSlug] = useState(page.id);

  const handleBeginEdit = ()=>{
    setTitleEditing(true);
    setSlugEditing(true);
  }

  const handleFinishEdit = ()=>{
    setTitleEditing(false);
    setSlugEditing(false);
    onChangePage({...page, name:title});
  }

  const handleChangIndexPage = (event: React.ChangeEvent<HTMLInputElement>)=>{
    let newValue = !isIndexPage;
    onChangeIndexPage(newValue);
  }

  const handleChangeIsFormPage = (event: React.ChangeEvent<HTMLInputElement>)=>{
    let isFormPage = page.schema?.isFormPage;
    onChangePage({...page, schema:{...page.schema, isFormPage:!isFormPage}});
  }

  return (
  <TableRow>
    <TableCell
      onDoubleClick = {e=>setSlugEditing(true)}
    >
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
        checked = {page.schema?.isFormPage || false}
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
        titleEditing||slugEditing?
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
