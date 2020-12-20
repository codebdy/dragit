import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Dialog } from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import { useAppStore } from 'store/helpers/useAppStore';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ErrorDialog = observer(()=>{

  //const [open, setOpen] = React.useState(true);
  const appStore = useAppStore();
  const errorMessage = appStore.errorMessage;
  const handleClose = () => {
    appStore.setErrorMessage('');
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
})
