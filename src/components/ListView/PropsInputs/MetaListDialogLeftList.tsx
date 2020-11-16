import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { ListViewMetaItem } from 'components/ListView/ListViewMetaItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 220,
      backgroundColor: theme.palette.background.paper,
    },
    item:{
      userSelect:"none",
    }
  }),
);

export default function MetaListDialogLeftList(
    props:{
        items:Array<ListViewMetaItem>, 
        selectedIndex:number, 
        onSelected:(index:number)=>void,
        onAddNew:()=>void,
        onRemove:(index:number)=>void,
        onChangePosition:(sourceIndex:number, targetIndex:number)=>void,
  }) {
  const {items, selectedIndex, onSelected, onAddNew, onRemove, onChangePosition} = props; 
  const classes = useStyles();
  const [draggedIndex, setDraggedIndex] = React.useState(-1);
  const handleListItemClick = (
    index: number,
  ) => {
    onSelected(index);
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number)=>{
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    onRemove(index);
  };

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    onAddNew();
  };

  const handleDragOver = (event:React.DragEvent<HTMLLIElement>, index:number)=>{
    if(index !== draggedIndex){
      event.preventDefault();
    }
  }

  const handleDrop = (targetIndex:number)=>{
    onChangePosition(draggedIndex, targetIndex);
  }

  return (
    <div className={classes.root}>
      <List component="nav">
        {
          items.map((item, index)=>{
            return(
              <ListItem
                className = {classes.item}
                draggable="true"
                key = {item.label + '-' + index}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(index)}
                onDragStart={event => setDraggedIndex(index)}
                onDragOver = {event=> handleDragOver(event, index)}
                onDragEnd = {event =>{setDraggedIndex(-1)}}
                onDrop = {event =>{handleDrop(index)}}
              >
                <ListItemText primary={item.label} />
                <IconButton aria-label="delete"
                  onClick = {(event) => handleRemove(event, index)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </ListItem>              
            )
          })
        }
        
          <IconButton onClick={handleAdd} >
            <AddIcon />
          </IconButton>
        
      </List>
    </div>
  );
}
