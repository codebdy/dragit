import React, { Fragment, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IMenuItem from 'base/IMenuItem';
import { RXNode } from 'base/RXNode';
import MenuItem from './MenuItem';
import { Collapse, List } from '@material-ui/core';
import MenuDivider from './MenuDivider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) => createStyles({
  nested: {
    paddingLeft: theme.spacing(4),
  },

  moreButton:{
    cursor:'pointer',
  }
})
);

export function MenuNode(
  props: {
    node:RXNode<IMenuItem>
  }
) 
{
  const classes = useStyles();
  const { node} = props;
  const [open, setOpen] = useState(false);

  const isGroup = node.meta.type === 'group';
  
  const handleOpenClick = (event: React.MouseEvent<unknown>)=>{
    setOpen(!open);
    event.stopPropagation();
  }

  return (
    <Fragment>
      <MenuItem item={node.meta}>
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
                  <MenuNode key={child.id} node = {child}/>
                )
              })
            }
          </List>
        </Collapse>
      }
    </Fragment>

  );
}
