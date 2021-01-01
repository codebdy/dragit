import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { ITreeNode } from 'base/Model/ITreeNode';
import { TreeView } from '@material-ui/lab';
import TreeNode from './TreeNode';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ID } from 'base/Model/graphqlTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding:theme.spacing(2),
    },
  }),
);

export default function TreeList(
  props:{
    selected?:Array<{id:ID}>,
    rootNodes?:Array<ITreeNode>,
    nameKey:string,
    multiSelect:true|undefined,
    onSelectChange?:(node:ITreeNode, isSelected:boolean)=>void,
  }
){
 
  const {selected, rootNodes, nameKey, multiSelect, onSelectChange} = props;
  const classes = useStyles();

  return (
    <TreeView
      className = {classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected = {selected?.map(id=>id.toString())}
      multiSelect = {multiSelect}
    >
      {
        rootNodes?.map(child=>{
          return(
            <TreeNode 
              key = {child.id} 
              node={child} 
              nameKey = {nameKey} 
              selected = {selected}
              onSelectChange = {onSelectChange}
            />
          )
        })
      }
    </TreeView>
  )
}
