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
    },
  }),
);

export default function TreeItemLabel(
  props:{
    label?:string,
    actions?:any,
  }
){
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(props.label);

  return (
    <div 
      className={classes.root}
      onMouseMove = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}
    >
      <div onClick = {e=>{e.stopPropagation()}} onDoubleClick={e=>{setEditing(true)}}>
      {
        editing?
        <TextField 
          value = {title} 
          variant = "outlined" 
          size="small" 
          autoFocus
          onBlur = {()=>setEditing(false)}
          onKeyUp = {
            e=>{
              if(e.keyCode === 13) {
                setEditing(false)
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
        <div>
          {props.label}
        </div>        
      }
      </div>
      {
        hover &&
        <div className={classes.actions}>
          <IconButton edge="end" aria-label="comments" size="small"
            onClick = {(e)=>{
              e.stopPropagation();
              setEditing(true);
            }}
          >
            <Edit fontSize="small"/>
          </IconButton>
          <IconButton size="small">
            <MdiIcon iconClass= "mdi-content-copy" size={14}/>
          </IconButton>
          {props.actions}
          <IconButton edge="end" aria-label="comments" size="small"
            //onClick = {onRemove}
          >
            <Delete fontSize="small"/>
          </IconButton>
        </div>
      }
    </div>
  )
}
