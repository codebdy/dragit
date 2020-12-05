import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
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

  }),
);

export default function TreeItemLabel(
  props:{
    children:any,
    actions?:any,
  }
){
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <div 
      className={classes.root}
      onMouseMove = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}
    >
      <div>{props.children}</div>
      {
        hover &&
        <div>
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
