import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { ListViewColumn } from 'components/ListViewColumn';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 220,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function TableColumnsList(props:{columns:Array<ListViewColumn>, onSelected:(index:number)=>void}) {
  const {columns, onSelected} = props; 
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(columns.length > 0? 0 : -1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    onSelected(index);
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number)=>{
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }

  return (
    <div className={classes.root}>
      <List component="nav">
        {
          columns.map((column, index)=>{
            return(
              <ListItem
                key = {column.field + '-' + index}
                button
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText primary={column.field} />
                <IconButton aria-label="delete"
                  onClick = {(event) => handleRemove(event, index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItem>              
            )
          })
        }
        
          <IconButton>
            <AddIcon />
          </IconButton>
        
      </List>
    </div>
  );
}
