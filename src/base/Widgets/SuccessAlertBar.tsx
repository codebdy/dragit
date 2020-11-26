import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import intl from 'react-intl-universal';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { closeSuccessAlertAction } from 'store/alertbar/actions';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SuccessAlertBar(){

  //const [open, setOpen] = React.useState(true);

  const successBar = (state: RootState) => state.alertbar
  const alertbar = useSelector(successBar)  
  const dispatch = useDispatch()
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSuccessAlertAction())
  };  
  
  return (
    <Snackbar 
      anchorOrigin = {{ vertical: 'top', horizontal: 'center' }}
      open={alertbar.successAlertOpen} 
      autoHideDuration={2000} 
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success">
        {intl.get('operate-success')}
      </Alert>
    </Snackbar>
  )
}
