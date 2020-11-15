import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Button, IconButton, WithStyles, withStyles, Typography, Dialog, responsiveFontSizes, createMuiTheme, ThemeProvider} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import MetaListDialogLeftList from '../../../designer/Attrebutebox/Inputs/MetaListDialogLeftList';
import intl from 'react-intl-universal';
import { ListViewMetaItem } from 'components/ListView/ListViewMetaItem';

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
  label?:string,
  title:string;
  value:Array<ListViewMetaItem>;
  selectedIndex:number;
  children:React.ReactNode;
  onAddNew:()=>void;  
  onChange:(newValue:Array<ListViewMetaItem>)=>void;
  onSave:()=>void;
  onSelected:(number:number)=>void;
}

export default function MetaListDialog(props:MetaListDialogProps){
  const classes = useStyles();
  const {label, title, value, selectedIndex, onAddNew, onChange, onSave, onSelected, children} = props;
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
              <MetaListDialogLeftList 
                items={items} 
                selectedIndex={selectedIndex} 
                onSelected ={handleSelected}
                onAddNew = {onAddNew} 
                onRemove = {handleRemove}
                onChangePosition = {handleChangePosition}
              />
              <div className = {classes.itemContent}>
                {children}
              
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
