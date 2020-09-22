import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, TextField, IconButton} from '@material-ui/core';
import { InputProps } from './InputProps';
import intl from 'react-intl-universal';
import AddIcon from '@material-ui/icons/Add';
import MetaListDialog from './MetaListDialog';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme: Theme) =>
  createStyles({
    itemInput:{
      margin: theme.spacing(1),
    },
    nameValueItem:{
      display:'flex',
      flexFlow:'row',
    },
    removeButton:{
      margin: theme.spacing(0.5),
    }
    
  });

const useStyles = makeStyles(styles);

export default function ListViewFiltersDialog(props:InputProps){
  const classes = useStyles();
  const {field, value, onChange} = props;
  const [columns, setComuns] = React.useState(value ? JSON.parse(JSON.stringify(value)) : []);
  const [selectedIndex, setSelectedIndex] = React.useState(columns.length > 0 ? 0 : -1);

  const handleChangeAttribute = (index:number, name:string, value:string|boolean)=>{
    columns[selectedIndex][name] = value;
    setComuns([...columns]);
  };

  const handleAddNameValueItem = ()=>{

  };

  const handleRemoveNamveValueItem=(index:number)=>{

  }
  
  console.log(selectedIndex)

  return (
    <MetaListDialog
      title ={intl.get('filter-editor')}
      value = {columns}
      selectedIndex = {selectedIndex}
      onChange = {newValue=>{setComuns(newValue)}}
      onSave = {()=>{onChange(field, JSON.parse(JSON.stringify(columns)))}}
      onSelected = {index=>{setSelectedIndex(index)}}
    >{selectedIndex >= 0 &&
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
              <div className={classes.removeButton}>
                <IconButton aria-label="delete"
                  onClick = {(event) => handleRemoveNamveValueItem(0)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
          </div>
          <div>
          <IconButton onClick={handleAddNameValueItem} >
            <AddIcon />
          </IconButton>
          </div>
        </Fragment>
      }
    </MetaListDialog>
    
  )
}
