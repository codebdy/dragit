import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, Button, IconButton, WithStyles, withStyles, Typography, Dialog, responsiveFontSizes, createMuiTheme, ThemeProvider, TextField, Switch, FormControlLabel, MenuItem, Select, FormControl, InputLabel} from '@material-ui/core';
import { InputProps } from './InputProps';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TableColumnsList from './TableColumnsList';
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
    itemInput:{
        margin: theme.spacing(1),
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

export default function TableColumnsDialog(props:InputProps){
  const classes = useStyles();
  const {field, value, onChange} = props;
  const [columns, setComuns] = React.useState(JSON.parse(JSON.stringify(value)));
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
    columns.push({field:'new-field', label:'New Field', props:{}});
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


  return (

    <Fragment>
      <IconButton size="small" className = {classes.more} onClick={handleClickOpen}> ··· </IconButton>
      <ThemeProvider theme={theme}>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" 
          open={open}
          scroll = 'paper'
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {intl.get('column-editor')}
          </DialogTitle>
          <DialogContent dividers className={classes.dilogContent}>
              <TableColumnsList 
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
                      label={intl.get('field')}
                      variant="outlined" 
                      fullWidth
                      value = {columns[selectedIndex].field} 
                      onChange = {event=>{
                        handleChangeAttribute(selectedIndex, 'field', event.target.value.trim())
                      }}
                    />
                    <TextField 
                      className = {classes.itemInput} 
                      label={intl.get('column-name')} 
                      variant="outlined" 
                      fullWidth
                      value = {columns[selectedIndex].label} 
                      onChange = {event=>{
                        handleChangeAttribute(selectedIndex, 'label', event.target.value.trim())
                      }}
                    />
                    <FormControl  fullWidth variant="outlined"  className={classes.itemInput}>
                      <InputLabel id="align-select-label">{intl.get('align')}</InputLabel>
                      <Select
                        labelId="align-select-label"
                        id="align-select"
                        label={intl.get('align')}
                        value = {columns[selectedIndex].props.align || ''}
                        onChange = {event=>{
                          handleChangeProp(selectedIndex, 'align', event.target.value)
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'center'}>Center</MenuItem>
                        <MenuItem value={'inherit'}>Inherit</MenuItem>
                        <MenuItem value={'justify'}>Justify</MenuItem>
                        <MenuItem value={'left'}>Left</MenuItem>
                        <MenuItem value={'right'}>Right</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl  fullWidth variant="outlined"  className={classes.itemInput}>
                      <InputLabel id="align-select-label">{intl.get('size')}</InputLabel>
                      <Select
                        labelId="size-select-label"
                        id="size-select"
                        label = {intl.get('size')}
                        value = {columns[selectedIndex].props.size || ''}
                        onChange = {event=>{
                          handleChangeProp(selectedIndex, 'size', event.target.value)
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'medium'}>Medium</MenuItem>
                        <MenuItem value={'small'}>Small</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      className = {classes.itemInput}
                      control={
                        <Switch
                          color="primary"
                          checked = {!!columns[selectedIndex].searchable}
                          onChange = {event=>{
                            handleChangeAttribute(selectedIndex, 'searchable', event.target.checked)
                          }}                        
                        />
                      }
                      label={intl.get('searchable')}
                    />
                    <FormControlLabel
                      className = {classes.itemInput}
                      control={
                        <Switch
                          color="primary"
                          checked = {!!columns[selectedIndex].sortable}
                          onChange = {event=>{
                            handleChangeAttribute(selectedIndex, 'sortable', event.target.checked)
                          }}                        
                        />
                      }
                      label={intl.get('sortable')}
                    />
                    <TextField
                      className = {classes.itemInput} 
                      label={intl.get('show-template')}
                      multiline
                      fullWidth
                      rows={4}
                      variant="outlined"
                      value = {columns[selectedIndex].template || ''}
                      onChange = {event=>{
                        handleChangeAttribute(selectedIndex, 'template', event.target.value.trim())
                      }}
                    />
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
