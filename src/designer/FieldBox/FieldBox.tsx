import React from 'react';
import { makeStyles, Theme, createStyles, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import FieldBoxRow from './FieldBoxRow';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      //background:'rgba(0,0,0,0.3)',
      padding:'8px',
      borderRadius:'3px',
    },

    add:{
      display:'flex',
      width:"100%",
      justifyContent:"center"
    }

  }),
);

interface StyleItem{
  name:string;
  value:string;
}


export default function FieldBox(props:{fields:Array<any>, onChange:any}){
  const classes = useStyles();
  //const {field, value, onChange, schema} = props;
  const [items, setItems] = React.useState(props.fields);
  const [newItem, setNewItem] = React.useState({name:'',value:''});
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleSelected = (index:number)=>{
    setSelectedIndex(index);
  }
  //const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>, index:number) => {
    //props.onChange(toStyles(items));
  //};

  //console.log('FieldBox', props.fields)

  const handleValueChange = (event: React.ChangeEvent<{ value: unknown }>, index:number) => {
    items[index].value = (event.target.value as string).trim();
    setItems([...items]);
    //props.onChange(toStyles(items));
  };

  const revmoveEmpertyItem = (index:number) => {
    let item = items[index];
    if(!item.name && !item.value){
      items.splice(index,1);
      setItems([...items]);
    }
  }

 
  const handleRemove = (index:number)=>{
    items.splice(index,1);
    setItems([...items]);
    //props.onChange(toStyles(items));
  }

  const handleNameChange = (newName:string, index:number)=>{
    items[index].name = newName;
    setItems([...items]);

  }

  const handleAddNew = ()=>{
    //newItem.name = toHump(newItem.name);
    if(newItem.name && newItem.value){
      let newItems = [...items, {name:newItem.name, value:newItem.value}]
      setItems(newItems);
      setNewItem({name:'',value:''});
      //props.onChange(toStyles(newItems));
    }
  }

  const handleNewNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewItem({name:(event.target.value as string).trim(), value:newItem.value});
  }
  const handleNewValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewItem({name:newItem.name, value:(event.target.value as string).trim()});
  }

  return (
    <div className={classes.root}>
      {
        items.map((item:StyleItem, index:number)=>{
          return(
            <FieldBoxRow 
              key={index} 
              field={item.name} 
              selected = {selectedIndex === index} 
              onSelected = {()=>handleSelected(index)}
              onRemove = {()=>{handleRemove(index)}}
              onNameChange = {(newName)=>handleNameChange(newName, index)}
            />
          )
        })
      }
      <div className={classes.add}>
        <IconButton aria-label="add"
          onClick = {(event) => {}}
        >
          <AddIcon />
        </IconButton>
      </div>

    </div>
    
  )
}
