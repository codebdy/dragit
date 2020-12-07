import React from 'react';
import { makeStyles, Theme, createStyles, TextField, Switch, FormControlLabel, MenuItem, Select, FormControl, InputLabel} from '@material-ui/core';
import { PropsInputProps } from '../../../base/PropsInputs/PropsEditorProps';
import intl from 'react-intl-universal';
import { Fragment } from 'react';
import MetaListDialog from 'components/ListView/PropsInputs/MetaListDialog';

const styles = (theme: Theme) =>
  createStyles({

    itemInput:{
        margin: theme.spacing(1),
    },
  });

  const useStyles = makeStyles(styles);

export default function ListViewColumnsDialog(props:PropsInputProps){
  const classes = useStyles();
  const {label, value, onChange} = props;
  const [columns, setComuns] = React.useState(value ? JSON.parse(JSON.stringify(value)) : []);
  const [selectedIndex, setSelectedIndex] = React.useState(columns.length > 0? 0 : -1);

  const handleChangeAttribute = (index:number, name:string, value:string|boolean)=>{
    columns[selectedIndex][name] = value;
    setComuns([...columns]);
  };

  const handleChangeProp = (index:number, name:string, value:string|unknown)=>{
    columns[selectedIndex].props[name] = value;
    setComuns([...columns]);
  };
  const handleAddNew = ()=>{
    columns.push({field:'new-field', label:'New Field', props:{}});
    setSelectedIndex(columns.length - 1);
  };

  return (
    <MetaListDialog
      label = {label}
      title ={intl.get('column-editor')}
      value = {columns}
      onAddNew = {handleAddNew}
      selectedIndex = {selectedIndex}
      onChange = {newValue=>{setComuns(newValue)}}
      onSave = {()=>{onChange(JSON.parse(JSON.stringify(columns)))}}
      onSelected = {index=>{setSelectedIndex(index)}}
    >
      {selectedIndex >= 0 &&
        <Fragment>
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('field')}
            variant="outlined" 
            size = "small"
            fullWidth
            value = {columns[selectedIndex].field || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'field', event.target.value.trim())
            }}
          />
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('column-name')} 
            variant="outlined" 
            size = "small"
            fullWidth
            value = {columns[selectedIndex].label || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'label', event.target.value.trim())
            }}
          />
          <FormControl  fullWidth variant="outlined" size = "small"  className={classes.itemInput}>
            <InputLabel id="align-select-label">{intl.get('align')}</InputLabel>
            <Select
              labelId="align-select-label"
              id="align-select"
              label={intl.get('align')}
              value = {columns[selectedIndex].props?.align || ''}
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
          <FormControl  fullWidth variant="outlined" size = "small" className={classes.itemInput}>
            <InputLabel id="align-select-label">{intl.get('size')}</InputLabel>
            <Select
              labelId="size-select-label"
              id="size-select"
              label = {intl.get('size')}
              value = {columns[selectedIndex].props?.size || ''}
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
            size = "small"
            value = {columns[selectedIndex].template || ''}
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'template', event.target.value.trim())
            }}
          />
        </Fragment>
      }
    </MetaListDialog>
    
  )
}
