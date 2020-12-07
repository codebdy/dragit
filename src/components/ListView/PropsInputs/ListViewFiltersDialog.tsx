import React, { Fragment, useEffect } from 'react';
import { makeStyles, Theme, createStyles, TextField} from '@material-ui/core';
import { PropsInputProps } from '../../../base/PropsInputs/PropsEditorProps';
import intl from 'react-intl-universal';
import MetaListDialog from 'components/ListView/PropsInputs/MetaListDialog';
import MetaListInput, { MetaItem } from 'base/PropsInputs/MetaListInput';

const styles = (theme: Theme) =>
  createStyles({
    itemInput:{
      margin: theme.spacing(1),
    },
    
  });

const useStyles = makeStyles(styles);

export default function ListViewFiltersDialog(props:PropsInputProps){
  const classes = useStyles();
  const {label, value, onChange} = props;
  const [filters, setFilters] = React.useState<Array<any>>(value ? JSON.parse(JSON.stringify(value)) : []);
  const [selectedIndex, setSelectedIndex] = React.useState(filters.length > 0 ? 0 : -1);

  useEffect(()=>{
    setFilters(value ? JSON.parse(JSON.stringify(value)) : [])
  },[value])

  const handleChangeAttribute = (index:number, name:string, value:string|boolean)=>{
    filters[selectedIndex][name] = value;
    setFilters([...filters]);
  };

  const handleNameValueListChange = (metas:Array<MetaItem>)=>{
    filters[selectedIndex].conditions = metas;
    setFilters([...filters]);
  };

  const handleAddNew = ()=>{
    filters.push({slug:'new-filter', label:'New Filter', props:{}});
    setSelectedIndex(filters.length - 1);
  };
  
  return (
    <MetaListDialog
      label = {label}
      title = {intl.get('filter-editor')}
      value = {filters}
      selectedIndex = {selectedIndex}
      onAddNew = {handleAddNew}
      onChange = {newValue=>{setFilters(newValue)}}
      onSave = {()=>{onChange(JSON.parse(JSON.stringify(filters)))}}
      onSelected = {index=>{setSelectedIndex(index)}}
    >{selectedIndex >= 0 &&
        <Fragment>
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('slug')}
            variant="outlined" 
            size = "small"
            fullWidth
            value = {filters[selectedIndex].slug || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'slug', event.target.value.trim())
            }}
          />
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('name')} 
            variant="outlined" 
            size = "small"
            fullWidth
            value = {filters[selectedIndex].label || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'label', event.target.value.trim())
            }}
          />
          <MetaListInput 
            label={intl.get('filter-conditions')}
            value = {filters[selectedIndex].conditions}
            onChange = {handleNameValueListChange} 
          />
        </Fragment>
      }
    </MetaListDialog>
    
  )
}
