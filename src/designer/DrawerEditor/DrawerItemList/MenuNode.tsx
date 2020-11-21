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
  const [open, setOpen] = useState(true);

  const isGroup = node.meta.type === 'group';
  
  const handleClick = ()=>{
    setOpen(!open);
  }

  return (
    <Fragment>
      {
        node.meta.type === 'divider'?
        <MenuDivider/>
        :
        <MenuItem item={node.meta} onClick = {handleClick}>
          {isGroup && (open ? <ExpandLess /> : <ExpandMore />)}
        </MenuItem>  
      }
        
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
