import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import HoverItem from './HoverItem';
import { Fab, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    
    addArea:{
      display:'flex',
      justifyContent:'center',
      //padding:theme.spacing(1),
    }
  }),
);

export interface ItemMeta{
  id:number,
  title:string,
}

export default function EditableList(
  props:{
    items:ItemMeta[],
    onChange?:(newTitle:string, id:number)=>void,
    onRemove?:(id:number)=>void,
    onAdd?:()=>void,
    onSelect?:(id:number)=>void,
  }
) {
  const {items, onChange, onRemove, onAdd, onSelect} = props;
  const classes = useStyles();

  const [selectedId, setSelectedId] = React.useState( items && items.length > 0 ? items[0].id : -1 );

  useEffect(()=>{
    onSelect && onSelect(selectedId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedId])

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedId(index);
  };

  const handleRemove = (id:number)=>{
    onRemove && onRemove(id);
    if(id === selectedId){
      setSelectedId(-1)
    }
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folder">
        {
          items.map(item=>{
            return(
              <HoverItem
                key={item.id}
                button
                selected={selectedId === item.id}
                onClick={(event:any) => handleListItemClick(event, item.id)}
                primary={item.title}
                onChange = {(newTitle:string)=>{onChange && onChange(newTitle, item.id)}}
                onRemove = {()=> {handleRemove(item.id)}}
              />              
            )
          })
        }
      </List>
      <div className={classes.addArea}>
        <Fab color="primary" size="small" 
          onClick = {onAdd}
        >
          <AddIcon />
        </Fab>
       </div>
    </div>
  );
}
