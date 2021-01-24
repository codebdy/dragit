import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { Fragment, useState } from 'react';
import { Button, DialogActions, DialogContent, Divider, TextField } from '@material-ui/core';
import intl from 'react-intl-universal';
import RxDialog from './RxDialog';

//通过代码复制，快构建一个响应式组件
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content:{
      flex:1,
      minHeight:'300px',
    },
    actions:{
      display:'flex',
      justifyContent:'space-between',
      padding:theme.spacing(2),
    },
    pageName:{
      minWidth:'300px',
    },
    buttons:{

    },
    confirmButton:{
      marginLeft:theme.spacing(2),
    }
  }),
);


export const AddNewPage = observer(() => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(''); 
  const handleNew = ()=>{
    setOpen(true);
  }

  const handleClose = ()=>{
    setOpen(false);
  }

  const handelNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const newValue = event.target.value as string;
    if(newValue){
      setNameError('');
    }

    setName(newValue);
  }

  const handleConfirm = ()=>{
    if(!name){
      setNameError(intl.get('required'));
      return;
    }
  }

  return (
    <Fragment>
      <Button 
        variant="outlined" 
        color = "primary"
        onClick = {handleNew}
      >{intl.get('add-new')}</Button>
      <RxDialog 
        open = {open}
        title = {intl.get('add-new-page')}
        onClose = {handleClose}
        maxWidth = "sm"
      >
        <Divider />
        <DialogContent className={classes.content}>

        
        
        </DialogContent>
        <Divider />
        <DialogActions className = {classes.actions}>
          <TextField 
            className={classes.pageName} 
            variant = "outlined" 
            size="small" 
            label = {intl.get('page-name')}
            error = {!!nameError}
            helperText = {nameError}
            onChange = {handelNameChange}
          />    
          <div className = {classes.buttons}>
            <Button variant = "outlined">
              {intl.get('cancel')}
            </Button>
            <Button 
              className = {classes.confirmButton} 
              variant = "contained" 
              color = "primary"
              onClick = {handleConfirm}
            >
              {intl.get('confirm')}
            </Button>
          </div>
        </DialogActions>   
      </RxDialog>
    </Fragment>
  );
})
