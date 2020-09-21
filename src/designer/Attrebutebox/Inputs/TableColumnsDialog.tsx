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
  const [columns, setComuns] = React.useState(value);
  const [selectedIndex, setSelectedIndex] = React.useState(columns.length > 0? 0 : -1);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string);
    setComuns(newValue);
    onChange(field, newValue ||' ');
  };
  
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
              <TableColumnsList columns={columns} onSelected ={handleSelected} />
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
                    />
                    <TextField 
                      className = {classes.itemInput} 
                      label={intl.get('column-name')} 
                      variant="outlined" 
                      fullWidth
                      value = {columns[selectedIndex].label} 
                    />
                    <FormControl  fullWidth variant="outlined"  className={classes.itemInput}>
                      <InputLabel id="align-select-label">{intl.get('align')}</InputLabel>
                      <Select
                        labelId="align-select-label"
                        id="align-select"
                        label={intl.get('align')}
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
                        />
                      }
                      label={intl.get('sortable')}
                    />
                    <TextField
                      className = {classes.itemInput} 
                      label={intl.get('show-template')}
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                    />
                  </Fragment>
                }
              
              </div>
            </DialogContent>
          <DialogActions>
              <Button autoFocus onClick={handleClose}>
                {intl.get('cancel')}
              </Button>
              <Button autoFocus onClick={handleClose} color="primary">
                {intl.get('save')}
              </Button>
            </DialogActions>
        </Dialog>      
      </ThemeProvider>      
    </Fragment>

    
  )
}
