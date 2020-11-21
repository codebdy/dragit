import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import IMenuItem from 'base/IMenuItem';
import { RXNode } from 'base/RXNode';
import MenuLabel from './MenuLabel';

const useStyles = makeStyles((theme: Theme) => createStyles({

  groupRoot:{
    padding:theme.spacing(2),
    outline: 'dotted 2px ',
  }

})
);

export function MenuNode(
  props: {
    node:RXNode<IMenuItem>
  }&TreeItemProps
) 
{
  const classes = useStyles();
  const { node, ...other } = props;
  return (
    <TreeItem
      label={
        <MenuLabel item={node.meta} />
      }
      //className = {node.meta.type === 'group' ? classes.groupRoot : ''}
      {...other} 
    >
      {
        node.children?.map(child=>{
          return(
            <MenuNode key={child.id} node = {child} nodeId = {child.id.toString()}/>
          )
        })
      }
    </TreeItem>
  );
}
