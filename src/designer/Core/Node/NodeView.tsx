import React, { useEffect, useRef } from 'react';
import { resolveNode } from "../../../components/resoveNode"
//import { Node } from './Node';
import bus, {WILL_FOCUS_NODE } from "../bus";
import { INode } from './INode';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface INodeProps{
  node: INode,
}


export default function NodeView(props:INodeProps){
  const {node} = props;

  const [children, setChildren] = React.useState(node.children);
  
  const selectMyStore = (state: RootState) => state.designer
  const myStore = useSelector(selectMyStore)
  const nodeEl = useRef(null);

  const getDom = ()=>{
    return nodeEl.current;
  }

  const nodeProps = node.getProps(myStore.showOutline, myStore.showPaddingX, myStore.showPaddingY);
  const {style, editStyle, className, editClassName, rxText, withActions, ...rest} = nodeProps;

  const refresh = ()=>{
    setChildren([...node.children]);
  }

  const handleWillFocusNode = (focusNode:INode)=>{
    if(node.id !== focusNode.id){
      node.toNormalState();  
    }
  }

  useEffect(() => {
    node.view = {
      refresh,
      getDom
    };

    bus.on(WILL_FOCUS_NODE, handleWillFocusNode)
    return () => {
      bus.off(WILL_FOCUS_NODE, handleWillFocusNode)
      node.view = undefined;
    };
  });

  const childrenNodes = children?.map((child:INode)=>{
    return (
      <NodeView key={child.id} node={child} />
    )
  });

  return(
    children?.length > 0 || rxText ? 
      React.createElement(
      resolveNode(node.meta.name),
      {
        ref:nodeEl,
        className:classNames(className, editClassName),
        ...rest,
        style:{...style, ...editStyle}
      },
      [rxText, ...childrenNodes]
    )
    :
    React.createElement(
      resolveNode(node.meta.name),
      {
        ref:nodeEl,
        className:classNames(className, editClassName),
        ...rest,
        style:{...style, ...editStyle}
      }
    )
  )
}

