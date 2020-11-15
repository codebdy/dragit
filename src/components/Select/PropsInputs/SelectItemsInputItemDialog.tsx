import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Button, IconButton, WithStyles, withStyles, Typography, Dialog, responsiveFontSizes, createMuiTheme, ThemeProvider} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import intl from 'react-intl-universal';
import MetaListInput from '../../../designer/Attrebutebox/Inputs/MetaListInput';

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

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    type: 'light',
    background:{
      default:'#f4f5fa',
    },
    primary:{
      main:"#5d78ff",
    },  
  },

}));

export interface MetaListDialogProps{
  value?:Array<any>;
  onChange:(newValue:Array<any>)=>void;
}

export default function SelectItemsInputItemDialog(props:MetaListDialogProps){
  const classes = useStyles();
  const {value,  onChange} = props;
  const [inpuValue, setInputValue] = React.useState<Array<any>>(value?JSON.parse(JSON.stringify(value)):[]);
 
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

    <Fragment>
      <Button variant="outlined"  fullWidth size="large" onClick={handleClickOpen} style={{marginTop:'-1px'}}> 
        {intl.get('data')} ···
      </Button>
      <ThemeProvider theme={theme}>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" 
          open={open}
          scroll = 'paper'
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {intl.get('edit-select-items')}
          </DialogTitle>
          <DialogContent dividers className={classes.dilogContent}>
            <div className={classes.dlgBody}>
              <MetaListInput label="" value = {inpuValue} onChange = {setInputValue}/>
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
      </ThemeProvider>      
    </Fragment>

    
  )
}
