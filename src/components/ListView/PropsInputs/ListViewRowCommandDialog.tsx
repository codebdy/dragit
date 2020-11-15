import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, TextField, FormControlLabel, Checkbox} from '@material-ui/core';
import { PropsInputProps } from '../../../base/PropsInputs/PropsEditorProps';
import intl from 'react-intl-universal';
import MetaListDialog from 'components/ListView/PropsInputs/MetaListDialog';

const styles = (theme: Theme) =>
  createStyles({
    itemInput:{
      margin: theme.spacing(1),
    },

    jumpCheckbox:{
      margin: theme.spacing(-0.2),
    }
    
  });

const useStyles = makeStyles(styles);

export default function ListViewRowCommandDialog(props:PropsInputProps){
  const classes = useStyles();
  const {field, label, value, onChange} = props;
  const [commands, setCommands] = React.useState(value ? JSON.parse(JSON.stringify(value)) : []);
  const [selectedIndex, setSelectedIndex] = React.useState(commands.length > 0 ? 0 : -1);
  const command = commands[selectedIndex];

  const handleChangeAttribute = (index:number, name:string, value:string|boolean|Object|undefined)=>{
    commands[selectedIndex][name] = value;
    setCommands([...commands]);
  };


  const handleAddNew = ()=>{
    commands.push({slug:'new-action', label:'New Action', props:{}});
    setSelectedIndex(commands.length - 1);
  };

  const hanldeJumpParams = (name:string, value:string)=>{
    commands[selectedIndex].jumpToPage[name] = value;
    setCommands([...commands]);
  }
  
  return (
    <MetaListDialog
      label = {label}
      title ={intl.get('action-editor')}
      value = {commands}
      selectedIndex = {selectedIndex}
      onAddNew = {handleAddNew}
      onChange = {newValue=>{setCommands(newValue)}}
      onSave = {()=>{onChange(field, JSON.parse(JSON.stringify(commands)))}}
      onSelected = {index=>{setSelectedIndex(index)}}
    >{selectedIndex >= 0 &&
        <Fragment>
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('slug')}
            variant="outlined" 
            fullWidth
            value = {command.slug || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'slug', event.target.value.trim())
            }}
          />
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('name')} 
            variant="outlined" 
            fullWidth
            value = {command.label || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'label', event.target.value.trim())
            }}
          />
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('action-icon')} 
            variant="outlined" 
            fullWidth
            value = {command.icon || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'icon', event.target.value.trim())
            }}
          />
          <FormControlLabel
            className = {classes.jumpCheckbox}
            control={
              <Checkbox
                color="primary"
                checked = {!!command.jumpToPage}
                onChange = {event=>{
                  handleChangeAttribute(selectedIndex, 'jumpToPage', event.target.checked ? {/*param:'id', paramField:'id'*/} : undefined)
                }}                        
              />
            }
            label={intl.get('jump-to')}
          />
          {
            command.jumpToPage &&
            <Fragment>
              <TextField 
                className = {classes.itemInput} 
                label={intl.get('module-id')} 
                variant="outlined" 
                fullWidth
                value = {command.jumpToPage.moduleId || ''} 
                onChange = {event=>{
                  hanldeJumpParams('moduleId', event.target.value.trim())
                }}
              />
              <TextField 
                className = {classes.itemInput} 
                label={intl.get('page-id')} 
                variant="outlined" 
                fullWidth
                value = {command.jumpToPage.pageId || ''} 
                onChange = {event=>{
                  hanldeJumpParams('pageId', event.target.value.trim())
                }}
              />
              {/*<TextField 
                className = {classes.itemInput} 
                label={intl.get('page-param')} 
                variant="outlined" 
                fullWidth
                value = {command.jumpToPage.param || ''} 
                onChange = {event=>{
                  hanldeJumpParams('param', event.target.value.trim())
                }}
              />
              <TextField 
                className = {classes.itemInput} 
                label={intl.get('param-field')} 
                variant="outlined" 
                fullWidth
                value = {command.jumpToPage.paramField || ''} 
                onChange = {event=>{
                  hanldeJumpParams('paramField', event.target.value.trim())
                }}
              />*/}
            </Fragment>
          }
        </Fragment>
      }
    </MetaListDialog>
    
  )
}
