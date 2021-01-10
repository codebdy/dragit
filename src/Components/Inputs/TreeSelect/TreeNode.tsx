import React from 'react';
import { makeStyles, Theme, createStyles, Checkbox, FormControlLabel } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import { ITreeNode } from 'Base/Model/ITreeNode';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelRoot: {
      padding:theme.spacing(0),
      marginLeft:theme.spacing(1),
    },

  }),
);

export default function TreeNode(
  props:{
    node:ITreeNode,
    nameKey:string,
    selected?:Array<ITreeNode>,
    onSelectChange?:(node:ITreeNode, isSelected:boolean)=>void,
  }
){
  const {node, nameKey, selected, onSelectChange} = props;
  const classes = useStyles();
  const isChecked = (node?:{id?:string}):boolean=>{
    if(!selected){
      return false;
    }

    for(let i = 0; i < selected.length; i++){
      if(selected[i].id === node?.id){
        return true;
      }
    }
    return false;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    onSelectChange && onSelectChange(node, event.target.checked);
  }

  return (
    <TreeItem 
      nodeId={node.id || ''}
      label = {
        <div className = {classes.labelRoot}  onClick = {e=>e.stopPropagation()}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked(node)}
                onChange={handleChange}
                color="primary"
              />
            }
            label={node[nameKey]}
          />
        </div>
      }
    >
      {
        node.children?.map(child=>{
          return (
            <TreeNode 
              key = {child.id} 
              node={child} 
              nameKey = {nameKey} 
              selected={selected}
              onSelectChange = {onSelectChange}
            />
          )
        })
      }
    </TreeItem>
  )
}
