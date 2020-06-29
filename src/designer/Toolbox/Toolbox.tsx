import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import items from './items'
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import {sideBarSettings} from "utils";
import { INode } from 'designer/Core/Node/INode';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import TreeItem from '@material-ui/lab/TreeItem';
import MdiIcon from 'components/common/MdiIcon';
import intl from 'react-intl-universal';
import { parseNode } from 'designer/Core/Node/jsonParser';
import bus, { WILL_FOCUS_NODE } from 'designer/Core/bus';

declare var window: {draggedNode:INode};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding:theme.spacing(2),
    },
    treeItemLabel: {
      fontSize:'0.9rem',
      padding:theme.spacing(1,0),
      cursor:'default',
    },

    title:{
      paddingLeft:theme.spacing(1),
    }
  }),
);
export interface ItemJson{
  id: string,
  titleKey?:string,
  title?:string,
  icon?:string,
  meta?:any,
  children?: Array<any>,
}


function ItemLabel(props:{item:ItemJson}){
  const {item } = props
  const classes = useStyles();
  const isLeaf =  !item.children && item.meta;
  const handleMouseDown=()=>{
    if(!item.meta){
      return;
    }
    let node = parseNode(JSON.parse(JSON.stringify(item.meta)));
    //node.toFocusState();
    bus.emit(WILL_FOCUS_NODE, node);
    window.draggedNode = node;
    node.toDraggedState();
  }

  return (
    <div className={classes.treeItemLabel} style={{marginLeft:isLeaf ? '-16px' :''}} onMouseDown={handleMouseDown}>
      {isLeaf &&  <MdiIcon iconClass="mdi-file" color="#6e808c" size={12}/>}
      <span className={classes.title}> 
      {item.titleKey ? intl.get(item.titleKey) : item.title} 
      </span>
    </div>
  )
}

function TreeNode(props:{item:ItemJson}){
  const{item} = props;
  return (
    <TreeItem nodeId={item.id} label={<ItemLabel item={item} />}>
      {
        item.children && item.children.map((item:ItemJson)=>{
          return (
            <TreeNode key={item.id} item={item} />
          )
        })
      }
    </TreeItem>
  )
}

export default function Toolbox() {
  const classes = useStyles();
  const selectSidebar = (state: RootState) => state.sidebar
  const sidebar = useSelector(selectSidebar)  
  const fullWidth = sideBarSettings.sizes[sidebar.size]
  
  return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        style={{
          width: sidebar.compactable ? sideBarSettings.sizes['compact'] : fullWidth + 'px',
        }}
      >
        {
          items.map((item:ItemJson)=>{
            return (
              <TreeNode key={item.id} item={item} />
            )
          })
        }
      </TreeView>      
   );
}