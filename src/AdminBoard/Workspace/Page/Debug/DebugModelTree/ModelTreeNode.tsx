import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import { IModelNode } from 'Base/ModelTree/IModelNode';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
    },
  }),
);

export default function ModelTreeNode(
  props:{
    modelNode?: IModelNode,
  }
){
  const {modelNode} = props;
  const classes = useStyles();

  return (
    <TreeItem nodeId="1" label="Applications">
      <TreeItem nodeId="2" label="Calendar" />
      <TreeItem nodeId="3" label="Chrome" />
      <TreeItem nodeId="4" label="Webstorm" />
    </TreeItem>
  )
}
