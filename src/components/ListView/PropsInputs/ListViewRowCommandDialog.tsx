import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, TextField, FormControlLabel, Checkbox} from '@material-ui/core';
import { PropsInputProps } from '../../../base/PropsInputs/PropsEditorProps';
import intl from 'react-intl-universal';
import MetaListDialog from 'components/ListView/PropsInputs/MetaListDialog';
import { useEffect } from 'react';
import { cloneObject } from 'utils/cloneObject';
import { ICommand } from 'base/Model/ICommand';
import { IPageJumper } from 'base/Model/IPageJumper';

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
  const {label, value, onChange} = props;
  const [commands, setCommands] = React.useState<Array<ICommand>>(value ? cloneObject(value) : []);
  const [selectedIndex, setSelectedIndex] = React.useState(commands.length > 0 ? 0 : -1);
  const command = commands[selectedIndex];

  useEffect(()=>{
    setCommands(value ? cloneObject(value) : [])
  },[value])

  const handleChangeAttribute = (index:number, name:string, value:string|IPageJumper|undefined)=>{
    commands[selectedIndex][name] = value;
    setCommands([...commands]);
  };


  const handleAddNew = ()=>{
    commands.push({slug:'new-action', label:'New Action', props:{}});
    setSelectedIndex(commands.length - 1);
  };

  const hanldeJumpParams = (name:string, value:string)=>{
    commands[selectedIndex].jumpToPage = {...commands[selectedIndex].jumpToPage, [name]:value};
    setCommands([...commands]);
  }
  
  return (
    <MetaListDialog
      label = {label}
      title ={intl.get('action-editor')}
      value = {commands}
      selectedIndex = {selectedIndex}
      onAddNew = {handleAddNew}
      onChange = {newValue=>{setCommands(newValue as any)}}
      onSave = {()=>{onChange(cloneObject(commands))}}
      onSelected = {index=>{setSelectedIndex(index)}}
    >{selectedIndex >= 0 &&
        <Fragment>
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('slug')}
            variant="outlined" 
            fullWidth
            size = "small"
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
            size = "small"
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
            size = "small"
            value = {command.icon || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'icon', event.target.value.trim())
            }}
          />
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('confirm-message')} 
            variant="outlined" 
            fullWidth
            size = "small"
            value = {command.confirmMessage || ''} 
            multiline
            rows = {2}
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'confirmMessage', event.target.value.trim())
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
                label={intl.get('module-slug')} 
                variant="outlined" 
                fullWidth
                size = "small"
                value = {command.jumpToPage.moduleSlug || ''} 
                onChange = {event=>{
                  hanldeJumpParams('moduleSlug', event.target.value.trim())
                }}
              />
              <TextField 
                className = {classes.itemInput} 
                label={intl.get('page-id')} 
                variant="outlined" 
                fullWidth
                size = "small"
                value = {command.jumpToPage.pageSlug || ''} 
                onChange = {event=>{
                  hanldeJumpParams('pageSlug', event.target.value.trim())
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
