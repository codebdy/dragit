import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, TextField } from '@material-ui/core';
import intl from 'react-intl-universal';
import { cloneObject } from 'utils/cloneObject';

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

export interface MetaItem{
  slug:string;
  label:string;
}

export default function MetaListInput(
  props:{ 
    label?:string, 
    value:Array<MetaItem>|undefined, 
    onChange:(value:Array<MetaItem>)=>void,
    slugLabel?:string,
    valueLabel?:string,
  }
) {
  const {label, value, onChange, slugLabel, valueLabel} = props; 
  const classes = useStyles();
  let metas = value ? cloneObject(value) : [];

  
  const handleChangeSlug = (index:number, slug:string)=>{
    metas[index].slug = slug;
    onChange([...metas]);
  };
  const handleChangeName = (index:number, label:string)=>{
    metas[index].label = label;
    onChange([...metas]);
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
        metas.map((meta:MetaItem, index:number)=>{
          return(
            <div className ={classes.nameValueItem}
              key={index}
            >
              <TextField 
                className = {classes.itemInput} 
                label={slugLabel || intl.get('slug')} 
                variant="outlined" 
                size="small"
                value = {meta.slug || ''}
                onChange = {event=>{
                  handleChangeSlug(index, event.target.value.trim())
                }}
              />
                <TextField 
                className = {classes.itemInput} 
                label={valueLabel || intl.get('name')} 
                variant="outlined" 
                size="small"
                value = {meta.label ||''}
                onChange = {event=>{
                  handleChangeName(index, event.target.value.trim())
                }}
              />
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
