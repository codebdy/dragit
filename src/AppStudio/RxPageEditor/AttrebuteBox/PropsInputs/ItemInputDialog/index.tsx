import React from 'react';
import { makeStyles, Theme, createStyles, Button, IconButton, WithStyles, withStyles, Typography, Dialog, Grid} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import intl from 'react-intl-universal';
import MetaListInput from './MetaListInput';
import { cloneObject } from 'rx-drag/utils/cloneObject';

const styles = (theme: Theme) =>
  createStyles({
    more:{
      width:'24px',
    },
    dilogContent:{
      display:'flex',
      flexFlow:'row',
      width:'460px',
    },
    dlgBody:{
      display:'flex',
      flexFlow:'column',
      minHeight:'300px',
    },
    itemContent:{
      flex:1,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },

    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const useStyles = makeStyles(styles);

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export interface MetaListDialogProps{
  label?:string,
  idKey?:string,
  nameKey?:string,
  idLabel?:string,
  nameLabel?:string,
  value?:Array<any>;
  onChange:(newValue:Array<any>)=>void;
}

export default function ItemsInputDialog(props:MetaListDialogProps){
  const classes = useStyles();
  const {label, idKey, nameKey, idLabel, nameLabel, value,  onChange} = props;
  const [inpuValue, setInputValue] = React.useState<Array<any>>(value?cloneObject(value):[]);
 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    onChange(inpuValue);
    setOpen(false);
  };


  return (

    <>
      <Grid item xs={6}>
        <Button variant="outlined"  fullWidth size="large" onClick={handleClickOpen} style={{marginTop:'-1px'}}> 
          {intl.get('items-data')}
        </Button>
      </Grid>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" 
          open={open}
          scroll = 'paper'
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {intl.get('edit-items')}
          </DialogTitle>
          <DialogContent dividers className={classes.dilogContent}>
            <div className={classes.dlgBody}>
              <MetaListInput 
                label = {label}
                idKey = {idKey}
                nameKey = {nameKey}
                idLabel = {idLabel}
                nameLabel = {nameLabel}
                value = {inpuValue} 
                onChange = {setInputValue}
              />
            </div>
          </DialogContent>
          <DialogActions>
              <Button autoFocus onClick={handleClose}>
                {intl.get('cancel')}
              </Button>
              <Button autoFocus onClick={handleSave} color="primary">
                {intl.get('save')}
              </Button>
            </DialogActions>
        </Dialog>      
    </>

    
  )
}
