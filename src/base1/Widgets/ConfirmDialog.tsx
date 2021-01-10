import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import intl from 'react-intl-universal';

export default function ConfirmDialog(
  props:{
    message:string,
    onConfirm:()=>void,
    onCancel:()=>void,
    open:boolean,
  }
) {
  const {message, open, onConfirm, onCancel} = props;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{intl.get('operation-confirm')}</DialogTitle>
      <DialogContent style={{minWidth:"400px"}}>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
        {intl.get('cancel')}
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {intl.get('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
