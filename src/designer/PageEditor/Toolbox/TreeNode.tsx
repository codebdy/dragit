import { TreeItem } from "@material-ui/lab";
import { RXNode } from "base/RXNode/RXNode";
import React, { Fragment } from "react";
import { IToolboxItem } from "./IToolboxItem";
import TreeNodeLabel from "./TreeNodeLabel";
import intl from "react-intl-universal";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import MdiIcon from 'components/common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(0.5, 0),
    },

    leafText:{
      marginLeft:theme.spacing(1),
    }

  }),
);
export default function TreeNode(
  props:{
    node:RXNode<IToolboxItem>
  }
) {
  const {node} = props;
  const classes = useStyles();

  const isLeaf =  node.children.length === 0 && !node.meta.metas;
  const labelText = node?.meta?.title || (node?.meta?.titleKey && intl.get(node?.meta?.titleKey));

  return(
    <TreeItem 
      nodeId= {'' + node.id}
      label = {
        <TreeNodeLabel isLeaf = {isLeaf}>
          {
            !isLeaf ?
              labelText
            :
            <Fragment>
              <MdiIcon iconClass="mdi-file" color="#6e808c" size={16} />
              <span className={classes.leafText}> 
                {labelText }
              </span>
            </Fragment>
          }
        </TreeNodeLabel>
      }
      className={classes.root}
    >
      {
        node?.children?.map((child=>{
          return(
            <TreeNode key={child.id} node = {child} />
          )
        }))
      }
    </TreeItem>
  )
}