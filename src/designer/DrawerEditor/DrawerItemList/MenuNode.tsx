import React, { Fragment, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IMenuItem from 'base/IMenuItem';
import { RXNode } from 'base/RXNode';
import MenuItem from './MenuItem';
import { Collapse, List } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) => createStyles({
  nested: {
    paddingLeft: theme.spacing(4),
  },

  moreButton:{
    cursor:'pointer',
  },

  itemHoverable: {
    "&:hover":{
      outline:'dashed 1px',
      outlineColor: theme.palette.primary.main,
    }
  },

  selected:{
    outline:'solid 2px',
    outlineColor: theme.palette.primary.main,
    "&:hover":{
      outline:'solid 2px',
      outlineColor: theme.palette.primary.main,
    }    
  }
})
);

export function MenuNode(
  props: {
    node:RXNode<IMenuItem>,
    selectedId:number,
    onSelected:(selectedId:number)=>void
  }
) 
{
  const classes = useStyles();
  const { node, selectedId, onSelected } = props;
  const [open, setOpen] = useState(false);

  const isGroup = node.meta.type === 'group';
  
  const handleOpenClick = (event: React.MouseEvent<unknown>)=>{
    setOpen(!open);
    event.stopPropagation();
  }

  return (
    <Fragment>
      <MenuItem item={node.meta} onClick = {()=>onSelected(node.id)} 
        className={classNames(classes.itemHoverable, {[classes.selected]:selectedId === node.id})}
      >
        {isGroup && (open ? 
          <ExpandLess className={classes.moreButton} onClick = {handleOpenClick} /> 
          : 
          <ExpandMore className={classes.moreButton} onClick = {handleOpenClick} />)}
      </MenuItem>  
        
      {
        node.children &&
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.nested}>
            {
              node.children.map(child=>{
                return(
                  <MenuNode key={child.id} node = {child} selectedId = {selectedId} onSelected={onSelected}/>
                )
              })
            }
          </List>
        </Collapse>
      }
    </Fragment>

  );
}
