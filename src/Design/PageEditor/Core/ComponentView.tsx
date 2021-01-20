import React, { Fragment, useEffect, useState } from 'react';
import { DADA_RXID_CONST, RXNode } from '../../../Base/RXNode/RXNode';
import { resolveComponent, resolveRule } from 'Base/RxDrag';
import { IMeta } from 'Base/Model/IMeta';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import classNames from "classnames";
import { makeSpaceStyle } from 'Base/HOCs/withMargin';
import { DragoverCharger } from './DragoverCharger';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {observer} from 'mobx-react';
import { useDesign } from '../useDesign';
import RefreshHunter from './RefreshHunter';
import { getDomByRxid } from '../../../Utils/getDomByRxid';

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
  const {eidtorStore} = useDesign();
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

  const selected = eidtorStore?.selectedNode?.id === node.id;
  const dragged = eidtorStore?.draggedNode?.id === node.id;

  useEffect(()=>{
    if(eidtorStore?.selectedNode?.id === node.id){
      eidtorStore?.setSelectedDom(getDomByRxid(node.rxid));
    }
  })
  
  useEffect(()=>{
    setEditStyle(getEditStyle(node, eidtorStore?.showPaddingX, eidtorStore?.showPaddingY));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[node, node.children.length, eidtorStore?.showPaddingX, eidtorStore?.showPaddingY]);

  const handleRefresh = ()=>{
    setEditStyle(getEditStyle(node, eidtorStore?.showPaddingX, eidtorStore?.showPaddingY));
  }

  const handleMouseMove = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    let dragoverCharger = new DragoverCharger(node, eidtorStore?.draggedToolboxItem?.meta || eidtorStore?.draggedNode?.meta);
    if(eidtorStore?.selectedNode?.id !== node.id && !eidtorStore?.draggedToolboxItem && !eidtorStore?.draggedNode){
      eidtorStore?.setActiveNode(node);     
    }
    else if(eidtorStore?.selectedNode?.id !== node.id){
      //if(refEl.current){
        if(eidtorStore?.draggedNode?.id !== node.id){
          eidtorStore?.setDragOverParam(dragoverCharger.judgePosition(event))
        }
      //}
    }
  }
  const handleMouseOut = (event:React.MouseEvent<HTMLElement>)=>{
    //event.stopPropagation();
    eidtorStore?.setActiveNode(undefined);
  }
  const handleClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    eidtorStore?.setSelectedNode(node);
  }

  const actived = eidtorStore?.activeNode?.id === node.id;

  let elementProps:any = {
    ...rest, 
    [DADA_RXID_CONST]:node.rxid,
    className:classNames(
      className, 
      {
        [classes.outline]: eidtorStore?.showOutline,
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
    (<Component {...elementProps}>
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
    <Component {...elementProps}/>

  return(
    <Fragment>
      <RefreshHunter nodeId={node.id} onRefresh = {handleRefresh} />
      { elementView }
    </Fragment>
  )
})

