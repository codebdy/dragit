import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from 'react';



export default function HoverItem(props:any){
  const {primary, selected, onChange, onRemove, ...rest} = props;

  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(primary);

  const handleEndEditing = ()=>{
    setEditing(false)
    onChange && onChange(title);
  }

  const handleClick = ()=>{
    selected && setEditing(true)
  }

  return (
    <ListItem
      onMouseOver = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}
      selected = {selected}
      {...rest} 
    >
      {
        editing ?
        <TextField 
          value={title} 
          variant="outlined" 
          size = "small" 
          autoFocus
          onBlur = {handleEndEditing}
          onKeyUp = {
            e=>{
              if(e.keyCode === 13) {
                handleEndEditing()
              }
            }
          }

          onChange = { 
            (e)=>{
              setTitle(e.target.value)
            } 
          }
        />
        :
        <ListItemText 
          onClick={handleClick}
          primary={title} 
        />
      }
      
      {
        hover&&
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="comments" size="small"
            onClick = {(e)=>{
              e.stopPropagation();
              setEditing(true);
            }}
          >
            <EditIcon fontSize="small"/>
          </IconButton>
          <IconButton edge="end" aria-label="comments" size="small"
            onClick = {onRemove}
          >
            <DeleteIcon fontSize="small"/>
          </IconButton>
        </ListItemSecondaryAction>
      }

    </ListItem>
  )
}
