import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import intl from 'react-intl-universal';
import { IAuth } from 'Base/Model/IAuth';
import { useEffect } from 'react';
import ActionButton from 'AppStudio/ActionButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      minWidth:'520px',
      display:'flex',
      flexFlow:'row',
      alignItems:'center',
      padding:theme.spacing(0, 2),
      minHeight: theme.spacing(7),
      borderBottom: theme.palette.divider + ' solid 1px',
    },
    header:{
      fontWeight:'bold',
    },
    slug:{
      flex:1,
      display:'flex',
      paddingRight:theme.spacing(2),
    },
    name:{
      flex:1,
      display:'flex',
    },
    action:{
      width:'100px',
      display:'flex',
      justifyContent:'flex-end',
    },

  }),
);


export const AuthListItem = observer((
  props:{
    auth?: IAuth
  }
) => {
  const {auth} = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [slug, setSlug] = useState(auth?.rxSlug ||'');
  const [name, setName] = useState(auth?.name || '');
  useEffect(()=>{
    if(!auth){
      setSlug(intl.get('slug'));
      setName(intl.get('name'));
    }
  },[auth])

  const handleEditing = ()=>{
    setEditing(true);
  }

  const handleCancel = ()=>{
    setSlug(auth?.rxSlug||'');
    setName(auth?.name||'');
    setEditing(false);
  }

  const handleSave = ()=>{
    setEditing(false);
  }

  const handleSlugChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setSlug(event.target.value as string);
  }

  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setName(event.target.value as string);
  }

  const handleRemove = ()=>{

  }

  return (
    <div 
      className = { classes.root }
      onMouseOver = {()=>{setHover(true)}}
      onMouseLeave = {()=>{setHover(false)}}
    >
      <div className = {classes.slug}>
        {
          editing
          ? <TextField 
              variant = "outlined" 
              size = "small" 
              value = {slug}
              onChange = {handleSlugChange} 
            />
          : <Typography variant = "subtitle1" className = {auth ? '' : classes.header}>{slug}</Typography> 
        }        
      </div>
      <div className = {classes.name}>
      {
          editing
          ? <TextField 
              variant = "outlined" 
              size = "small" 
              value = {name}
              onChange = {handleNameChange} 
            />
          : <Typography variant = "subtitle1" className = {auth ? '' : classes.header}>{name}</Typography> 
        }   
        
      </div>
      <div  className = {classes.action}>
        { hover && !editing && auth && !auth.predefined &&
          <>
            <ActionButton onClick = {handleEditing} icon = "mdi-pencil" />
            <ActionButton onClick = {handleRemove} icon = "mdi-trash-can-outline" />
          </> 
        }
        {
          editing &&
          <>
            <ActionButton onClick = {handleCancel} icon = "mdi-close" />
            <ActionButton onClick = {handleSave} icon = "mdi-check" />
          </>           
        }

      </div>
    </div>
  );
})
