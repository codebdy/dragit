import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import intl from 'react-intl-universal';
import {observer} from 'mobx-react-lite';
import { useAppStore } from 'store/helpers/useAppStore';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const SuccessAlertBar = observer(()=>{

  const appStore = useAppStore();

   
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    appStore.setSuccessAlert(false);
  };  
  
  return (
    <Snackbar 
      anchorOrigin = {{ vertical: 'top', horizontal: 'center' }}
      open={!!appStore.successAlert} 
      autoHideDuration={1000} 
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success">
        {intl.get('operate-success')}
      </Alert>
    </Snackbar>
  )
})
