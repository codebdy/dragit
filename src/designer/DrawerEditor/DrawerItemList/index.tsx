import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IMenuItem from 'base/IMenuItem';
import { MenuNode } from './MenuNode';
import { RXNode } from 'base/RXNode';
import Scrollbar from 'admin/common/Scrollbar';

const useStyles = makeStyles(
  createStyles({
    root: {
      flexGrow: 1,
      width:'100%',
      userSelect:'none',
    },
  }),
);

export default function DrawerItemList(props : {items?:Array<RXNode<IMenuItem>>}) {
  const {items} = props;
  const classes = useStyles();

  return (
    <Scrollbar>
      <TreeView
        className={classes.root}
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        {
          items?.map(item=>{
            return (
              <MenuNode key={item.id} node = {item} nodeId = {item.id.toString()}/>
            )
          })
        }
      </TreeView>
    </Scrollbar>
  );
}
