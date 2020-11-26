import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { Dialog } from '@material-ui/core';
import useError from 'store/error/useError';
import { closeErrorDialogAction } from 'store/error/actions';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ErrorDialog(){

  //const [open, setOpen] = React.useState(true);

  const errorMessage = useError();
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(closeErrorDialogAction())
  };  
  
  return (
    <Dialog
      open={!!errorMessage}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Alert onClose={handleClose} severity="error">
        {errorMessage}
      </Alert>
    </Dialog>
  )
}
