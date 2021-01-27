import { TreeItem } from "@material-ui/lab";
import { RxNode } from "rx-drag/RxNode";
import React, { Fragment } from "react";
import { IToolboxItem } from "./IToolboxItem";
import TreeNodeLabel from "./TreeNodeLabel";
import intl from "react-intl-universal";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import MdiIcon from 'Components/Common/MdiIcon';
import classNames from "classnames";
import { useDesign } from "../../../rx-drag/store/useDesign";

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
    node: RxNode<IToolboxItem>,
  }
) {
  const {node} = props;
  const classes = useStyles();
  const {rxDragCoreStore: editorStore} = useDesign();

  const isLeaf =  node.children.length === 0 && node.meta.meta;
  const labelText = node?.meta?.title || (node?.meta?.titleKey && intl.get(node?.meta?.titleKey));

  const handleMouseDown = ()=>{
    if(node?.meta.meta){
      editorStore?.setDraggedToolboxItem(node?.meta);
      editorStore?.setSelectedNode(undefined);
      document.body.classList.add('can-not-be-selected');
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
            />
          )
        }))
      }
    </TreeItem>
  )
}