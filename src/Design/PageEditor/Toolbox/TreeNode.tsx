import { TreeItem } from "@material-ui/lab";
import { RXNode } from "Base/RXNode/RXNode";
import React, { Fragment } from "react";
import { IToolboxItem } from "./IToolboxItem";
import TreeNodeLabel from "./TreeNodeLabel";
import intl from "react-intl-universal";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import MdiIcon from 'components1/common/MdiIcon';
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(0.5, 0),
      userSelect:'none',
    },
    leaf:{
      marginLeft:theme.spacing(-2.2),
    },
    leafText:{
      marginLeft:theme.spacing(1),
    }

  }),
);
export default function TreeNode(
  props:{
    node: RXNode<IToolboxItem>,
    onStartDragToolboxItem: (item:IToolboxItem)=>void,
  }
) {
  const {node, onStartDragToolboxItem} = props;
  const classes = useStyles();

  const isLeaf =  node.children.length === 0 && node.meta.meta;
  const labelText = node?.meta?.title || (node?.meta?.titleKey && intl.get(node?.meta?.titleKey));

  const handleMouseDown = ()=>{
    if(node?.meta.meta){
      onStartDragToolboxItem(node?.meta);      
    }
  }

  return(
    <TreeItem 
      nodeId= {'' + node.id}
      label = {
        <TreeNodeLabel
          onMouseDown = {handleMouseDown}
        >
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
      className={classNames(classes.root,{[classes.leaf]:isLeaf})}
    >
      {
        node?.children?.map((child=>{
          return(
            <TreeNode 
              key={child.id} 
              node = {child}
              onStartDragToolboxItem = {onStartDragToolboxItem}
            />
          )
        }))
      }
    </TreeItem>
  )
}