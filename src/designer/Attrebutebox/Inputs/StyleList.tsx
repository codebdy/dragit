import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core';
import { InputProps } from './InputProps';
import { AttributeRow, RowLabel, RowValue } from '../AttributeRow';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      background:'rgba(0,0,0,0.3)',
      padding:'5px',
      borderRadius:'3px',
    },
    row:{
      display:'flex',
      flexFlow:'row',
      padding:'3px',
    },
    input:{
      background:'transparent',
      border:'0',
      outline:'0',
      color:'#fff',
    },
    leftInput:{
      width:'80px',
    },
    rightInput:{
      width:'100px',
    },
    clearButton:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20px',
      height: '20px',
      background: 'hsla(0,0%,100%,.1)',
      paddingBottom:'2px',
      borderRadius: '3px',
      margin: '1px',
      cursor: 'pointer',
    }

  }),
);

interface StyleItem{
  name:string;
  value:string;
}

export default function StyleList(){
  const classes = useStyles();
  //const {field, value, onChange, schema} = props;
  let itemsArray:Array<StyleItem> = [];
  const [items, setItems] = React.useState(itemsArray);
  const [newItem, setNewItem] = React.useState({name:'',value:''});

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>, index:number) => {
    items[index].name = event.target.value as string;
    setItems([...items]);
  };

  const handleValueChange = (event: React.ChangeEvent<{ value: unknown }>, index:number) => {
    items[index].value = event.target.value as string;
    setItems([...items]);
  };
  
  const handleRemove = (index:number)=>{
    items.splice(index,1);
    setItems([...items]);
  }

  const handleAddNew = ()=>{
    if(newItem.name && newItem.value){
      setItems([...items, {name:newItem.name, value:newItem.value}]);
      setNewItem({name:'',value:''});
    }
  }

  const handleNewNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewItem({name:event.target.value as string, value:newItem.value});
  }
  const handleNewValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewItem({name:newItem.name, value:event.target.value as string});
  }

  return (
    <div className={classes.root}>
      {
        items.map((item:StyleItem, index:number)=>{
          return(
            <div className={classes.row} key={item.name+index}>
              <input className = { classNames(classes.input, classes.leftInput) } 
                value={item.name}
                onChange = {(e)=>{handleNameChange(e, index)}}
              />
              :
              <input className = {classNames(classes.input, classes.rightInput)} 
                value={item.value}
                onChange = {(e)=>{handleValueChange(e, index)}}
              />
              <div className = {classes.clearButton} onClick = {()=>{handleRemove(index)}}>x</div>
            </div>
          )
        })
      }

      <div className={classes.row}>
        <input className = { classNames(classes.input, classes.leftInput) } 
          onChange = {handleNewNameChange}
          onBlur = {handleAddNew} 
          value={newItem.name}
        />
        :
        <input className = {classNames(classes.input, classes.rightInput)} 
          onChange = {handleNewValueChange}
          onBlur = {handleAddNew}  
          value={newItem.value}
        />
      </div>
    </div>
    
  )
}
