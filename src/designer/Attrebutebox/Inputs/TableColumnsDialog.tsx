import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Button, IconButton, WithStyles, withStyles, Typography, Dialog, responsiveFontSizes, createMuiTheme, ThemeProvider} from '@material-ui/core';
import { InputProps } from './InputProps';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TableColumnsList from './TableColumnsList';



const styles = (theme: Theme) =>
  createStyles({
    more:{
      width:'24px',

    },
    root: {
      margin: 0,
      padding: theme.spacing(2),
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
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
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
  },

}));

export default function TableColumnsDialog(props:InputProps){
  const classes = useStyles();
  const {field, value, onChange} = props;
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string);
    setInputValue(newValue);
    onChange(field, newValue ||' ');
  };  

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (

    <Fragment>
      <IconButton size="small" className = {classes.more} onClick={handleClickOpen}> ··· </IconButton>
      <ThemeProvider theme={theme}>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            表格列编辑器
          </DialogTitle>
          <DialogContent dividers>
              <TableColumnsList />
            </DialogContent>
          <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Save changes
              </Button>
            </DialogActions>
        </Dialog>      
      </ThemeProvider>      
    </Fragment>

    
  )
}
