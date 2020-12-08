import React, { Fragment, useEffect, useRef, useState } from 'react';
import { RXNode } from '../../../base/RXNode/RXNode';
import { resolveComponent, resolveRule } from 'base/DragRX';
import { IMeta } from 'base//Model/IMeta';
import useDesigner from 'store/designer/useDesigner';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import classNames from "classnames";
import bus, { ACTIVE_NODE } from './bus';

import { makeSpaceStyle } from 'base/HOCs/withMargin';
import NodeLabel from './NodeLabel';
import { IToolboxItem } from '../Toolbox/IToolboxItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outline: {
      outline: theme.palette.primary.main + ' dashed 1px',
    },
    active:{
      outline: theme.palette.primary.main + ' solid 1px',
    },
    selected:{
      outline: theme.palette.primary.main + ' solid 2px',
    }
  }),
);

function getEditStyle(
  node:RXNode<IMeta>,
  showPaddingX?:boolean,
  showPaddingY?:boolean,
){
  const rule = resolveRule(node.meta.name);
  const hasChildren = node.children.length === 0 && !node.meta?.props?.rxText
  const paddingX={
    paddingLeft : hasChildren ? rule.empertyPadding : showPaddingX && rule.editPaddingX,
    paddingRight : hasChildren ? rule.empertyPadding : showPaddingX && rule.editPaddingX,    
  }
  const paddingY={
    paddingTop : hasChildren ? rule.empertyPadding : showPaddingY && rule.editPaddingY,
    paddingBottom : hasChildren ? rule.empertyPadding : showPaddingY && rule.editPaddingY,
  }
  return {
    ...paddingX,
    ...paddingY,
  };

}

export default function ComponentView(
  props:{
    node:RXNode<IMeta>,
    selectedNode?:RXNode<IMeta>,
    onSelectNode:(node?:RXNode<IMeta>)=>void,
    onSelectNodeDom:(dom?:HTMLElement)=>void,
    draggedToolboxItem?:IToolboxItem,
  }
){
  const {node, selectedNode, onSelectNode, onSelectNodeDom, draggedToolboxItem} = props;
  const classes = useStyles();
  const [actived, setActived] = useState(false);
  const designer = useDesigner();
  const refEl = useRef(undefined);
  let Component = resolveComponent(node.meta, false);

  let metaProps = node.meta.props? node.meta.props :{};
  const {
    rxText, 
    withActions, 
    onClick, 
    className,     
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    style, 
    ...rest
  } = metaProps as any;

  const selected = selectedNode?.id === node.id;
  useEffect(()=>{
    if(selected){
      onSelectNodeDom(refEl?.current)      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedNode]);
  
  const handleMouseMove = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    if(selectedNode?.id !== node.id && !draggedToolboxItem){
      setActived(true);
    }
  }
  const handleMouseOut = (event:React.MouseEvent<HTMLElement>)=>{
    //event.stopPropagation();
    setActived(false);
  }
  const handleClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    onSelectNode(node);
    onSelectNodeDom(refEl?.current);
  }

  const handleActive = (activeNode:RXNode<IMeta>)=>{
    setActived(activeNode.id === node.id);
  }

  //解决鼠标移动过快时mouseout事件不起作用的问题
  useEffect(() => {
    bus.on(ACTIVE_NODE, handleActive)
    return () => {
      bus.off(ACTIVE_NODE, handleActive)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  let elementProps:any = {
    ...rest, 
    className:classNames(
      className, 
      {
        [classes.outline]: designer.showOutline,
        [classes.active]: actived,
        [classes.selected]: selected,
      }
    ),
    style:{
      ...style,
      ...(getEditStyle(node, designer.showPaddingX, designer.showPaddingY)),
      marginTop: makeSpaceStyle(marginTop),
      marginRight: makeSpaceStyle(marginRight),
      marginBottom: makeSpaceStyle(marginBottom),
      marginLeft: makeSpaceStyle(marginLeft),
    },
    onMouseMove : handleMouseMove,
    onMouseOut : handleMouseOut,
    onClick : handleClick,
    ...node.meta.designProps,
  }

  const elementView = (node.children && node.children.length > 0) || rxText ?
    (<Component {...elementProps} ref={refEl}>
      {rxText}
      {node.children?.map((child: RXNode<IMeta>)=>{
        return (
          <ComponentView 
            key={child.id} node={child}
            selectedNode = {selectedNode}
            onSelectNode = {onSelectNode}
            onSelectNodeDom = {onSelectNodeDom}
            draggedToolboxItem = {draggedToolboxItem}
          />
        )
      })}
    </Component>)
    :
    <Component {...elementProps} ref={refEl}/>

  return(
    <Fragment>
    { elementView }
    {
      (actived) &&
      <NodeLabel followDom = {refEl?.current} label = {node.meta.name} />
    }
    </Fragment>
  )
}
