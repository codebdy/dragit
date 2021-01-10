import React, { Fragment, useEffect, useRef, useState } from 'react';
import { RXNode } from '../../../base/RXNode/RXNode';
import { resolveComponent, resolveRule } from 'base/RxDrag';
import { IMeta } from 'base//Model/IMeta';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import classNames from "classnames";
import { makeSpaceStyle } from 'base/HOCs/withMargin';
import { DragoverCharger } from './DragoverCharger';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {observer} from 'mobx-react-lite';
import { useCanvarsStore } from '../CanvasStore';

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
  }
)=>{
  const {node} = props;
  const classes = useStyles();
  const [editStyle, setEditStyle] = useState<any>({});
  const canvasStore = useCanvarsStore();
  const refEl = useRef(undefined);
  let Component = resolveComponent(node.meta);

  let metaProps = node.meta.props? node.meta.props :{};
  const {
    rxText, 
    onClick, 
    className,     
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    style, 
    ...rest
  } = metaProps as any;

  const selected = canvasStore.selectedNode?.id === node.id;
  const dragged = canvasStore.draggedNode?.id === node.id;
  
  let dom : any = refEl.current;
  node.dom = dom;
  useEffect(()=>{
    if(selected){
      canvasStore.setSelectedNodeDom(dom);      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dom, selected])

  useEffect(()=>{
    setEditStyle(getEditStyle(node, canvasStore.showPaddingX, canvasStore.showPaddingY));
  },[node, canvasStore.showPaddingX, canvasStore.showPaddingY]);

  useEffect(()=>{
    if(canvasStore.needRefresh(node.id)){
      setEditStyle(getEditStyle(node, canvasStore.showPaddingX, canvasStore.showPaddingY));
      canvasStore.removeFrefrehNodeId(node.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[canvasStore.waitingRefreshNodeIds.length])

  const handleMouseMove = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    let dragoverCharger = new DragoverCharger(node, canvasStore.draggedToolboxItem?.meta || canvasStore.draggedNode?.meta);
    if(canvasStore.selectedNode?.id !== node.id && !canvasStore.draggedToolboxItem && !canvasStore.draggedNode){
      canvasStore.setActiveNode(node);     
    }
    else if(canvasStore.selectedNode?.id !== node.id){
      if(refEl.current){
        if(canvasStore.draggedNode?.id !== node.id){
          canvasStore.setDragOverParam(dragoverCharger.judgePosition(event))
        }
      }
    }
  }
  const handleMouseOut = (event:React.MouseEvent<HTMLElement>)=>{
    //event.stopPropagation();
    canvasStore.setActiveNode(undefined);
  }
  const handleClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    canvasStore.setSelectedNode(node);
  }

  const actived = canvasStore.activeNode?.id === node.id;

  let elementProps:any = {
    ...rest, 
    className:classNames(
      className, 
      {
        [classes.outline]: canvasStore.showOutline,
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
            key={child.id} 
            node={child}
          />
        )
      })}
    </Component>)
    :
    <Component {...elementProps} ref={refEl}/>

  return(
    <Fragment>
    { elementView }
    </Fragment>
  )
})
