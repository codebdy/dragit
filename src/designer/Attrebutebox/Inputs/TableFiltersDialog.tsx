import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Button, IconButton, WithStyles, withStyles, Typography, Dialog, responsiveFontSizes, createMuiTheme, ThemeProvider, TextField, Switch, FormControlLabel, MenuItem, Select, FormControl, InputLabel} from '@material-ui/core';
import { InputProps } from './InputProps';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TableMetaList from './TableMetaList';
import intl from 'react-intl-universal';
import AddIcon from '@material-ui/icons/Add';

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
    itemInput:{
        margin: theme.spacing(1),
    },

    nameValueItem:{
      display:'flex',
      flexFlow:'row',
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

export default function TableFiltersDialog(props:InputProps){
  const classes = useStyles();
  const {field, value, onChange} = props;
  const [columns, setComuns] = React.useState(value ? JSON.parse(JSON.stringify(value)) : []);
  const [selectedIndex, setSelectedIndex] = React.useState(columns.length > 0? 0 : -1);

  
  const handleSelected = (index:number)=>{
    setSelectedIndex(index);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = () => {
    onChange(field, JSON.parse(JSON.stringify(columns)));
    setOpen(false);
  };
  const handleRemove = (index:number) => {
    if(index === selectedIndex){
      (index + 1) >= columns.length ? setSelectedIndex(index-1) : setSelectedIndex(index);;
    }
    columns.splice(index,1);
    setComuns([...columns]);
  };
  const handelAddNew = ()=>{
    columns.push({field:'new-filter', label:'New Filter', props:{}});
    setComuns([...columns]);
    setSelectedIndex(columns.length - 1);
  };
  const handleChangePosition = (sourceIndex:number, targetIndex:number)=>{
    if(sourceIndex === selectedIndex){
      setSelectedIndex(targetIndex);
    }
    if(targetIndex === selectedIndex){
      setSelectedIndex(sourceIndex);
    }
    columns[sourceIndex] = columns.splice(targetIndex, 1, columns[sourceIndex])[0]
    setComuns([...columns]);
  };

  const handleChangeAttribute = (index:number, name:string, value:string|boolean)=>{
    columns[selectedIndex][name] = value;
    setComuns([...columns]);
  };

  const handleChangeProp = (index:number, name:string, value:string|unknown)=>{
    columns[selectedIndex].props[name] = value;
    setComuns([...columns]);
  };

  const handleAddNameValueItem = ()=>{

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
            {intl.get('filter-editor')}
          </DialogTitle>
          <DialogContent dividers className={classes.dilogContent}>
              <TableMetaList 
                columns={columns} 
                selectedIndex={selectedIndex} 
                onSelected ={handleSelected}
                onAddNew = {handelAddNew} 
                onRemove = {handleRemove}
                onChangePosition = {handleChangePosition}
              />
              <div className = {classes.itemContent}>
                {
                  selectedIndex >=0 &&
                  <Fragment>
                    <TextField 
                      className = {classes.itemInput} 
                      label={intl.get('slug')}
                      variant="outlined" 
                      fullWidth
                      value = {columns[selectedIndex].field} 
                      onChange = {event=>{
                        handleChangeAttribute(selectedIndex, 'slug', event.target.value.trim())
                      }}
                    />
                    <TextField 
                      className = {classes.itemInput} 
                      label={intl.get('name')} 
                      variant="outlined" 
                      fullWidth
                      value = {columns[selectedIndex].label} 
                      onChange = {event=>{
                        handleChangeAttribute(selectedIndex, 'label', event.target.value.trim())
                      }}
                    />
                    <div className = {classes.itemInput}>{intl.get('filter-conditions')}</div>
                    <div className ={classes.nameValueItem}>
                      <TextField 
                      className = {classes.itemInput} 
                      label={intl.get('slug')} 
                      variant="outlined" 
                      size="small"
                       
                      onChange = {event=>{
                        handleChangeAttribute(selectedIndex, 'label', event.target.value.trim())
                      }}
                    />
                      <TextField 
                      className = {classes.itemInput} 
                      label={intl.get('name')} 
                      variant="outlined" 
                      size="small"
                      
                      onChange = {event=>{
                        handleChangeAttribute(selectedIndex, 'label', event.target.value.trim())
                      }}
                    />
                    </div>
                    <div>
                    <IconButton onClick={handleAddNameValueItem} >
                      <AddIcon />
                    </IconButton>
                    </div>
                  </Fragment>
                }
              
              </div>
            </DialogContent>
          <DialogActions>
              <Button autoFocus onClick={handleClose}>
                {intl.get('cancel')}
              </Button>
              <Button autoFocus onClick={handleChange} color="primary">
                {intl.get('save')}
              </Button>
            </DialogActions>
        </Dialog>      
      </ThemeProvider>      
    </Fragment>

    
  )
}
