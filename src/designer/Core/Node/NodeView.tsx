import React, { useEffect, useRef, Fragment } from 'react';
import { resolveNode } from "../resoveNode"
//import { Node } from './Node';
import bus, {WILL_FOCUS_NODE } from "../bus";
import { INode } from './INode';

interface INodeProps{
  node: INode,
}


export default function NodeView(props:INodeProps){
  const {node} = props;

  const [nodeProps, setNodeProps] = React.useState(node.props);
  const [children, setChildren] = React.useState(node.children);

  const nodeEl = useRef(null);

  const getDom = ()=>{
    return nodeEl.current;
  }

  const refresh = ()=>{
    setNodeProps({...node.props});
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


  const Node = resolveNode(node.meta.name);
  return(
    <Fragment>
    {(node.children && node.children.length > 0) || node.meta.text ?
      (<Node ref={nodeEl} {...nodeProps}>
        {node.meta.text}
        {children?.map((child: INode)=>{
          return (
            <NodeView key={child.id} node={child} />
          )
        })}
      </Node>)
      :
      <Node {...node.meta.props} />
    }
    </Fragment>
  )


}
