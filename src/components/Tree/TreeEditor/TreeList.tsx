import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ITreeNode } from 'base/Model/ITreeNode';
import TreeNode from './TreeNode';

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
    nodes?:Array<ITreeNode>,
    nameKey:string,
  }
) {
  const {nodes, nameKey} = props;
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {
        nodes?.map(node=>{
          return(
            <TreeNode key={node.id} node={node} nameKey = {nameKey}></TreeNode>
          )
        })
      }
    </TreeView>
  );
}
