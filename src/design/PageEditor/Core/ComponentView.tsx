import React, { Fragment, useEffect, useRef, useState } from 'react';
import { RXNode } from '../../../base/RXNode/RXNode';
import { resolveComponent, resolveRule } from 'base/RxDrag';
import { IMeta } from 'base//Model/IMeta';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import classNames from "classnames";
import bus from '../../../base/bus';
import { DRAG_OVER_EVENT, REFRESH_NODE, REFRESH_SELECT_STATE } from "./busEvents";

import { makeSpaceStyle } from 'base/HOCs/withMargin';
import ActiveLabel from './ActiveLabel';
import { IToolboxItem } from '../Toolbox/IToolboxItem';
import { DragoverCharger } from './DragoverCharger';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {observer} from 'mobx-react-lite';
import { useDesigner } from 'store/helpers/useAppStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outline: {
      outline: fade(theme.palette.primary.main, 0.8) + ' dashed 1px',
    },
    active:{
      outline: fade(theme.palette.primary.main, 0.8) + ' solid 1px',
    },
    selected:{
      outline: theme.palette.primary.main + ' solid 2px',
    },
    dragged:{
      opacity:"0.5",
      outline:theme.palette.secondary.main + ' dashed 1px',
      pointerEvents:'none',
    }
  }),
);

function getEditStyle(
  node:RXNode<IMeta>,
  showPaddingX?:boolean,
  showPaddingY?:boolean,
){
  const rule = resolveRule(node.meta.name);
  const hasNodChildren = node.children.length === 0 && !node.meta?.props?.rxText
  const paddingX={
    paddingLeft : hasNodChildren ? rule.empertyPadding : showPaddingX && rule.editPaddingX,
    paddingRight : hasNodChildren ? rule.empertyPadding : showPaddingX && rule.editPaddingX,    
  }
  const paddingY={
    paddingTop : hasNodChildren ? rule.empertyPadding : showPaddingY && rule.editPaddingY,
    paddingBottom : hasNodChildren ? rule.empertyPadding : showPaddingY && rule.editPaddingY,
  }
  return {
    ...paddingX,
    ...paddingY,
  };

}

export const ComponentView = observer((
  props:{
    node:RXNode<IMeta>,
    selectedNode?:RXNode<IMeta>,
    onSelectNode:(node?:RXNode<IMeta>)=>void,
    draggedToolboxItem?:IToolboxItem,
    draggedNode?:RXNode<IMeta>,
  }
)=>{
  const {node, selectedNode, onSelectNode, draggedToolboxItem, draggedNode} = props;
  const classes = useStyles();
  const [actived, setActived] = useState(false);
  const [editStyle, setEditStyle] = useState<any>({});
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
  const dragged = draggedNode?.id === node.id;
  
  let dom : any = refEl.current;
  node.dom = dom;

  useEffect(()=>{
    bus.emit(REFRESH_SELECT_STATE);
  })

  useEffect(()=>{
    setEditStyle(getEditStyle(node, designer.showPaddingX, designer.showPaddingY));
  },[node, designer]);

  const handleRefresh=(nodeId:number)=>{
    if(node.id === nodeId){
      setEditStyle(getEditStyle(node, designer.showPaddingX, designer.showPaddingY));      
    }
  }

  useEffect(()=>{
    bus.on(REFRESH_NODE, handleRefresh);
    return ()=>{
      bus.off(REFRESH_NODE, handleRefresh);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleMouseMove = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    let dragoverCharger = new DragoverCharger(node, draggedToolboxItem?.meta || draggedNode?.meta);
    if(selectedNode?.id !== node.id && !draggedToolboxItem && !draggedNode){
        setActived(true);        
    }
    else{
      if(refEl.current){
        if(draggedNode?.id !== node.id){
          bus.emit(DRAG_OVER_EVENT, dragoverCharger.judgePosition(event))
        }
      }
    }
  }
  const handleMouseOut = (event:React.MouseEvent<HTMLElement>)=>{
    //event.stopPropagation();
    setActived(false);
  }
  const handleClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    onSelectNode(node);
  }

  let elementProps:any = {
    ...rest, 
    className:classNames(
      className, 
      {
        [classes.outline]: designer.showOutline,
        [classes.active]: actived,
        [classes.selected]: selected,
        [classes.dragged]:dragged,
      }
    ),
    style:{
      ...style,
      ...editStyle,
      marginTop: makeSpaceStyle(marginTop),
      marginRight: makeSpaceStyle(marginRight),
      marginBottom: makeSpaceStyle(marginBottom),
      marginLeft: makeSpaceStyle(marginLeft),
    },
    onMouseMove: handleMouseMove,
    onMouseOut: handleMouseOut,
    onClick: handleClick,
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
            draggedToolboxItem = {draggedToolboxItem}
            draggedNode = {draggedNode}
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
      <ActiveLabel followDom = {refEl?.current} label = {node.meta.name} />
    }
    </Fragment>
  )
})
