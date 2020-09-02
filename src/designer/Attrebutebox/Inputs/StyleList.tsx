import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core';

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

function toItems(styles: { [key: string]: any } ){
  let itemsArray:Array<StyleItem> = [];
  if(styles){
    for(var key in styles){
      itemsArray.push({name:key, value:styles[key]});
    }
  }
  return itemsArray
}

function toStyles(items:Array<StyleItem>){
  let styles : { [key: string]: any } = {};
  items.forEach(item=>{
    item.name && isNaN( item.name as unknown as number) && (styles[item.name] = item.value);
  })
  return styles
}

function toHump(name:string) {
  return name.replace(/-(\w)/g, function(all: any, letter: string){
      return letter.toUpperCase();
  });
}

export default function StyleList(props:{value:{}, onChange:any}){
  const classes = useStyles();
  //const {field, value, onChange, schema} = props;
  const [items, setItems] = React.useState(toItems(props.value));
  const [newItem, setNewItem] = React.useState({name:'',value:''});

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>, index:number) => {
    items[index].name = (event.target.value as string).trim();
    setItems([...items]);
    //props.onChange(toStyles(items));
  };

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

  const handleNameBlur = (index:number) => {
    items[index].name = toHump(items[index].name);
    setItems([...items]);
    revmoveEmpertyItem(index);
    props.onChange(toStyles(items));
  };

  const handleValueBlur = (index:number) => {
    revmoveEmpertyItem(index);
    props.onChange(toStyles(items));
  };
  
  const handleRemove = (index:number)=>{
    items.splice(index,1);
    setItems([...items]);
    props.onChange(toStyles(items));
  }

  const handleAddNew = ()=>{
    newItem.name = toHump(newItem.name);
    if(newItem.name && newItem.value){
      let newItems = [...items, {name:newItem.name, value:newItem.value}]
      setItems(newItems);
      setNewItem({name:'',value:''});
      props.onChange(toStyles(newItems));
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
            <div className={classes.row} key={index}>
              <input className = { classNames(classes.input, classes.leftInput) } 
                value={item.name}
                onChange = {(e)=>{handleNameChange(e, index)}}
                onBlur = {e=>{handleNameBlur(index)}}
              />
              :
              <input className = {classNames(classes.input, classes.rightInput)} 
                value={item.value}
                onChange = {(e)=>{handleValueChange(e, index)}}
                onBlur = {e=>{handleValueBlur(index)}}
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
