import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { IconButton, TextField, Typography, useTheme } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import { useState } from 'react';
import intl from 'react-intl-universal';

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
    actionButton:{
      width:'40px',
      height:'40px',
    }
  }),
);


export const AuthListItem = observer(() => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const theme = useTheme();

  const handleEditing = ()=>{
    setEditing(true);
  }

  const handleCancel = ()=>{
    setEditing(false);
  }

  const handleSave = ()=>{
    setEditing(false);
  }

  return (
    <div 
      className = {classes.root}
      onMouseOver = {()=>{setHover(true)}}
      onMouseLeave = {()=>{setHover(false)}}
    >
      <div className = {classes.slug}>
        {
          editing
          ? <TextField 
              variant = "outlined" 
              size = "small" 
              label = {intl.get('slug')} 
            />
          : <Typography variant = "subtitle1">slug</Typography> 
        }        
      </div>
      <div className = {classes.name}>
      {
          editing
          ? <TextField 
              variant = "outlined" 
              size = "small" 
              label = {intl.get('name')} 
            />
          : <Typography variant = "subtitle1">name</Typography> 
        }   
        
      </div>
      <div  className = {classes.action}>
        { hover && !editing &&
          <>
            <IconButton 
              size = "small" 
              className={classes.actionButton}
              onClick = {handleEditing}
            >
              <MdiIcon iconClass="mdi-pencil" size={18} color = {theme.palette.text.secondary}/>
            </IconButton>
            <IconButton size = "small" className={classes.actionButton}>
              <MdiIcon iconClass="mdi-trash-can-outline" size={18} color = {theme.palette.text.secondary}/>
            </IconButton>
          </> 
        }
        {
          editing &&
          <>
          <IconButton 
            size = "small" 
            className={classes.actionButton}
            onClick = {handleCancel}
          >
            <MdiIcon iconClass="mdi-close" size={18} color = {theme.palette.text.secondary}/>
          </IconButton>
          <IconButton 
            size = "small" 
            className={classes.actionButton}
            onClick = {handleSave}
          >
            <MdiIcon iconClass="mdi-check" size={18} color = {theme.palette.text.secondary}/>
          </IconButton>
        </>           
        }

      </div>
    </div>
  );
})
