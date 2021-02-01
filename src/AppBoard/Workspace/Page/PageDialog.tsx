import React from 'react';
import { makeStyles, Theme, createStyles, Dialog, DialogTitle, IconButton, Grow } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { MaxWidth } from 'Base/Model/IRxPage';
import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%',
      height:'100%',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    dialogTitle:{
      padding:theme.spacing(2, 0, 0, 2),
      margin:'0',
    }
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return  <Grow ref={ref} {...props} />;
});

export default function PageDialog(
  props:{
    maxWidth?:MaxWidth,
    open:boolean,
    onClose?:()=>void,
    title?:string,
    children:any,
  }
){
  const {maxWidth, open, onClose, title, children} = props;
  const classes = useStyles();

  let maxWidthDlg = maxWidth ==='false' ? false : maxWidth;
  maxWidthDlg = maxWidthDlg === '' || maxWidthDlg === undefined ? 'lg' : maxWidthDlg;
  return (
    <Dialog
      fullWidth
      scroll='body'
      maxWidth = {maxWidthDlg}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <DialogTitle className = {classes.dialogTitle}>
        <span >{title}</span>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      {children}
    </Dialog>
  )
}
