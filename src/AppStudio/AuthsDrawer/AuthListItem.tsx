import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { CircularProgress, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import intl from 'react-intl-universal';
import { IRxAuth } from 'Base/Model/IRxAuth';
import { useEffect } from 'react';
import ActionButton from 'AppStudio/ActionButton';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import useLayzyMagicDelete from 'Data/useLayzyMagicDelete';
import useLayzyMagicPost from 'Data/useLayzyMagicPost';

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
    auth?: IRxAuth
  }
) => {
  const {auth} = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [slug, setSlug] = useState(auth?.rxSlug ||'');
  const [name, setName] = useState(auth?.name || '');
  const dragItStore = useDragItStore();
  const studioStore = useAppStudioStore();
  useEffect(()=>{
    if(!auth){
      setSlug(intl.get('slug'));
      setName(intl.get('name'));
    }
  },[auth])

  const [excuteSaveRxAuth, {loading:saving, error}] = useLayzyMagicPost({
    onCompleted(){
      dragItStore.setSuccessAlert(true)
    }
  });
  const [excuteRemoveRxAuth, {loading:removing, error:removeError}] = useLayzyMagicDelete(     {
      onCompleted(){
        dragItStore.setSuccessAlert(true)
      },
      /*update: (cache, { data: { removeRxAuth } })=>{
        cache.modify({
          id: cache.identify(studioStore?.rxApp as any),
          fields: {
            auths:(existingAuthRefs = [], { readField })=>{
              return existingAuthRefs.filter(
                (authRef:any) => auth?.id !== readField('id', authRef)
              );
            }
          }
        });
      },*/
    }
  );

  useShowServerError(error || removeError);

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
    excuteSaveRxAuth({data:{rxAuth:{id:auth?.id, rx_slug:slug, name:name}}})
  }

  const handleSlugChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setSlug(event.target.value as string);
  }

  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setName(event.target.value as string);
  }

  const handleRemove = ()=>{
    excuteRemoveRxAuth({data:{id:auth?.id}});
  }

  const handleKeyEnter = (event:React.KeyboardEvent<HTMLElement>)=>{
    if(event.key === 'Enter') {
      handleSave()
    }
  }

  const loading = saving || removing;

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
              autoFocus
              variant = "outlined" 
              size = "small" 
              value = {slug}
              onChange = { handleSlugChange } 
              onKeyUp = { handleKeyEnter }
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
              onKeyUp = { handleKeyEnter }
              onChange = { handleNameChange } 
            />
          : <Typography variant = "subtitle1" className = {auth ? '' : classes.header}>{name}</Typography> 
        }   
        
      </div>
      <div  className = {classes.action}>
        {
          loading &&
          <CircularProgress size = {24}/>
        }
        { hover && !editing && auth && !auth.predefined && !loading &&
          <>
            <ActionButton onClick = {handleEditing} icon = "mdi-pencil" />
            <ActionButton onClick = {handleRemove} icon = "mdi-trash-can-outline" />
          </> 
        }
        {
          editing && !loading&&
          <>
            <ActionButton onClick = {handleCancel} icon = "mdi-close" />
            <ActionButton onClick = {handleSave} icon = "mdi-check" />
          </>           
        }

      </div>
    </div>
  );
})
