import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import intl from 'react-intl-universal';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import {observer} from 'mobx-react';

export const ConfirmDialog = observer(() => {
  const confirmStore = useDragItStore().confirm;
  
  const handelCancel = ()=>{
    confirmStore.close();
  }

  const handleConfirm = ()=>{
    confirmStore.callbackFn && confirmStore.callbackFn();
    confirmStore.close();
  }

  return (
    <Dialog
      open={!!confirmStore.message}
      onClose={handelCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{intl.get('operation-confirm')}</DialogTitle>
      <DialogContent style={{minWidth:"400px"}}>
        <DialogContentText id="alert-dialog-description">
          {confirmStore.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handelCancel}>
        {intl.get('cancel')}
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          {intl.get('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
})
