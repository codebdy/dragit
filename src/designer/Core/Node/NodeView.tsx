import React, { useEffect, useRef } from 'react';
import { resolveNode } from "../resoveNode"
//import { Node } from './Node';
//import bus, {WILL_FOCUS_NODE, FOCUS_IT, REFRESH_IT} from "../bus";
import { INode } from './INode';

interface INodeProps{
  node: INode,
  contextName?: any,
  //parent?:IContext,
}


export default function NodeView(props:INodeProps){
  const {node} = props;
  //const [schema, setSchema] = React.useState(props.schema);
  const [nodeProps, setNodeProps] = React.useState(node.props);
  const [children, setChildren] = React.useState(node.children);
  //const [className, setClassName] = React.useState('');
  //const [schemaProps, setSchemaProps] = React.useState(schema.props);
  //const [children, setChildren] =React.useState(node.children);
  const nodeEl = useRef(null);

  const getDom = ()=>{
    return nodeEl.current;
  }

  const refresh = (node:INode)=>{
    setNodeProps({...node.props});
    setChildren([...node.children]);
  }

  //const contextName = props.contextName ? props.contextName : Node;
  //const [nodeContext] = React.useState(new contextName({
  //  setStyle:setStyle,
  //  setClassName: setClassName,
    //setSchema:setSchema,
  //  dom: getDom
  //}, schema));
  //console.log(nodeContext);
  //const handleWillFocusNode = (node:IContext)=>{
    //if(node.schema.id !== schema.id){
    //  nodeContext.toNormalState();  
    //}
  //}

  //const handleFocusIt = (id:number)=>{
  //  if(id === schema.id){
 //     nodeContext.toFocusState();   
  //  }
  //}

  //const handleRefreshIt = (id:number)=>{
  //  if(id === node.id){
 //     console.log('refresh', [...node.children]);
 //     setChildren([...node.children])      
 //   }
  //}

  useEffect(() => {
    node.view = {
      refresh,
      getDom
    };

    //bus.on(WILL_FOCUS_NODE, handleWillFocusNode)
    //bus.on(FOCUS_IT, handleFocusIt)
    //bus.on(REFRESH_IT, handleRefreshIt)
    return () => {
      //bus.off(WILL_FOCUS_NODE, handleWillFocusNode)
      //bus.off(FOCUS_IT, handleFocusIt)
      //bus.off(REFRESH_IT, handleRefreshIt)
      node.view = undefined;
    };
  });

  //const handleMouseMove = (event:MouseEvent)=>{
  //  nodeContext.handleMouseMove(event);
  //}

  //const handleMouseOut = (event:MouseEvent)=>{
  //  nodeContext.handleMouseOut(event);
  //}

  //const handleClick = (event:MouseEvent)=>{
  //  nodeContext.handleClick(event);
  //}

  return(React.createElement(
    resolveNode(node.meta.name),
    {
      ref:nodeEl,
      ...nodeProps
      //className:'drag-node-outline ',
      //style:{
      //  paddingTop : node.rule.editPaddingY,
      //  paddingBottom : node.rule.editPaddingY,
      //  paddingLeft : node.rule.editPaddingX,
      //  paddingRight : node.rule.editPaddingX,

      //},
      //onMouseMove : handleMouseMove,
      //onMouseOut : handleMouseOut,
      //onClick : handleClick,
    },
    children?.map((child:INode)=>{
      return (
        <NodeView key={child.id} node={child} />
      )
    })
    )
  )
}
