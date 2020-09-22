import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Button, IconButton, WithStyles, withStyles, Typography, Dialog, responsiveFontSizes, createMuiTheme, ThemeProvider, TextField, Switch, FormControlLabel, MenuItem, Select, FormControl, InputLabel} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import MetaListDialogLeftList, { MetaListItem } from './MetaListDialogLeftList';
import intl from 'react-intl-universal';

const styles = (theme: Theme) =>
  createStyles({
    more:{
      width:'24px',
    },
    dilogContent:{
      display:'flex',
      flexFlow:'row',
      width:'560px',
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
  title:string;
  value:Array<MetaListItem>;
  selectedIndex:number;
  children:React.ReactNode;  
  onChange:(newValue:Array<MetaListItem>)=>void;
  onSave:()=>void;
  onSelected:(number:number)=>void;
}

export default function MetaListDialog(props:MetaListDialogProps){
  const classes = useStyles();
  const {title, value, selectedIndex, onChange, onSave, onSelected, children} = props;
  const items = value;
  
  const handleSelected = (index:number)=>{
    onSelected(index);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    onSave();
    setOpen(false);
  };
  const handleRemove = (index:number) => {
    if(index === selectedIndex){
      (index + 1) >= items.length ? onSelected(index-1) : onSelected(index);;
    }
    items.splice(index,1);
    onChange([...items]);
  };
  const handelAddNew = ()=>{
    items.push({field:'new-field', label:'New Field', props:{}});
    onChange([...items]);
    onSelected(items.length - 1);
  };
  const handleChangePosition = (sourceIndex:number, targetIndex:number)=>{
    if(sourceIndex === selectedIndex){
      onSelected(targetIndex);
    }
    if(targetIndex === selectedIndex){
      onSelected(sourceIndex);
    }
    items[sourceIndex] = items.splice(targetIndex, 1, items[sourceIndex])[0]
    onChange([...items]);
  };

  return (

    <Fragment>
      <IconButton size="small" className = {classes.more} onClick={handleClickOpen}> ··· </IconButton>
      <ThemeProvider theme={theme}>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" 
          open={open}
          scroll = 'paper'
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {title}
          </DialogTitle>
          <DialogContent dividers className={classes.dilogContent}>
              <MetaListDialogLeftList 
                items={items} 
                selectedIndex={selectedIndex} 
                onSelected ={handleSelected}
                onAddNew = {handelAddNew} 
                onRemove = {handleRemove}
                onChangePosition = {handleChangePosition}
              />
              <div className = {classes.itemContent}>
                {
                  selectedIndex >=0 && children
                }
              
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
