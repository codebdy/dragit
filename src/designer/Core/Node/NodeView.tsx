import React, { useEffect, useRef } from 'react';
import { ISchema } from './ISchema';
import { resolveNode } from "../resoveNode"
import { Node } from './Node';
import bus, {WILL_FOCUS_NODE} from "../bus";
import { INode } from './INode';

interface INodeProps{
  schema:ISchema,
  contextName?:any,
}

interface INodeState {
  schema: ISchema,
  style: {[key:string]:string},
}


export default function NodeView(props:INodeProps){
  const [schema, setSchema] = React.useState(props.schema);
  const [style, setStyle] = React.useState({});
  const [className, setClassName] = React.useState('');
  const nodeEl = useRef(null);

  const getDom = ()=>{
    return nodeEl.current;
  }

  const contextName = props.contextName ? props.contextName : Node;
  const [nodeContext] = React.useState(new contextName({
    setStyle:setStyle,
    setClassName: setClassName,
    setSchema:setSchema,
    dom: getDom
  }, schema));
  //console.log(nodeContext);
  const handleWillFocusNode = (node:INode)=>{
    if(node.schema.id !== schema.id){
      nodeContext.toNormalState()      
    }
  }

  useEffect(() => {
    bus.on(WILL_FOCUS_NODE, handleWillFocusNode)
    return () => {
      bus.off(WILL_FOCUS_NODE, handleWillFocusNode)
    };
  });

  const handleMouseMove = (event:MouseEvent)=>{
    nodeContext.handleMouseMove(event);
  }

  const handleMouseOut = (event:MouseEvent)=>{
    nodeContext.handleMouseOut(event);
  }

  const handleClick = (event:MouseEvent)=>{
    nodeContext.handleClick(event);
  }

  return(React.createElement(
    resolveNode(schema.name),
    {
      ref:nodeEl,
      className:'drag-node-outline ' + className,
      style:{
        paddingTop : nodeContext.rule.editPaddingY,
        paddingBottom : nodeContext.rule.editPaddingY,
        paddingLeft : nodeContext.rule.editPaddingX,
        paddingRight : nodeContext.rule.editPaddingX,
        ...style,

      },
      onMouseMove : handleMouseMove,
      onMouseOut : handleMouseOut,
      onClick : handleClick,
    },
    schema.children?.map((child:ISchema)=>{
      return (
        <NodeView key={child.id} schema={child} />
      )
    })
    )
  )
}
