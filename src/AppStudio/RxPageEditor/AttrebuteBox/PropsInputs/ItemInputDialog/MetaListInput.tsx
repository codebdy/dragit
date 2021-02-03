import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import intl from 'react-intl-universal';
import { MetaItem } from 'Base/Model/MetaItem';
import { cloneObject } from 'rx-drag/utils/cloneObject';
import { SelectItem } from '../OptionSelect';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemInput:{
      flex:1,
      margin: theme.spacing(1),
    },
    nameValueItem:{
      display:'flex',
      flexFlow:'row',
    },
    removeButton:{
      margin: theme.spacing(0.5),
    }
  }),
);

export default function MetaListInput(
  props:{ 
    label?:string, 
    value:Array<MetaItem>|undefined, 
    onChange:(value:Array<MetaItem>)=>void,
    idKey?:string,
    nameKey?:string,
    idLabel?:string,
    nameLabel?:string,
    additionKey?:string,
    additionLabelKey?:string,
    additionItems?:Array<SelectItem>
  }
) {
  const {label, value, onChange, idKey = 'id', nameKey = 'name', idLabel, nameLabel, additionKey, additionLabelKey, additionItems} = props; 
  const classes = useStyles();
  let metas = value ? cloneObject(value) : [];

  
  const handleChangeId = (index:number, id:string)=>{
    metas[index][idKey] = id;
    onChange([...metas]);
  };
  const handleChangeName = (index:number, name:string)=>{
    metas[index][nameKey] = name;
    onChange([...metas]);
  };

  const handleAdditionChange =  (index:number, value:string)=>{
    if(additionKey){
      metas[index][additionKey] = value;
      onChange([...metas]);      
    }

  };

  const handleAddNewItem = ()=>{
    metas.push({});
    onChange([...metas]);
  };

  const handleRemoveItem = (index:number)=>{
    metas.splice(index,1);
    onChange([...metas]);
  };

  return (
    
    <Fragment>
      {label && <div className = {classes.itemInput}>{ label }</div>}
      {
        metas.map((meta:any, index:number)=>{
          return(
            <div className ={classes.nameValueItem}
              key={index}
            >
              <TextField 
                className = {classes.itemInput} 
                label={idLabel || intl.get('slug')} 
                variant="outlined" 
                size="small"
                value = {meta[idKey] || ''}
                onChange = {event=>{
                  handleChangeId(index, event.target.value.trim())
                }}
              />
              <TextField 
                className = {classes.itemInput} 
                label={nameLabel || intl.get('name')} 
                variant="outlined" 
                size="small"
                value = {meta[nameKey] ||''}
                onChange = {event=>{
                  handleChangeName(index, event.target.value.trim())
                }}
              />
              {
                additionKey &&
                <FormControl variant="outlined" size="small" className = {classes.itemInput}>
                  <InputLabel>{additionLabelKey&&intl.get(additionLabelKey)}</InputLabel>
                  <Select
                      value={meta[additionKey] || ''}
                      onChange={event=>{
                        handleAdditionChange(index, event.target.value as string)
                      }}
                      label = {additionLabelKey&&intl.get(additionLabelKey)}
                    >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      additionItems?.map((item:SelectItem)=>{
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.localLabelKey ? intl.get(item.localLabelKey) : item.label}
                          </MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              }
              <div className={classes.removeButton}>
                <IconButton aria-label="delete"
                  onClick = {(event) => handleRemoveItem(index)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          )
        })
      }
      <div>
        <IconButton onClick={handleAddNewItem} >
          <AddIcon />
        </IconButton>
       </div>

    </Fragment>
    
  );
}
