import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, IconButton, TextField } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import MdiIcon from 'components/common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height:theme.spacing(5),
      display:'flex',
      justifyContent :'space-between',
      alignItems: 'center',
    },
    actions:{
      width:'100px',
      display:'flex',
      justifyContent:'flex-end',
      paddingRight:theme.spacing(1),
    },
  }),
);

export default function TreeItemLabel(
  props:{
    label?:string,
    actions?:any,
    onChangeName:(name?:string)=>void,
    onRemove:()=>void,
    onClone:()=>void,
  }
){
  const {label, actions, onChangeName, onRemove, onClone} = props
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(label);

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    let netTitle = event.target.value as string;
    setTitle(netTitle);
  }

  const handleEndEditing = ()=>{
    setEditing(false);
    onChangeName(title);
  }

  return (
    <div 
      className={classes.root}
      onMouseMove = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}
    >
      <div onDoubleClick={e=>{setEditing(true)}}>
      {
        editing?
        <TextField 
          value = {title} 
          variant = "outlined" 
          size="small" 
          fullWidth
          autoFocus
          onBlur = {handleEndEditing}
          onKeyUp = {
            e=>{
              if(e.keyCode === 13) {
                handleEndEditing()
              }
            }
          }

          onChange = { handleChange  }
          onClick = {e=>{e.stopPropagation()}}
        />
        :
        <div>
          {title}
        </div>        
      }
      </div>
      {
        hover && !editing &&
        <div onClick = {e=>{e.stopPropagation()}} className={classes.actions}>
          <IconButton edge="end" aria-label="comments" size="small"
            onClick = {(e)=>{
              e.stopPropagation();
              setEditing(true);
            }}
          >
            <Edit fontSize="small"/>
          </IconButton>
          <IconButton size="small" onClick={onClone}>
            <MdiIcon iconClass= "mdi-content-copy" size={14}/>
          </IconButton>
          {actions}
          <IconButton edge="end" aria-label="comments" size="small"
            onClick = {onRemove}
          >
            <Delete fontSize="small"/>
          </IconButton>
        </div>
      }
    </div>
  )
}
