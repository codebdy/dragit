import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Button, IconButton, WithStyles, withStyles, Typography, Dialog, responsiveFontSizes, createMuiTheme, ThemeProvider} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import intl from 'react-intl-universal';
import { useThemeSettings } from 'store/helpers/useAppStore';
import { ID } from 'base/Model/graphqlTypes';

const styles = (theme: Theme) =>
  createStyles({
    dilogContent:{
      display:'flex',
      flexFlow:'row',
      minWidth:'560px',
      minHeight:'200px',
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
  id:ID;
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

export default function PropsDialog(props:{
  label?:string,
  title:string,
  children?:React.ReactNode,
  onSave:()=>void,
  onCancel?:()=>void,
}){
  const classes = useStyles();
  const {label, title, onSave, onCancel, children} = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onCancel && onCancel();
  };
  const handleSave = () => {
    onSave();
    setOpen(false);
  };


  const themeSettings = useThemeSettings();
  
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: themeSettings.themeMode as any,
      primary:{
        main: themeSettings.primary,
      },

    },
  }));

  return (

    <Fragment>
      <Button fullWidth variant="outlined" size="large" onClick={handleClickOpen} style={{marginTop:'-1px'}}> {label}</Button>
      <ThemeProvider theme={theme}>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" 
          open={open}
          scroll = 'paper'
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {title}
          </DialogTitle>
          <DialogContent dividers className={classes.dilogContent}>
            {children}
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
