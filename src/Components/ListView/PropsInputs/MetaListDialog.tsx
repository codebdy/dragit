import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MetaListDialogLeftList from './MetaListDialogLeftList';
import { ILabelItem } from 'Base/Model/ILabelItem';

import PropsDialog from 'AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/PropsDialog';

const styles = (theme: Theme) =>
  createStyles({
    itemContent:{
      flex:1,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  }
);

const useStyles = makeStyles(styles);


export interface MetaListDialogProps{
  label?:string,
  title:string;
  value:Array<ILabelItem>;
  selectedIndex:number;
  children:React.ReactNode;
  onAddNew:()=>void;  
  onChange:(newValue:Array<ILabelItem>)=>void;
  onSave:()=>void;
  onSelected:(number:number)=>void;
}

export default function MetaListDialog(props:MetaListDialogProps){
  const classes = useStyles();
  const {label, title, value, selectedIndex, onAddNew, onChange, onSave, onSelected, children} = props;
  const items = value;
  
  const handleSelected = (index:number)=>{
    onSelected(index);
  }

  const handleSave = () => {
    onSave();

  };
  const handleRemove = (index:number) => {
    if(index === selectedIndex){
      (index + 1) >= items.length ? onSelected(index-1) : onSelected(index);;
    }
    items.splice(index,1);
    onChange([...items]);
  };

  const handleChangePosition = (sourceIndex:number, targetIndex:number)=>{
    if(sourceIndex === selectedIndex){
      onSelected(targetIndex);
    }
    if(targetIndex === selectedIndex){
      onSelected(sourceIndex);
    }
    items[sourceIndex] = items.splice(targetIndex, 1, items[sourceIndex])[0]
    onChange([...items]);
  };


  return (

    <PropsDialog label={label} title = {title} onSave = {handleSave}>
      <MetaListDialogLeftList 
        items={items} 
        selectedIndex={selectedIndex} 
        onSelected ={handleSelected}
        onAddNew = {onAddNew} 
        onRemove = {handleRemove}
        onChangePosition = {handleChangePosition}
      />
      <div className = {classes.itemContent}>
        {children}
      
      </div>
    </PropsDialog>       
  )
}
